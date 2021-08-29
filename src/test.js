const index = require('./src/index.js');

index.serveFile('./root/pages/index.html', (data) => {
    console.log(data);
});
