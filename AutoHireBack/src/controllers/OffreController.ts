import { Request, Response } from "express";
import { getConnection, getRepository, getMongoRepository, getMongoManager, ObjectType } from "typeorm";
import { validate } from "class-validator";
import { Offre } from "../entity/Offre";
import { User } from "../entity/User";
import { getDistance } from 'geolib';
import { ObjectID as ObjectIDType } from 'typeorm'
import { ObjectID } from 'mongodb';

const puppeteer = require('puppeteer');

const distance = 60000; // en metre
class OffreController {
  static newOffre = async (req: Request, res: Response) => { //Get parameters from the body
    let { titre, description, poste, address, creator, industry, type, jobTime, salary,company, longitude, latitude } = req.body;
    let offre = new Offre();
    offre.titre = titre;
    offre.description = description;
    offre.poste = poste;
    offre.address = address;
    offre.creator = creator;
    offre.salary = salary;
    offre.company = company;
    offre.type = type;
    offre.industry = industry;
    offre.jobTime = jobTime; //Validade if the parameters are ok
    offre.longitude = longitude;
    offre.latitude = latitude;
    offre.users = [];
    offre.saves = [];
    const connection = getConnection();
    const offreRepository = connection.getRepository("Offre");

    try {
      await offreRepository.save(offre);
    }
    catch (e) {
      res.status(409).send("username already in use");

      return;
    } //If all ok, send 201 response
    res.status(201).send("Offre created");
  };

  static editOffre = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { titre, description, poste, address, industry, type, jobTime, salary } = req.body;
    const conn = getConnection();
    //Try to find user on database
    const offreRepository = conn.getRepository("Offre");
    let offre;
    try {
      offre = await offreRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Offre not found");
      return;
    }

