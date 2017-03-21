# Pretty Data

This module allows the generation of [D3](https://d3js.org) visualizations on the server.

Visualizations can be exported in HTML, SVG or PNG (via [PhantomJS](http://phantomjs.org/)).

## Installation

As simple as:

`npm install prettydata`

If you are more the [Yarn](https://yarnpkg.com) kind of guy then go for:

`yarn add prettydata`

## Usage

Using Pretty Data is very simple. If you know d3, you know how to use Pretty Data.

```javascript
const PrettyData = require('prettydata');

const WIDTH = 1280
const HEIGHT = 800;

const prettyData = new PrettyData(WIDTH, HEIGHT);

//This is the root SVG object where the entire chart will be rendered
const svg = prettyData.$;

//This is the same d3 object you'd use in a browser
const d3 = PrettyData.d3;

//Optionally, set some style rules
prettyData.css = {
    'rect.bordered': {
        stroke: '#E6E6E6',
        strokeWidth: '2px'
    },
    'text.mono': {
        fontSize: '9pt',
        fontFamily: 'Consolas, courier',
        fill: '#aaa'
    },
    'text.axis-workweek, text.axis-worktime': {
        fill: '#000'
    }
};

//
//Do your d3 stuff here...
//

//Generate HTML file output
prettyData.html()
    .then(htmlFile => PrettyData.to(htmlFile, 'myfile.html')))
    .catch(console.error);

//Generate SVG file output
prettyData.svg()
    .then(htmlFile => PrettyData.to(htmlFile, 'myfile.svg')))
    .catch(console.error);

//Generate PNG file output
prettyData.png()
    .then(htmlFile => PrettyData.to(htmlFile, 'myfile.png')))
    .catch(console.error);
```

## Examples

### US TopoJSON

Source: [https://bl.ocks.org/mbostock/4136647](https://bl.ocks.org/mbostock/4136647).

![us topojson example](https://raw.githubusercontent.com/mmarcon/pretty-data/master/examples/out/map-us.png)

### Voronoi

Adapted from: [http://mbostock.github.io/d3/talk/20111116/airports-all.html](http://mbostock.github.io/d3/talk/20111116/airports-all.html).

![voronoi example](https://raw.githubusercontent.com/mmarcon/pretty-data/master/examples/out/voronoi.png)

### Flare

Minimally adapted from: [https://bl.ocks.org/maybelinot/5552606564ef37b5de7e47ed2b7dc099](https://bl.ocks.org/maybelinot/5552606564ef37b5de7e47ed2b7dc099).

In this example the data is pulled on the fly as JSON using [node-fetch](https://github.com/bitinn/node-fetch).

![flare example with data fetched on the fly](https://raw.githubusercontent.com/mmarcon/pretty-data/master/examples/out/flare.png)

### Heatmap (with styles)

Source: [http://bl.ocks.org/ganezasan/dfe585847d65d0742ca7d0d1913d50e1](http://bl.ocks.org/ganezasan/dfe585847d65d0742ca7d0d1913d50e1).

In this example the chart is styled using the css API exposed by Pretty Data:

```javascript
prettyData.css = {
    'rect.bordered': {
        stroke: '#E6E6E6',
        strokeWidth: '2px'
    },
    'text.mono': {
        fontSize: '9pt',
        fontFamily: 'Consolas, courier',
        fill: '#aaa'
    },
    'text.axis-workweek, text.axis-worktime': {
        fill: '#000'
    }
};
```

![heatmap example with css](https://raw.githubusercontent.com/mmarcon/pretty-data/master/examples/out/heatmap.png)