# Pretty Data

This module allows the generation of [D3](https://d3js.org) visualizations on the server.

Visualizations can be exported in HTML, SVG or PNG (via [PhantomJS](http://phantomjs.org/)).

## Installation

As simple as:

`npm install prettydata`

If you are more the [Yarn](https://yarnpkg.com) kind of guy then go for:

`yarn add prettydata`

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
