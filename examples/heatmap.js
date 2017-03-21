//This example: http://bl.ocks.org/ganezasan/dfe585847d65d0742ca7d0d1913d50e1

const npath = require('path');
const PrettyData = require('..');
const data = require('./datasets/days-hours.json').map(d => ({
    day: d[0],
    hour: d[1],
    value: d[2]
}));

const margin = { top: 50, right: 0, bottom: 100, left: 30 },
          width = 960 - margin.left - margin.right,
          height = 430 - margin.top - margin.bottom

const [, , format] = process.argv;

const prettyData = new PrettyData(width + margin.left + margin.right, height + margin.top + margin.bottom);
const svg = prettyData.$.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
const d3 = PrettyData.d3;

//Apply styles to elements
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

const gridSize = Math.floor(width / 24),
    legendElementWidth = gridSize * 2,
    buckets = 9,
    colors = ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'], // alternatively colorbrewer.YlGnBu[9]
    days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    times = ['1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12a', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p', '12p'];

const dayLabels = svg.selectAll('.dayLabel')
    .data(days)
    .enter().append('text')
    .text(function (d) {
        return d;
    })
    .attr('x', 0)
    .attr('y', (d, i) => i * gridSize)
    .style('text-anchor', 'end')
    .attr('transform', 'translate(-6,' + gridSize / 1.5 + ')')
    .attr('class', (d, i) => ((i >= 0 && i <= 4) ? 'dayLabel mono axis axis-workweek' : 'dayLabel mono axis'));
const timeLabels = svg.selectAll('.timeLabel')
    .data(times)
    .enter().append('text')
    .text((d) => d)
    .attr('x', (d, i) => i * gridSize)
    .attr('y', 0)
    .style('text-anchor', 'middle')
    .attr('transform', 'translate(' + gridSize / 2 + ', -6)')
    .attr('class', (d, i) => ((i >= 7 && i <= 16) ? 'timeLabel mono axis axis-worktime' : 'timeLabel mono axis'));

const colorScale = d3.scaleQuantile()
    .domain([0, buckets - 1, d3.max(data, (d) => d.value)])
    .range(colors);

const cards = svg.selectAll('.hour')
    .data(data, (d) => d.day + ':' + d.hour);

cards.append('title');

cards.enter().append('rect')
    .attr('x', (d) => (d.hour - 1) * gridSize)
    .attr('y', (d) => (d.day - 1) * gridSize)
    .attr('rx', 4)
    .attr('ry', 4)
    .attr('class', 'hour bordered')
    .attr('width', gridSize)
    .attr('height', gridSize)
    .style('fill', (d) => colorScale(d.value));

cards.select('title').text((d) => d.value);

cards.exit().remove();

const legend = svg.selectAll('.legend')
    .data([0].concat(colorScale.quantiles()), (d) => d);

const legend_g = legend.enter().append('g')
    .attr('class', 'legend');

legend_g.append('rect')
    .attr('x', (d, i) => legendElementWidth * i)
    .attr('y', height)
    .attr('width', legendElementWidth)
    .attr('height', gridSize / 2)
    .style('fill', (d, i) => colors[i]);

legend_g.append('text')
    .attr('class', 'mono')
    .text((d) => '≥ ' + Math.round(d))
    .attr('x', (d, i) => legendElementWidth * i)
    .attr('y', height + gridSize);

legend.exit().remove();

switch (format) {
    case 'html':
        prettyData.html()
            .then(htmlFile => PrettyData.to(htmlFile, npath.join(__dirname, 'out', `${npath.basename(__filename, '.js')}.html`)))
            .catch(console.error);
        break;
    case 'svg':
        prettyData.svg()
            .then(svgFile => PrettyData.to(svgFile, npath.join(__dirname, 'out', `${npath.basename(__filename, '.js')}.svg`)))
            .catch(console.error);
        break;
    case 'png':
        prettyData.png()
            .then(pngFile => PrettyData.to(pngFile, npath.join(__dirname, 'out', `${npath.basename(__filename, '.js')}.png`)))
            .catch(console.error);
        break;
    default:
        console.error(`${format} not supported.`);
}