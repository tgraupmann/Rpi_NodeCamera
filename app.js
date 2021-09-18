const express = require('express')
const app = express()
const port = 80

const PiCamera = require('pi-camera');
const myCamera = new PiCamera({
  mode: 'photo',
  width: 3840,
  height: 2160,
  nopreview: true,
  t: 20, //Small delay to take next picture
});

var lastResult = undefined;

app.get('/', (req, res) => {
  const timestamp = new Date().toLocaleString();
  res.send(`
      <html>
        <head>
          <title>RPI Camera</title>
          <style>
            .section {
              position: absolute;
              top: 0px;
              left: 0px;
            }
            .info {
              background-color: #00000088;
              font-size: 4em;
              color: white;
              margin: 20px;
              padding: 20px;
            }
          </style>
        </head>
        <body>
          <img class="section" id="imgCamera" height="2160">
          <div class="section info">
            <span>RPI Camera</span>
            <span id="labelTime">${timestamp}</span>
          </div>
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
