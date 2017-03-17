//This example: https://bl.ocks.org/mbostock/4136647

const PrettyData = require('..');

const topojson = require('topojson');
const us = require('./datasets/us.json');
const output = require('./lib/output');

const WIDTH = 960
const HEIGHT = 600;

const [,, format] = process.argv;

const prettyData = new PrettyData(WIDTH, HEIGHT);
const svg = prettyData.svg;
const d3 = PrettyData.d3;
const path = d3.geoPath();

svg.selectAll('defs')
  .append('path')
  .attr('id', 'nation')
  .attr('d', path(topojson.feature(us, us.objects.nation)));

svg.append('use')
      .attr('xlink:href', '#nation')
      .attr('fill-opacity', 0.2)
      .attr('filter', 'url(#blur)');

svg.append('use')
    .attr('xlink:href', '#nation')
    .attr('fill', '#fff');

svg.append('path')
    .attr('fill', 'none')
    .attr('stroke', '#777')
    .attr('stroke-width', 0.35)
    .attr('d', path(topojson.mesh(us, us.objects.counties, function(a, b) { return (a.id / 1000 | 0) === (b.id / 1000 | 0); })));

svg.append('path')
    .attr('fill', 'none')
    .attr('stroke', '#777')
    .attr('stroke-width', 0.70)
    .attr('d', path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

output.generate(prettyData, format);