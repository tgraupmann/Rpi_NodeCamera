const express = require('express')
const app = express()
const port = 80

const PiCamera = require('pi-camera');
const myCamera = new PiCamera({
  mode: 'photo',
  width: 640,
  height: 480,
  nopreview: true,
});

app.get('/', (req, res) => {
  const timestamp = new Date();
  console.log(timestamp, 'Taking a picture!');
  myCamera.snapDataUrl()
  .then((result) => {
    // Your picture was captured
    res.send(`
      <html>
        <head>
          <title>$timestamp</title>
        </head>
        <body>
          <img src="${result}">
          <script>
            setTimeout(function() {
              location.reload();
            }, 1000);
          </script>
        </body>
      </html>
      `);
  })
  .catch((error) => {
     // Handle your error
     res.send('There was an error! ' + error)
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
