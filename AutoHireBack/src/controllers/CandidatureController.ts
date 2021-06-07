import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { validate } from "class-validator";
import { Candidature } from "../entity/Candidature";

const distance = 60000; // en metre

class CandidatureController {
  static newCandidature = async (req: Request, res: Response) => { //Get parameters from the body 
    let { ref,date,etat } = req.body;
    let candidature = new Candidature();
    candidature.ref = ref;
    candidature.date = date;
    candidature.etat = etat;

    

    const connection = getConnection();
    const candidatureRepository = connection.getRepository("Candidature");

    try {
 
      await candidatureRepository.save(candidature);
    }
    catch (e) {
      res.status(409).send("candidature already in use");

      return;
    } //If all ok, send 201 response 
    res.status(201).send("candidature created");
  };


  static editCandidature = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { ref,date,etat  }  = req.body;
    const conn = getConnection();
    //Try to find user on database
    const candidatureRepository = conn.getRepository("Candidature");
    let candidature;
    try {
      candidature = await candidatureRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("candidature not found");
      return;
    }

    //Validate the new values on model
    candidature.ref = ref;
    candidature.date = date;
    candidature.etat = etat;
   
    const errors = await validate(candidature);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    
    try {
      await candidature.save(candidature);
    } catch (e) {
      res.status(409).send("candidature  already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };


  static GetCandidatureByRef = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const candidatureRepository = connectio.getRepository("Candidature");



    const ref = req.params.ref;


    let candidature;
    try {
      candidature = await candidatureRepository.find({
        select: ["id","ref","date","etat"],
        where: { ref: ref }
        //We dont want to send the passwords on response
      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("candidature not found");
      return;
    }
    res.send(candidature);
  };

 

  
  static GetAllCandidature = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const candidatureRepository = connectio.getRepository("Candidature");



   


    let candidature;
    try {
      candidature = await candidatureRepository.find({
        select: ["id","ref","date","etat"],
       

      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("candidature not found");
      return;
    }
    res.send(candidature);
  };


  




  static deleteCandidature = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const conn = getConnection();
    //Try to find user on database
    const candidatureRepository = conn.getRepository("Candidature");
    let candidature;
    try {
      candidature = await candidatureRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("candidature not found");
      return;
    }
    candidatureRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };


  


} export default CandidatureController;