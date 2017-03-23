//This example: http://mbostock.github.io/d3/talk/20111116/airports-all.html

const npath = require('path');
const PrettyData = require('..');
const us = require('./datasets/us-states.json');
const airports = require('./datasets/airports.json');

const WIDTH = 1280
const HEIGHT = 800;

const [, , format] = process.argv;

const prettyData = new PrettyData(WIDTH, HEIGHT);
const $ = prettyData.$;
const d3 = PrettyData.d3;

const projection = d3.geoAzimuthalEquidistant()
    .rotate([98, -38])
    .scale(1400)
    .translate([640, 360]);

const path = d3.geoPath()
    .projection(projection);

const states = $.append('g').attr('id', 'states');
const cells = $.append('g').attr('id', 'cells');
states.selectAll('path')
    .data(us.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', '#ccc')
    .attr('stroke', '#fff');

const positions = airports.map(a => projection([a.longitude, a.latitude]));
const polygons = d3.voronoi().polygons(positions);
const g = cells.selectAll('g').data(airports).enter().append('g');
g.append('path')
    .attr('class', 'cell')
    .attr('d', function (d, i) {
        return 'M' + polygons[i].join('L') + 'Z';
    })
    .attr('fill', 'none')
    .attr('stroke', 'brown');
g.append('circle')
    .attr('cx', function (d, i) {
        return positions[i][0];
    })
    .attr('cy', function (d, i) {
        return positions[i][1];
    })
    .attr('r', 1.5)
    .attr('fill', 'black');

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