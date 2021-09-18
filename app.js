const express = require('express')
const app = express()
const port = 80

const PiCamera = require('pi-camera');
const myCamera = new PiCamera({
  mode: 'photo',
  width: 1920,
  height: 1080,
  nopreview: true,
  t: 20, //Small delay to take next picture
});

var lastResult = undefined;

app.get('/', (req, res) => {
  const timestamp = new Date();
  res.send(`
      <html>
        <head>
          <title>RPI Camera</title>
        </head>
        <body>
          <div>
            <span>RPI Camera</span>
            <span id="labelTime">${timestamp}</span>
          </div>
          <img id="imgCamera" width="1920">
          <script>
            async function handleResponse(response) {
              const data = await response.text();
              //console.log(data);
              if (!data.startsWith('ERROR')) {
                labelTime.innerText = new Date().toLocaleString();
                imgCamera.src=data;
              }
            }
            let refreshCamera = async function() {
              while (true) {
                try {
                  let response = await fetch('/camera');
                  handleResponse(response);
                } catch (e) {
                }
              }
            };
            refreshCamera();
          </script>
        </body>
      </html>
      `);  
})

app.get('/camera', (req, res) => {
  const timestamp = new Date();
  console.log(timestamp, 'Taking a picture!');
  myCamera.snapDataUrl()
  .then((result) => {
    // Your picture was captured
    lastResult = result;
    res.send(result);
  })
  .catch((error) => {
     // Handle your error
     console.log('had an error', error);
     if (lastResult) {
       res.send(lastResult);
     } else {
      res.send(`ERROR: ${error}`);
     }
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
