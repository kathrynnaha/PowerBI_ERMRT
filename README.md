## PowerBI_ERMRT

### Setup 
    $ npm install
    $ typings install
    $ pbiviz start

## Dev Setup 
### NPM Packages
    $ npm i -g typings
    $ npm i d3@3.5.5 --save
    $ npm i lodash@3.6.0 --save

### Definately Typed 
    $ typings install dt~d3 --save
    $ typings install lodash~d3 --save


### Add in tsconfig.json

    "files" : [
        "typings/index.d.ts",
        "node_modules/d3/d3.min.js",
        "node_modules/lodash/index.js"
        ]

### Files in Src

* visual.ts
