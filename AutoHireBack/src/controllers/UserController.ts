
import { Request, Response } from "express";
import { getConnection, getMongoRepository, getRepository } from "typeorm";
import { ObjectID } from 'mongodb';
import { validate } from "class-validator";
var nodemailer = require('nodemailer');
import { LinkedInProfileScraper } from 'linkedin-profile-scraper';
var fs = require('fs');


import { User } from "../entity/User";
import { userInfo } from "os";

class UserController {
  static scrappAllUsersDetails = async () => {
    //Get users from database
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      select: ["_id", "username"] //We dont want to send the passwords on response
    });
    let result;


    users.forEach(async element => {

      try {
        const scraper = new LinkedInProfileScraper({
          timeout: 0,
          sessionCookieValue: "AQEDATYSzmwFNBA4AAABeeXgdioAAAF6Cez6Kk4ALIAUYjh8DfEgDxrfmXo9AqRj6NkhU7FGC1cCtL_Chn1IPoVIaXoqluXvfNqizXeUenWsh3xAhjg4qdhlpFz0bHNuFDVugzPRnbRWr8nKwI-gzts-"
        });

        await scraper.setup()

        result = await scraper.run('https://www.linkedin.com/in/' + element.username + '/')

        fs.writeFile('./scrapedProfiles/' + element.username + '.json', JSON.stringify(result), 'utf8', function (err) {
          if (err) return console.log(err);

        });





      } catch (err) {
        console.log(err)

      }

    });





  };

  static GetByEntreprise = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const userRepository = connectio.getRepository("User");



    const entreprise = req.params.entreprise;


    let user;
    try {
      user = await userRepository.find({
        select: ["id", "username", "email","firstName", "lastName","position"],
        where: { entreprise: entreprise }
        //We dont want to send the passwords on response
      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("user not found");
      return;
    }
    res.send(user);
  };

  static getOneByUsername = async (req: Request, res: Response) => {
    //Get the ID from the url
    let { username } = req.body;
    console.log("Username : " + username);

    //Get the user from database
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOne({ username });
      //const user = await userRepository.findOneOrFail(username, {
      //  select: ["username", "id", "role"] //We dont want to send the password on response
      // });
      res.send(user);
    } catch (error) {
      res.status(404).send("User not found");
    }
  };


  static listAll = async (req: Request, res: Response) => {
    //Get users from database
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      select: ["_id", "username", "role"] //We dont want to send the passwords on response
    });

    //Send the users object
    res.send(users);
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = req.params.id;

    //Get the user from database
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOneOrFail(id,
        {
          select: ["_id", "username", "role"] //We dont want to send the password on response

        });
      res.send(user);
    } catch (error) {
      res.status(404).send("User not found");
    }
  };

  static newUser = async (req: Request, res: Response) => {
    //Get parameters from the body
    console.log(req.body);


    let { username,firstName,lastName,position,entreprise , password, role, address, picture, email, phoneNumber, birthDate} = req.body;
    let user = new User();
    user.username = username;
    user.firstName = firstName;
    user.lastName = lastName;
    user.position = position ;
    user.entreprise = entreprise;
    user.password = password;
    user.role = role;
    user.address = address;
    user.picture = "Nopicture";
    user.email = email;
    user.birthDate = "20/20/1998";
    user.token= null;
    user.phoneNumber = phoneNumber;
    user.resume = "NORESUME";
    user.skills = "NORESUME";
    user.education = "NORESUME";
    user.experience = "NORESUME";
    user.offres = [];
    user.connections=[];
    user.connectionsGet=[];
    user.connectionsSent=[];
    user.savedJobs=[];

    //user.resetLink = resetLink;



    //Hash the password, to securely store on DB
    user.hashPassword();
    const connection = getConnection();
    //Try to save. If fails, the username is already in use
    const userRepository = connection.getRepository("User");
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }

    //If all ok, send 201 response
    res.status(201).send("User created");
  };


  static updateResume = async (username, resume) => {
    //Get the ID from the url
    //Get the user from database
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ username: username });
    user.resume = resume;
    await userRepository.save(user);
    //const user = await userRepository.findOneOrFail(username, {
    //  select: ["username", "id", "role"] //We dont want to send the password on response
    // });


  };
  static updateProfile = async (username, resume) => {
    //Get the ID from the url
    //Get the user from database
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ username: username });

    const fs = require('fs');

    fs.readFile('./compiled/' + username + ".pdf.json", (err, data) => {
      if (err) throw err;
      let Info = JSON.parse(data);
      console.log(Info);

      user.skills = Info.skills;
      user.education = Info.education;
      user.experience = Info.experience;

    });



    await userRepository.save(user);



  };
  static updatePicture = async (username, picture) => {
    //Get the ID from the url
    console.log("Username : " + username);

    //Get the user from database
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ username: username });
    user.picture = picture;
    await userRepository.save(user);
    //const user = await userRepository.findOneOrFail(username, {
    //  select: ["username", "id", "role"] //We dont want to send the password on response
    // });


  };
 static deleteUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }
    userRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static getInformation = async (username, res: Response) => {

    //let { username } = req.body;


    console.log(username);

    const fs = require('fs');

    fs.readFile('./compiled/' + username + ".pdf.json", (err, data) => {
      if (err) throw err;
      let Info = JSON.parse(data);
      console.log(Info);
      res.send(Info);
    });



  };

  static editUser = async (req: Request, res: Response) => {

    //Get values from the body
    const { id,username,education,skills,experience } = req.body;
    console.log(req.body);
    //Try to find user on database
    const userRepository = getRepository(User);
    let user
    try {
      const userRepository = getMongoRepository(User);
         user = await userRepository.findOne({
          _id: new ObjectID(id)
        });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("User not found");
      return;
    }
    //Validate the new values on model
    user.username = username;
    user.education=education;
    user.skills =skills;
    user.experience=experience;
    const errors = await validate(user);

    //Try to safe, if fails, that means username already in use
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(200).end();
  };
  static editUserHedaline = async (req: Request, res: Response) => {

    //Get values from the body
    const { id,username,firstName,lastName,position,entreprise,address } = req.body;
    console.log(req.body);
    //Try to find user on database
    const userRepository = getRepository(User);
    let user
    try {
      const userRepository = getMongoRepository(User);
         user = await userRepository.findOne({
          _id: new ObjectID(id)
        });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("User not found");
      return;
    }
    //Validate the new values on model
    user.username = username;
    user.firstName = firstName;
    user.lastName = lastName;
    user.position = position ;
    user.entreprise = entreprise;
    user.address = address;
    const errors = await validate(user);

    //Try to safe, if fails, that means username already in use
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(200).send(user);
  };


  static retrieveDataFromLinkedin = async (req: Request, res: Response) => {
    //Get the ID from the url
    let { username } = req.body;
    console.log("Username : " + username);
    let result;
    try {
      const scraper = new LinkedInProfileScraper({
        timeout: 0,
        sessionCookieValue: "AQEDATYSzmwFNBA4AAABeeXgdioAAAF6Cez6Kk4ALIAUYjh8DfEgDxrfmXo9AqRj6NkhU7FGC1cCtL_Chn1IPoVIaXoqluXvfNqizXeUenWsh3xAhjg4qdhlpFz0bHNuFDVugzPRnbRWr8nKwI-gzts-"
      });

      await scraper.setup()

      result = await scraper.run('https://www.linkedin.com/in/' + username + '/')

      fs.writeFile('./scrapedProfiles/' + username + '.json', JSON.stringify(result), 'utf8', function (err) {
        if (err) return console.log(err);

      });





    } catch (err) {
      console.log(err)

    }
    res.send(result);
  };

  static ValidateProfile = async (req: Request, res: Response) => {
    //Get the ID from the url
    //Get the user from database
    let { username } = req.body;

    const fs = require('fs');
let missingSkills ="";
    fs.readFile('./compiled/' + username + ".pdf.json", (err, data) => {
      if (err) throw err;
      let cv = JSON.parse(data);




      fs.readFile('./scrapedProfiles/' + username + ".json", (err, data) => {
        if (err) throw err;
        let linkedin = JSON.parse(data);


for ( let i= 0 ; i<linkedin.skills.length ; i ++ )
{
var contains = cv.skills.includes(linkedin.skills[i].skillName)

if (contains == false )
{
missingSkills += linkedin.skills[i].skillName+" ";
}
}

res.send(missingSkills);

      });

    });






  };

};





export default UserController;
