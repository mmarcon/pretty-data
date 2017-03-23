//This example: https://bl.ocks.org/d3noob/c3cbb8af554eb848d09ab97306bb5583

const npath = require('path');
const PrettyData = require('..');

const [, , format] = process.argv;

//Disable d3 transitions
PrettyData.disableD3Transitions();

const prettyData = new PrettyData(960, 500);
const svg = prettyData.$;
const d3 = PrettyData.d3;

svg.append("circle")       // append a cicle to the svg
    .attr("fill", "blue")   // fill the circle with 'blue'
    .attr("r", 20)          // set the radius to 10 pixels
    .attr('cx', 40)         // position the circle at 40 on the x axis
    .attr('cy', 250)        // position the circle at 250 on the y axis
    .transition()           // apply a transition
    .duration(4000)         // apply it over 4000 milliseconds
    .attr('cx', 920);       // new horizontal position at 920 on x axis

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