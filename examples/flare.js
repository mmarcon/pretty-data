//This example, slighlty adapted: https://bl.ocks.org/maybelinot/5552606564ef37b5de7e47ed2b7dc099

const npath = require('path');
const PrettyData = require('..');
const fetch = require('node-fetch');

const DATA_URL = 'https://bl.ocks.org/mbostock/raw/4063550/flare.json';

const width = 960
const height = 700;
const radius = (Math.min(width, height) / 2) - 10

const [, , format] = process.argv;

const prettyData = new PrettyData(width, height);
const svg = prettyData.$;
const d3 = PrettyData.d3;

const formatNumber = d3.format(',d');

const x = d3.scaleLinear()
    .range([0, 2 * Math.PI]);

const y = d3.scaleSqrt()
    .range([0, radius]);

const color = d3.scaleOrdinal(d3.schemeCategory20);

const partition = d3.partition();

const arc = d3.arc()
    .startAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x0)));
    })
    .endAngle(function (d) {
        return Math.max(0, Math.min(2 * Math.PI, x(d.x1)));
    })
    .innerRadius(function (d) {
        return Math.max(0, y(d.y0));
    })
    .outerRadius(function (d) {
        return Math.max(0, y(d.y1));
    });

const g = svg.append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + (height / 2) + ')');

fetch(DATA_URL)
    .then(res => res.json())
    .then(root => {
        root = d3.hierarchy(root);
        root.sum(function (d) {
            return d.size;
        });
        g.selectAll('path')
            .data(partition(root).descendants())
            .enter().append('path')
            .attr('stroke', '#fff')
            .attr('d', arc)
            .style('fill', function (d) {
                return color((d.children ? d : d.parent).data.name);
            })
            .append('title')
            .text(function (d) {
                return d.data.name + '\n' + formatNumber(d.value);
            });
    })
    .then(() => {
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
    })
    .catch(console.error);