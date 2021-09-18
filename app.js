const express = require('express')
const app = express()
const port = 80

const width = 4056;
const height = 3040;

const PiCamera = require('pi-camera');
const { nextTick } = require('process');
const myCamera = new PiCamera({
  mode: 'photo',
  width: width,
  height: height,
  nopreview: true,
  t: 20, //Small delay to take next picture
});

var lastResult = undefined;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.set('Cache-Control', 'no-store');
  next();
})

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
          <img class="section" id="imgCamera" height="${height}">
          <div class="section info">
            <span>RPI Camera</span>
            <span id="labelTime">${timestamp}</span>
          </div>
          <script>
            async function handleResponse(response) {
              try {
                const data = await response.text();
                //console.log(data);
                if (data.startsWith('ERROR')) {
                  console.error(new Date().toLocaleString(), 'Server error', data);
                } else {
                  labelTime.innerText = new Date().toLocaleString();
                  imgCamera.src=data;
                }
              } catch (e) {
                console.error(new Date().toLocaleString(), 'Set camera data', e);
              }
            }
            let refreshCamera = async function() {
              while (true) {
                try {
                  let url = '/camera?t='+encodeURIComponent(new Date());
                  //console.log(new Date().toLocaleString(), 'Requesting...', url);
                  let response = await fetch(url);
                  await handleResponse(response);
                } catch (e) {
                  console.error(new Date().toLocaleString(), 'Fetch exception', e);
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
  console.log(new Date().toLocaleString(), 'Taking a picture!');
  myCamera.snapDataUrl()
  .then((result) => {
    // Your picture was captured
    lastResult = result;
    res.send(result);
    console.log(new Date().toLocaleString(), 'Sent picture');
  })
  .catch((error) => {
     // Handle your error
     console.log(new Date().toLocaleString(), 'Had an error', error);
     if (lastResult) {
       res.send(lastResult);
     } else {
      res.send(`ERROR: ${error}`);
     }
  });
})

app.listen(port, () => {
  console.log(new Date().toLocaleString(), `RPI Camera listening at http://localhost:${port}`)
})
