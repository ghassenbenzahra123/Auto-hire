import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { validate } from "class-validator";

import { Formation } from "../entity/Formation";
const distance = 60000; // en metre

class FormationController {
  static newFormation = async (req: Request, res: Response) => { //Get parameters from the body 
    let { titre, dateDebut, dateFin,ecole,user} = req.body;
  

    let formation = new Formation();
    formation.titre = titre;
    formation.dateDebut = dateDebut;
    formation.dateFin = dateFin;
    formation.ecole = ecole;
   
    formation.user = user;
    

    const connection = getConnection();
    const formationRepository = connection.getRepository("Formation");

    try {
      await formationRepository.save(formation);
    }
    catch (e) {
      res.status(409).send("formation already in use");

      return;
    } //If all ok, send 201 response 
    res.status(201).send("formation created");
  };


  static editFormation = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { titre, dateDebut, dateFin,ecole,user }  = req.body;
    const conn = getConnection();
    //Try to find user on database
    const formationRepository = conn.getRepository("Formation");
    let formation;
    try {
      formation = await formationRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("formation not found");
      return;
    }

    //Validate the new values on model
    formation.titre = titre;
  
    formation.dateDebut = dateDebut;
    formation.dateFin = dateFin;
    formation.ecole = ecole;
    formation.user = user;
    const errors = await validate(formation);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await formationRepository.save(formation);
    } catch (e) {
      res.status(409).send("formation  already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };




    
 

  
  static GetAllFormations = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const formationRepository = connectio.getRepository("Formation");



   


    let formation;
    try {
      formation = await formationRepository.find({
        select: ["id", "titre", "dateDebut", "dateFin","ecole"],
       

      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("formation not found");
      return;
    }
    res.send(formation);
  };


  


  

  static deleteFormation = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const conn = getConnection();
    //Try to find user on database
    const formationRepository = conn.getRepository("Formation");
    let formation;
    try {
      formation = await formationRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("formation not found");
      return;
    }
    formationRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };




} export default FormationController;