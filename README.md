# Forge JIRA GIF Generator

This project contains a Forge app written in Javascript that shows a GIF in the Jira issue panel. The GIF is generated from giphy.com based on the summary field of the issue.


## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Cloning the app

Follow the steps in [example apps](https://developer.atlassian.com/platform/forge/example-apps/) to clone and register a new copy of the app.

## Deploying and installing the app

- Generate a giphy api key from https://developers.giphy.com/docs/api#quick-start-guide
- Build and deploy your app by running:
```
forge variables:set GIPHY_API_KEY <your giphy api key>
forge deploy
```

- Install your app in an Atlassian site by running:
```
forge install
```

- Develop your app by running `forge tunnel` to proxy invocations locally:
```
FORGE_USER_VAR_GIPHY_API_KEY=<your giphy api key> forge tunnel
```
