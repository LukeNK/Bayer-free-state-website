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
- Create `.env` file in the `src/` directory and put `PORT=8000`
> You can change `PORT=YOURPORTNUMBER` to whatever fits.
- `npm start` in terminal to start server, for Visual Studio Code users, you can simply press `F5`.
- If that didn't work, change directory to `src/` by using `cd src/` and then run `node index` instead. Verify that the working directory is `src/` else pages and components won't load properly.

## Directory and File System
- `src`: Source code folder
    - `root`: Client files
        - `comp`: HTML components
        - `page`: HTML files (in client url there will be no `.html` extention)
        - `public`: Assets files that will be served on `/public` url
    - [.env](https://www.npmjs.com/package/dotenv) **(important)**: set environment variables
        - `PORT` (You can set whatever port you like)
    - `config.json`: General client's configs
    - `index.js`: Server file

[.env]: https://www.npmjs.com/package/dotenv
[Discord Invite]: https://img.shields.io/badge/discord-invite-5662F6
[Version]: https://img.shields.io/badge/version-0.1.2-FF0000 
<!--- 
    remember to update version every update
--->
