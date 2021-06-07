import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";
import * as multer from "multer";
import UserController from "./controllers/UserController";
import EntrepriseController from "./controllers/EntrepriseController";
const fs = require('fs');
const cron = require("node-cron");

const express = require('express'),
  router = express.Router(),
  parseIt = require('../utils/parseIt'),
  multer = require('multer'),
  crypto = require('crypto'),
  mime = require('mime')

const storage3 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const uploadz = multer({ storage: storage3 });

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage2 });


//Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    //Set all routes from routes folder
    app.use("/", routes);

    app.post('/uploadImage', uploadz.single('file'), async (req, res) => {
      const { filename: image } = req.file
      let name = req.body.name;
      UserController.updatePicture(name, image)
      return res.send('SUCCESS!')
    })

    app.use('/images', express.static('../uploads/'));

    app.post('/parseCV', upload.single('upl'), function (req, res) {
      const { filename: resume } = req.file
      let username = req.body.username;

      function one() {
        setTimeout(function() {
          fs.readFile('./compiled/' + username + ".pdf.json", (err, data) => {
            if (err) throw err;
            let Info = JSON.parse(data);
            console.log(Info);
            res.status(200).send(Info);
            });
        }, 1500);
      }

      function two() {
        parseIt.parseResume(req.file.path, './compiled');
        UserController.updateResume(username, resume)
      }
      two()
      one()
   });

    app.post('/parseCVflutter', upload.single('upl2'), function (req, res) {
      const { filename: resume } = req.file

      let username = req.body.username;



      parseIt.parseResume(req.file.path, './compiled');
      UserController.updateResume(username, resume)
      UserController.updateProfile(username, resume)


      res.status(204).end();
    });

    cron.schedule("10 * * * *", function () {
      console.log("Running Cron Job For Scrapping Profils");

UserController.scrappAllUsersDetails();


    });
    app.post("/upload_files", upload.single("files"),async (req, res) => {
      let nom = req.body.name;
      const { filename: image } = req.file

      EntrepriseController.updatePicture(nom, image)
      console.log("esm el taswira = "+image);




      return res.send('SUCCESS!')
    })

app.use('/images', express.static('../uploads/'));
var server = app.listen(8810);
var io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});



app.get('/video', (req, res) => {
	res.send('Running');
});

io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});


    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });
  })
  .catch(error => console.log(error));