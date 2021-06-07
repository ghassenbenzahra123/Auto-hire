import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { validate } from "class-validator";
import { Entreprise } from "../entity/Entreprise";

import { User } from "../entity/User";
import { Adresse } from "../entity/Adresse";

const distance = 60000; // en metre
class EntrepriseController {
  static newEntreprise = async (req: Request, res: Response) => { 
    //Get parameters from the body

     let { nom, industry, about ,adresse,logo,website, size, type, founded ,specialities} = req.body;
    let entreprise = new Entreprise();

    entreprise.nom = nom;
    entreprise.industry = industry;
    entreprise.about = about;
    
    entreprise.adresse = adresse;
    entreprise.logo =logo;
    entreprise.website   =website;
    entreprise.size =size; 
    entreprise.type  =type ;
    entreprise.founded =founded ;
    entreprise.specialities =specialities;
   
    const connection = getConnection();
    const entrepriseRepository = connection.getRepository("Entreprise");

    try {
      await entrepriseRepository.save(entreprise);
    }
    catch (e) {
      res.status(409).send("entreprise already in use");

      return;
    } //If all ok, send 201 response 
    res.status(201).send("entreprise created");
  };


  static editEntreprise = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { nom, industry, about,adresse ,website, size, type, founded ,specialities,logo}  = req.body;
    const conn = getConnection();
    //Try to find user on database
    const entrepriseRepository = conn.getRepository("Entreprise");
    let entreprise;
    try {
      entreprise = await entrepriseRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("entreprise not found");
      return;
    }

    //Validate the new values on model
    entreprise.nom = nom;
  
    entreprise.industry = industry;
    entreprise.about = about;
    entreprise.adresse = adresse;
    entreprise.website   =website;
    entreprise.size =size; 
    entreprise.type  =type ;
    entreprise.founded =founded ;
    entreprise.specialities =specialities;
    entreprise.logo =logo;
    const errors = await validate(entreprise);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await entrepriseRepository.save(entreprise);
    } catch (e) {
      res.status(409).send("nom  already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };


  

  static GetEntrepriseByPoste = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const entrepriseRepository = connectio.getRepository("Entreprise");
    const adresseRepository = connectio.getRepository("Adresse");


    const nom = req.params.nom;


    let entreprise , adresse;
    try {
      entreprise = await entrepriseRepository.find({
        select: ["id", "nom", "industry", "about","website", "size", "type", "founded" ,"specialities"],
        where: { nom: nom }
       
        //We dont want to send the passwords on response
      });
      let adr = entreprise.adresse
      adresse = await adresseRepository.find({
        select: ["id", "ville"],
        where: { id: adr }
       
        //We dont want to send the passwords on response
      });
   
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Entreprise not found");
      return;
    }
    res.send(entreprise,adresse);
  };

  static GetEntrepriseByNom = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const entrepriseRepository = connectio.getRepository("Entreprise");



    const nom = req.params.nom;


    let avis;
    try {
      avis = await entrepriseRepository.find({
        select: ["id", "nom","industry","about","adresse","logo","website", "size", "type", "founded" ,"specialities"],
        where: { nom: nom }
        //We dont want to send the passwords on response
      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send(error);
      return error;
    }
    res.send(avis);
  };
  
  static GetEntrepriseById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const connectio = getConnection();
    //Get the user from database
    const entrepriseRepository = connectio.getRepository("Entreprise");
    const id = req.params.id;
    let entreprise;
    try {
      entreprise = await entrepriseRepository.find({
        select:  ["id", "nom", "industry", "about", "adresse","website", "size", "type", "founded" ,"specialities"],
        where: { nom: id }
        //We dont want to send the passwords on response
      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("entreprise not found");
      return;
    }
    res.send(entreprise);
  };
 
 
  static updatePicture = async (nom, logo) => {
    //Get the ID from the url

    //Get the user from database


    console.log("Username : " + nom);

    //Get the user from database
    const entrepriseRepository = getRepository(Entreprise);

    const entreprise = await entrepriseRepository.findOne({ nom: nom });
    entreprise.logo = String(logo);
    await entrepriseRepository.save(entreprise);
    //const user = await userRepository.findOneOrFail(username, {
    //  select: ["username", "
  };

    
  static GetAllEntreprise = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const entrepriseRepository = connectio.getRepository("Entreprise");
    let entreprise;
    try {
      entreprise = await entrepriseRepository.find({
        select:  ["id", "nom", "industry", "about", "adresse","logo","website", "size", "type", "founded" ,"specialities"],
       

      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("entreprise not found");
      return;
    }
    res.send(entreprise);
  };
  


   


    


  

/*
  static affectEmployee = async (req: Request, res: Response) => {
    let { idUser, idEntreprise } = req.body;

    try {


      await getConnection()
        .createQueryBuilder()
        .relation(User, "entreprise")
        .of(idUser)
        .add(idEntreprise);

    }



    catch (error) {
      res.status(200).send("Succecfully applied for offer");
      return;
    }



  }*/

  static deleteEntreprise = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const conn = getConnection();
    //Try to find user on database
    const entrepriseRepository = conn.getRepository("Entreprise");
    let entreprise;
    try {
      entreprise = await entrepriseRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("entreprise not found");
      return;
    }
    entrepriseRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };


  //If all ok, send 201 response 



  static GetApplicantsForOffer = async (req: Request, res: Response) => {
    //Get the ID from the url


    //Get the user from database
    


    const entrepriseId = req.params.EntrepriseId;

    const post2 = await getConnection().manager.findOne(Entreprise, entrepriseId);
    try {
      post2.employees = await getConnection()
    .createQueryBuilder()
    .relation(Entreprise, "employees")
    .of(post2) // you can use just post id as well
    .loadMany();

    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Entreprise not found");
      return;
    }
    res.send(post2);
  }; 
 
 


} export default EntrepriseController;