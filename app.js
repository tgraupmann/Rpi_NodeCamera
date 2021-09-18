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
          <img width="1920" src="${result}">
          <script>
            setTimeout(function() {
              location.reload();
            }, 50);
          </script>
        </body>
      </html>
      `);
  })
  .catch((error) => {
     // Handle your error
     console.log('had an error', error);
     res.send(`
     <html>
       <head>
         <title>$timestamp</title>
       </head>
       <body>
         <div>${error}</div>
         <script>
           setTimeout(function() {
             location.reload();
           }, 5000);
         </script>
       </body>
     </html>
     `);
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
