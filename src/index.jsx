 // Importing required components from Forge UI library
import ForgeUI, { render, Text, Fragment, Image, useAction, Button, useState, useProductContext, IssuePanel } from '@forge/ui';
// Importing the api object
import api from "@forge/api";

// GIPHY API base URL
const GIPHY_API_BASE = 'https://api.giphy.com/v1/gifs/';

// GiphyJson interface to be used by our getRandomGif function
interface GiphyJson {
    title: string;
    url: string;
}

const fallbackDataArray = [
    {
        title: "foo",
        images: {
            fixed_height: {
                url: "https://media.giphy.com/media/Tnchbhzt4fQQM/giphy.gif"
            }
        }
    }
]

// getRandomGif function makes the GIPHY API call to get a random GIF and filter out title and url
const getRandomGif = async (summary): Promise<GiphyJson> => {
    console.log("Making GIPHY API call...")
    const uri = `${GIPHY_API_BASE}search?api_key=${process.env.GIPHY_API_KEY}&rating=pg&q=${summary}`
    const response = await api.fetch(
        encodeURI(uri),
    );

    const body = await response.json()
    var dataArray = body.data
    if (dataArray == undefined || dataArray.length == 0) {
        dataArray = fallbackDataArray
    }
    const data = dataArray[Math.floor(Math.random() * dataArray.length)]
    const {
            title,
            images: {
                fixed_height: { url },
            },
    } = data

    return {
        title,
        url,
    };
};

const fetchCommentsForIssue = async (issueId) => {
    const res = await api
      .asApp()
      .requestJira(`/rest/api/3/issue/${issueId}?fields=summary`);
  
    const data = await res.json();
    return data.fields.summary;
  };

// ImageCardProps interface which will be used by ImageCard component
interface ImageCardProps {
    title: string;
    src: string;
}

// ImageCard component containing text and image
const ImageCard = ({title, src}: ImageCardProps) => (
    <Fragment>
        <Image src={src} alt={title}/>
    </Fragment>
);

// App function will return the final output
const App = () => {
    const context = useProductContext();
    const summary = useState(async () => await fetchCommentsForIssue(context.platformContext.issueKey))[0];
    const [{ title, url }, setRandomGif] = useAction(async () => await getRandomGif(summary), async () => await getRandomGif(summary));

    return (
        <Fragment>
            <ImageCard src={url} title={title} />
            <Button
                text="Generate new GIF"
                onClick={() => {
                    setRandomGif();
                }}
            />
        </Fragment>
    );
};

// Exporting the above App function by exporting via 'run'
export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
