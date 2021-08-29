# Bayer-free-state-website

[![Discord Invite]](https://discord.gg/eDfH73F)
![Version]

The official government website of the Bayer Free State Discord Server. 
Currently under development.

# For Developers

## Setup and run server
> [NodeJS](https://nodejs.org/en/) is required 

- Start by installing dependencies with `npm ci` in `src` directory.
> `npm ci` are recommended over `npm install` for setting up packages to avoid lock file conflicts.
- `npm start` in terminal to start server, for Visual Studio Code users, you can simply press `F5`.
- If that didn't work, start by changing working directory to `src/` with `cd src` then run the server with `node index.js`. Verify that the working directory is `src/` else pages and components won't load properly.

## Directory and File System
- `src`: source code folder
    - `root`: client files
        - `comp`: html components.
        - `page`: html files (in client url there will be no `.html` extention)
        - `public`: assets files that will be served on `/public` url.
    - [.env](https://www.npmjs.com/package/dotenv): set environment variables
        - `listenPort` (default is `8080`)
    - `config.json`: general client configs.
    - `index.js`: server js file.

[.env]: https://www.npmjs.com/package/dotenv
[Discord Invite]: https://img.shields.io/badge/discord-invite-5662F6
[Version]: https://img.shields.io/badge/version-0.1.0-FF0000 
<!--- 
    remember to update version every update
--->
