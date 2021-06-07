import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { validate } from "class-validator";
import { Position } from "../entity/Position";

const distance = 60000; // en metre

class PositionController {
  static newPosition = async (req: Request, res: Response) => { //Get parameters from the body 
    let { poste, entreprise, dateDebut,user } = req.body;
    let position = new Position();
    position.poste = poste;
    position.entreprise = entreprise;
    position.dateDebut = dateDebut;
    position.user = user;
    
    

    const connection = getConnection();
    const positionRepository = connection.getRepository("Position");

    try {
      await positionRepository.save(entreprise);
    }
    catch (e) {
      res.status(409).send("position already in use");

      return;
    } //If all ok, send 201 response 
    res.status(201).send("position created");
  };


  static editPosition = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { poste, entreprise, dateDebut,user }  = req.body;
    const conn = getConnection();
    //Try to find user on database
    const positionRepository = conn.getRepository("Position");
    let position;
    try {
      position = await positionRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("entreprise not found");
      return;
    }

    //Validate the new values on model
    position.poste = poste;
  
    position.entreprise = entreprise;
    position.dateDebut = dateDebut;
    position.user = user;
    const errors = await validate(entreprise);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await positionRepository.save(position);
    } catch (e) {
      res.status(409).send("position  already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };


  static GetpositionByPoste = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const positionRepository = connectio.getRepository("Position");



    const poste = req.params.poste;


    let position;
    try {
      position = await positionRepository.find({
        select: ["id", "poste", "entreprise", "dateDebut"],
        where: { poste: poste }
        //We dont want to send the passwords on response
      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("position not found");
      return;
    }
    res.send(position);
  };

 

  
  static GetAllPosition = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const positionRepository = connectio.getRepository("Position");



   


    let position;
    try {
      position = await positionRepository.find({
        select: ["id", "poste", "entreprise", "dateDebut"],
       

      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("position not found");
      return;
    }
    res.send(position);
  };


  


  

  static deletePosition = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const conn = getConnection();
    //Try to find user on database
    const positionRepository = conn.getRepository("Position");
    let position;
    try {
      position = await positionRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("position not found");
      return;
    }
    positionRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };


  //If all ok, send 201 response 



  


} export default PositionController;