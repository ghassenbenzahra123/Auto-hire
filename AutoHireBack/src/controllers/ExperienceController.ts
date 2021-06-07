import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { validate } from "class-validator";
import { Experience } from "../entity/Experience";

const distance = 60000; // en metre

class ExperienceController {
  static newExperience = async (req: Request, res: Response) => { //Get parameters from the body 
    let { titre, dateDebut, dateFin,description ,user} = req.body;
    let experience = new Experience();
    experience.titre = titre;
    experience.dateDebut = dateDebut;
    experience.dateFin = dateFin;
    experience.description = description;
    experience.user = user;
    

    const connection = getConnection();
    const experienceRepository = connection.getRepository("Experience");

    try {
      await experienceRepository.save(experience);
    }
    catch (e) {
      res.status(409).send("experience already in use");

      return;
    } //If all ok, send 201 response 
    res.status(201).send("experience created");
  };


  static editExperience = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { titre, dateDebut, dateFin,description,user }  = req.body;
    const conn = getConnection();
    //Try to find user on database
    const experienceRepository = conn.getRepository("Experience");
    let experience;
    try {
      experience = await experienceRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("experience not found");
      return;
    }

    //Validate the new values on model
    experience.titre = titre;
  
    experience.dateDebut = dateDebut;
    experience.dateFin = dateFin;
    experience.description = description;
    experience.user = user;
    
    const errors = await validate(experience);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await experienceRepository.save(experience);
    } catch (e) {
      res.status(409).send("experience  already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };




    
 

  
  static GetAllExperience = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const experienceRepository = connectio.getRepository("Experience");



   


    let experience;
    try {
      experience = await experienceRepository.find({
        select: ["id", "titre", "dateDebut", "dateFin","description","user"],
       

      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("experience not found");
      return;
    }
    res.send(experience);
  };

  static GetAllExperienceUser = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const experienceRepository = connectio.getRepository("Experience");

    const userRepository = connectio.getRepository("User");


   


    let experience;
    try {
      experience = await experienceRepository.createQueryBuilder("experience")
  
      .where("experience.user = 603e517b980e802fc0cceeaf")
      .getMany()

    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("experience not found");
      return;
    }
    res.send(experience);
  };


  


  

  static deleteExperience = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const conn = getConnection();
    //Try to find user on database
    const experienceRepository = conn.getRepository("Experience");
    let experience;
    try {
      experience = await experienceRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("experience not found");
      return;
    }
    experienceRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };




} export default ExperienceController;