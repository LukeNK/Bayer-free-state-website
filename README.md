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
- Run `npm start`. For Visual Studio Code users, you can simply press `F5` to start server.

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
