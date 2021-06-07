import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { validate } from "class-validator";

import { Avis} from "../entity/Avis";

const distance = 60000; // en metre

class AvisController {
  static newAvis = async (req: Request, res: Response) => { 
    //Get parameters from the body 
    let { niveau,commentaire,entreprise,personne } = req.body;
    let avis = new Avis();
    avis.niveau = niveau;
    avis.commentaire = commentaire;
    avis.entreprise = entreprise;
    avis.personne = personne;
    

    const connection = getConnection();
    const avisRepository = connection.getRepository("Avis");

    try {
 
      await avisRepository.save(avis);
    }
    catch (e) {
      res.status(409).send("Avis already in use");

      return;
    } //If all ok, send 201 response 
    res.status(201).send("Avis created");
  };


  static editAvis = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { niveau,commentaire,entreprise,personne}  = req.body;
    const conn = getConnection();
    //Try to find user on database
    const avisRepository = conn.getRepository("Avis");
    let avis;
    try {
      avis = await avisRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Avis not found");
      return;
    }

    avis.niveau = niveau;
    avis.commentaire = commentaire;
    avis.entreprise = entreprise;
    avis.personne = personne;
    const errors = await validate(avis);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await avisRepository.save(avis);
    } catch (e) {
      res.status(409).send("avis  already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };


  static GetTotalAvis = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const avisRepository = connectio.getRepository("Avis");
    let avis;
    try {
      avis = await avisRepository.find({
        select: ["niveau","commentaire","entreprise","personne"],
       

      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Avis not found");
      return;
    }
    res.send(avis);
  };

 
  static GetAvisByEntreprise = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const avisRepository = connectio.getRepository("Avis");



    const entreprise = req.params.entreprise;


    let avis;
    try {
      avis = await avisRepository.find({
        select: ["id", "niveau", "commentaire", "entreprise", "personne"],
        where: { entreprise: entreprise }
        //We dont want to send the passwords on response
      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("avis not found");
      return;
    }
    res.send(avis);
  };

  
  static GetAvis = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const avisRepository = connectio.getRepository("Avis");
    let avis;
    try {
      avis = await avisRepository.find({
        select: ["niveau","commentaire","entreprise","personne"],
       

      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Avis not found");
      return;
    }
    res.send(avis);
  };


  




  static deleteAvis = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const conn = getConnection();
    //Try to find user on database
    const avisRepository = conn.getRepository("Avis");
    let avis;
    try {
      avis = await avisRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Avis not found");
      return;
    }
    avisRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };


  


} export default AvisController;