    //Validate the new values on model
    offre.titre = titre;
    offre.description = description;
    offre.poste = poste;
    offre.address = address;
    offre.industry = industry;
    offre.type = type;
    offre.jobTime = jobTime;
    offre.salary = salary;
    offre.saves = [];
    const errors = await validate(offre);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await offreRepository.save(offre);
    } catch (e) {
      res.status(409).send("titre  already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };


  static GetOffreByPoste = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const offreRepository = connectio.getRepository("Offre");



    const poste = req.params.poste;


    let offre;
    try {
      offre = await offreRepository.find({
        select: ["id", "titre", "poste", "address", "industry", "description", "createdAt", "jobTime", "salary", "type"],
        where: { poste: poste }
        //We dont want to send the passwords on response
      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Offre not found");
      return;
    }
    res.send(offre);
  };
  static GetOffreById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const idOffre = req.params.id
    let offre;
    
        try {
         
          const offreRepository = getMongoRepository(Offre);
           offre = await offreRepository.findOne({
            _id: new ObjectID(idOffre)
          });
    
          
    
       
        }
    
        catch (e) {
          res.status(404).send("Not found");
          return;
        }
    
    
        res.status(200).send(offre);
  };

  static GetOffreByCreator = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const offreRepository = connectio.getRepository("Offre");



    const creator = req.params.creator;


    let offre;
    try {
      offre = await offreRepository.find({
        select: ["id", "titre", "poste", "address","company", "industry", "description", "createdAt", "jobTime", "salary", "type"],
        where: { creator: creator }
        //We dont want to send the passwords on response
      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Offre not found");
      return;
    }
    res.send(offre);
  };

  static GetByEntreprise = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const offreRepository = connectio.getRepository("Offre");



    const industry = req.params.industry;


    let offre;
    try {
      offre = await offreRepository.find({
        select: ["_id", "titre", "poste", "address", "industry", "description", "createdAt", "jobTime", "salary", "type"],
        where: { industry: industry }
        //We dont want to send the passwords on response
      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("offre not found");
      return;
    }
    res.send(offre);
  };
 static GetAll = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const offreRepository = connectio.getRepository("Offre");





    let offre;
    try {
      offre = await offreRepository.find();
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Offre not found");
      return;
    }
    res.send(offre);
  };


  static apply = async (req: Request, res: Response) => {
    let { idUser, idOffre } = req.body;


    try {
      const userRepository = getMongoRepository(User);
      const user = await userRepository.findOne({
        _id: new ObjectID(idUser)
      });

      const offreRepository = getMongoRepository(Offre)
      const offre = await offreRepository.findOne({
        _id: new ObjectID(idOffre)
      });


      var isInArray = user.offres.some(function (offre) {
        return offre.equals(idOffre);
      });

      if (!isInArray) {
        user.offres.push(offre._id);
        offre.users.push(user._id);


        await userRepository.save(user);
        await offreRepository.save(offre);
      }
      else
        throw "Exception";

    }


    catch (e) {
      res.status(404).send("Already applied to offer");
      return;
    }


    res.status(200).send("Applied Succesfuly");

  }
  static save = async (req: Request, res: Response) => {
    let { idUser, idOffre } = req.body;
let user;
let offre;

    try {
      const userRepository = getMongoRepository(User);
       user = await userRepository.findOne({
        _id: new ObjectID(idUser)
      });
      const offreRepository = getMongoRepository(Offre);
       offre = await offreRepository.findOne({
        _id: new ObjectID(idOffre)
      });

      

      var isInArray = user.savedJobs.some(function (offre) {
        return offre.equals(idOffre);
      });

      if (!isInArray) {
        user.savedJobs.push(offre._id);
        offre.saves.push(user._id);
        await userRepository.save(user);
        await offreRepository.save(offre);
      }
      else
        throw "Exception";

    }

    catch (e) {
      res.status(404).send("This job already saved ");
      return;
    }


    res.status(200).send(offre);

  }
  static unsave = async (req: Request, res: Response) => {
    let { idUser, idOffre } = req.body;

let user;
let offre
    try {
      const userRepository = getMongoRepository(User);
       user = await userRepository.findOne({
        _id: new ObjectID(idUser)
      });
      const offreRepository = getMongoRepository(Offre);
       offre = await offreRepository.findOne({
        _id: new ObjectID(idOffre)
      });

      var isInArray = user.savedJobs.some(function (offre) {
        return offre.equals(idOffre);
      });

      if (isInArray) {
        const x = user.savedJobs.indexOf(offre._id);
        user.savedJobs.splice(x);
        const xx = offre.saves.indexOf(user._id);
        offre.saves.splice(xx);
        await userRepository.save(user);
        await offreRepository.save(offre);
      }
      else
        throw "Exception";

    }

    catch (e) {
      res.status(404).send("Not FOund ");
      return;
    }


    res.status(200).send(offre);

  }

  static deleteOffre = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const conn = getConnection();
    //Try to find user on database
    const offreRepository = conn.getRepository("Offre");
    let offre;
    try {
      offre = await offreRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Offre not found");
      return;
    }
    offreRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  //If all ok, send 201 response

  static GetSavedJobsForUser = async (req: Request, res: Response) => {
    const UserId = req.params.UserId;
    let offres, user;
    try {
      const offreRepository = getMongoRepository(Offre);
      const userRepository = getMongoRepository(User);

      user = await userRepository.findOne({
        _id: new ObjectID(UserId)
      });
      const ids = user.savedJobs;
      if (ids.length > 0)
        offres = await offreRepository.find({ where: { _id: { $in: ids.map(id => new ObjectID(id)) } } })
      else
        throw "exception"

    } catch (e) {
      res.status(204).send("There is no offre saved");
      return;
    }
    res.send(offres);
  };

  static GetOffersForApplicant = async (req: Request, res: Response) => {
    const UserId = req.params.UserId;
    let offres, user;
    try {
      const offreRepository = getMongoRepository(Offre);
      const userRepository = getMongoRepository(User);

      user = await userRepository.findOne({
        _id: new ObjectID(UserId)
      });
      const ids = user.offres;
      if (ids.length > 0)
        offres = await offreRepository.find({ where: { _id: { $in: ids.map(id => new ObjectID(id)) } } })
      else
        throw "exception"

    } catch (e) {
      res.status(404).send("Not applied to any offer");
      return;
    }
    res.send(offres);
  };


  static GetApplicantsForOffer = async (req: Request, res: Response) => {
    let offre;
    let users;
    try {
      const OfferId = req.params.OfferId;
      const offreRepository = getMongoRepository(Offre);
      const userRepository = getMongoRepository(User);

      offre = await offreRepository.findOne({
        _id: new ObjectID(OfferId)
      });
      const ids = offre.users;
      if (ids.length > 0)
        users = await userRepository.find({ where: { _id: { $in: ids.map(id => new ObjectID(id)) } } })
      else
        throw "exception"
    } catch (e) {
      res.status(404).send("No users Applied");
      return;
    }
    res.send(users);
  };

  static getScrapedOffers = async (req: Request, resx: Response) => {
    const browser = await puppeteer.launch();
    try {

      const page = await browser.newPage();
      await page.goto('https://www.tanitjobs.com/jobs/?searchId=1620098309.1306&action=search&page=2');
      await page.waitForSelector("div.media-body a.link");
      var news = await page.evaluate(() => {
        var titre = document.querySelectorAll('div.media-body a.link');
        var company = document.querySelectorAll('div.media-body div.listing-item__info span:first-child');
         var adress = document.querySelectorAll('div.media-body div.listing-item__info span:nth-child(2)');
        var description = document.querySelectorAll('div[class="listing-item__desc visible-sm visible-xs"]');
        var createdAt =document.querySelectorAll('div[class="listing-item__date"]');


        var data = []
        for (let i = 0; i < titre.length; i++) {
          data[i] = {
            titre: titre[i].innerHTML.trim(),
            link: titre[i].getAttribute("href"),
            company: company[i].innerHTML.trim(),
             address: adress[i].innerHTML.trim(),
            description: description[i].innerHTML.trim(),
            createdAt: createdAt[i].innerHTML.trim(),
            
          };

        }
        return data;
      })

      console.log(news);


      await browser.close();

    } catch (err) {
      console.log(err);
      await browser.close();
      console.log("OOps Closing browser...")
    }
    resx.status(200).send(news);

  }
  static getDetails = async (req:Request,resx:Response) =>{
    const browser = await puppeteer.launch();
    let { link } = req.body;
    try {

      const page = await browser.newPage();
      await page.goto(link);

      var news = await page.evaluate(() => {
       
        var description = document.querySelectorAll('div.details-offre div.details-body__content content-text ');
        var date =document.querySelectorAll('li.listing-item__info--item listing-item__info--item-date');


   
         var data = {
            description,
            date
            
          };

        
        return data;
      })

      console.log(news);


      await browser.close();

    } catch (err) {
      console.log(err);
      await browser.close();
      console.log("OOps Closing browser...")
    }
    resx.status(200).send(news);

}
  static listOfferByDistance = async (req: Request, res: Response) => {

    let { long } = req.body;
    let { latt } = req.body;
    console.log("Longitude From Android : " + long);
    console.log("Lattitude From Android : " + latt);


    const OffreeRepository = getRepository(Offre);
    var offers1 = new Array();


    const offers = await OffreeRepository.find();




    offers.forEach(function (element) {
      if (getDistance(
        { latitude: latt, longitude: long },
        { latitude: element.latitude, longitude: element.longitude }
      ) <= distance) {
        offers1.push(element);
      }
      else {
        console.log("Aucune Offre A proximité");
      }
    });

    res.send(offers1);
  };

} export default OffreController;