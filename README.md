# Pac-Man 5 X 5 Grid Sample

## Description
Sample Pac-Man App to handle 5X5 grid

## App is hosted on https://pacman-5-5.appspot.com

## Scripts

### Main Dev Scripts

* `yarn start` or `node yarn-local.js start` (Run the local webpack dev server environment with browsersync FYI, there seems to be issue with browsersync if so use `yarn prod`)
* `yarn prod` or `node yarn-local.js prod` (Create and serve the production package)
* `yarn prod:build` or `node yarn-local.js prod:build` (Create the production package)
* `yarn dll` or `node yarn-local.js dll` (Generate the DLL bundle)
* `yarn update:cache` or `node yarn-local.js update:cache` (Delete yarn cache, node_modules and cache packages and install fresh package)


### Basic Dev Flow

1. Run `yarn dll` or `node yarn-local.js dll` (this will only need to be done once at the start, and then you will be prompted when you need to run again due to updates)
2. Run `yarn start` or `node yarn-local.js start`
3. Update the code
4. Track your changes using git
5. Push your code

Any changes will be watched and auto refreshed in the browser

If you wish to add a new package you can do so by below command
```sh
yarn add <package>
```
OR

for dev dependencies
```sh
yarn add <package> -D
```


To update packages
```sh
yarn upgrade 
```

Below are the details related to differnt types of commits

https://github.com/conventional-changelog-archived-repos/conventional-changelog-angular/blob/master/convention.md

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm](https://img.shields.io/npm/l/express.svg)]()
