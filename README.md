# Rpi_NodeCamera
A NodeJS application for capturing and rendering camera images without saving to disk

## Running

* Start with NodeJS

```
sudo node app.js
```

* Launch and reload if any files change during development

```
sudo nodemon app.js
```

* Open the server in the browser at `http://IP_ADDRESS`.

* You can find the `IP_ADDRESS` by running a command in the terminal.

```
ifconfig
```

## Required Hardware

* [Raspberry Pi High Quality Camera](https://www.raspberrypi.org/products/raspberry-pi-high-quality-camera/)

* [HQ Setup Video](https://www.youtube.com/watch?v=3S1MQM8B-DU)

* [Raspberry PI 4](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/) - More power to handle all the pixels

## Required Software

* [NodeJS and NPM](https://linuxize.com/post/how-to-install-node-js-on-raspberry-pi/)

```
curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
sudo apt install nodejs
```

## Useful Tools

* [Visual Studio Code on Raspberry Pi](https://code.visualstudio.com/docs/setup/raspberry-pi)

```
sudo apt update
sudo apt install code
```

* [Nodemon](https://www.npmjs.com/package/nodemon)

```
sudo npm install -g nodemon
```

## Dependencies

* [ExpressJS](https://expressjs.com/en/starter/installing.html)

```
npm install express
```

* [pi-camera](https://www.npmjs.com/package/pi-camera) - [Source](https://github.com/stetsmando/pi-camera)
```
npm install pi-camera
```

* [PI camera usage](https://www.raspberrypi.org/documentation/accessories/camera.html)
