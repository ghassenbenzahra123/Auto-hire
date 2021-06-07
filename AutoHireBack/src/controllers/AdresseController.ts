import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { validate } from "class-validator";

import { Adresse } from "../entity/Adresse";
const distance = 60000; // en metre

class AdresseController {
  static newAdresse = async (req: Request, res: Response) => { //Get parameters from the body 
    let { ville,rue,longitude,latitude } = req.body;
    let adresse = new Adresse();
    adresse.ville = ville;
    adresse.rue = rue;
    adresse.longitude = longitude;
    adresse.latitude = latitude;
    

    const connection = getConnection();
    const adresseRepository = connection.getRepository("Adresse");

    try {
 
      await adresseRepository.save(adresse);
    }
    catch (e) {
      res.status(409).send("adresse already in use");

      return;
    } //If all ok, send 201 response 
    res.status(201).send("adresse created");
  };


  static editAdresse = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { ville,rue,longitude,latitude }  = req.body;
    const conn = getConnection();
    //Try to find user on database
    const adresseRepository = conn.getRepository("Adresse");
    let adresse;
    try {
      adresse = await adresseRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("adresse not found");
      return;
    }

    //Validate the new values on model
    adresse.ville = ville;
    adresse.rue = rue;
    adresse.longitude = longitude;
    adresse.latitude = latitude;
    const errors = await validate(adresse);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await adresseRepository.save(adresse);
    } catch (e) {
      res.status(409).send("ville  already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };


  static GetAdresseByVille = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const adresseRepository = connectio.getRepository("Adresse");



    const ville = req.params.ville;


    let adresse;
    try {
      adresse = await adresseRepository.find({
        select: ["id","ville","rue","longitude","latitude"],
        where: { ville: ville }
        //We dont want to send the passwords on response
      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("adresse not found");
      return;
    }
    res.send(adresse);
  };

 

  
  static GetAllAdresse = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const adresseRepository = connectio.getRepository("Adresse");



   


    let adresse;
    try {
      adresse = await adresseRepository.find({
        select: ["id","ville","rue","longitude","latitude"],
       

      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("adresse not found");
      return;
    }
    res.send(adresse);
  };


  




  static deleteAdresse = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const conn = getConnection();
    //Try to find user on database
    const adresseRepository = conn.getRepository("Adresse");
    let adresse;
    try {
      adresse = await adresseRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("adresse not found");
      return;
    }
    adresseRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };


  


} export default AdresseController;