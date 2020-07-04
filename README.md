# Forge JIRA GIF Generator

This project contains a Forge app written in Javascript that shows a GIF in the Jira issue panel. THe GIF is generated from giphy.com based on the summary field of the issue.


## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Quick start

- Modify your app by editing the `src/index.jsx` file.
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
