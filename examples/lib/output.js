module.exports = {
    generate(prettyData, format) {
        switch(format) {
            case 'html':
                prettyData.html().then(console.log).catch(console.error);
                break;
            case 'svg':
                prettyData.export().then(console.log).catch(console.error);
                break;
            case 'png':
                prettyData.png().then(console.log).catch(console.error);
                break;
            default:
                console.error(`${format} not supported.`);
        }
    }
};