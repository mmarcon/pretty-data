//This example: https://bl.ocks.org/mbostock/4136647

const npath = require('path');
const PrettyData = require('..');

const topojson = require('topojson');
const us = require('./datasets/us.json');

const WIDTH = 960
const HEIGHT = 600;

const [,, format] = process.argv;

const prettyData = new PrettyData(WIDTH, HEIGHT);
const $ = prettyData.$;
const d3 = PrettyData.d3;
const path = d3.geoPath();

$.selectAll('defs')
  .append('path')
  .attr('id', 'nation')
  .attr('d', path(topojson.feature(us, us.objects.nation)));

$.append('use')
      .attr('xlink:href', '#nation')
      .attr('fill-opacity', 0.2)
      .attr('filter', 'url(#blur)');

$.append('use')
    .attr('xlink:href', '#nation')
    .attr('fill', '#fff');

$.append('path')
    .attr('fill', 'none')
    .attr('stroke', '#777')
    .attr('stroke-width', 0.35)
    .attr('d', path(topojson.mesh(us, us.objects.counties, function(a, b) { return (a.id / 1000 | 0) === (b.id / 1000 | 0); })));

$.append('path')
    .attr('fill', 'none')
    .attr('stroke', '#777')
    .attr('stroke-width', 0.70)
    .attr('d', path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

switch (format) {
    case 'html':
        prettyData.html()
            .then(PrettyData.to(npath.join(__dirname, 'out', `${npath.basename(__filename, '.js')}.html`)))
            .catch(console.error);
        break;
    case 'svg':
        prettyData.svg()
            .then(PrettyData.to(npath.join(__dirname, 'out', `${npath.basename(__filename, '.js')}.svg`)))
            .catch(console.error);
        break;
    case 'png':
        prettyData.png()
            .then(PrettyData.to(npath.join(__dirname, 'out', `${npath.basename(__filename, '.js')}.png`)))
            .catch(console.error);
        break;
    default:
        console.error(`${format} not supported.`);
}