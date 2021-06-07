import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { validate } from "class-validator";
import { Evaluation } from "../entity/Evaluation";


const distance = 60000; // en metre

class EvaluationController {
  static newEvaluation = async (req: Request, res: Response) => { 
    //Get parameters from the body 
    let { integrity,planification,ponctuality,innovation,motivation,amelioration,commentaire,employee,entreprise } = req.body;
    let evaluation = new Evaluation();
    evaluation.integrity = integrity;
    evaluation.planification = planification;
    evaluation.ponctuality = ponctuality;
    evaluation.innovation = innovation;
    evaluation.motivation = motivation;
    evaluation.amelioration = amelioration;
    
    evaluation.commentaire = commentaire;
    evaluation.employee = employee;
    evaluation.entreprise = entreprise;

    const connection = getConnection();
    const evaluationRepository = connection.getRepository("Evaluation");

    try {
 
      await evaluationRepository.save(evaluation);
    }
    catch (e) {
      res.status(409).send("evaluation already in use");

      return;
    } //If all ok, send 201 response 
    res.status(201).send("evaluation created");
  };


  static editEvaluation = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const {integrity,planification,ponctuality,innovation,motivation,amelioration,commentaire,employee,entreprise}  = req.body;
    const conn = getConnection();
    //Try to find user on database
    const evaluationRepository = conn.getRepository("Evaluation");
    let evaluation;
    try {
        evaluation = await evaluationRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("evaluation not found");
      return;
    }

    evaluation.integrity = integrity;
    evaluation.planification = planification;
    evaluation.ponctuality = ponctuality;
    evaluation.innovation = innovation;
    evaluation.motivation = motivation;
    evaluation.amelioration = amelioration;
    
    evaluation.commentaire = commentaire;
    evaluation.employee = employee;
    evaluation.entreprise = entreprise;
    const errors = await validate(evaluation);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await evaluationRepository.save(evaluation);
    } catch (e) {
      res.status(409).send("evaluation  already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };


  static GetTotalevaluation = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const evaluationRepository = connectio.getRepository("Evaluation");
    let evaluation;
    try {
        evaluation = await evaluationRepository.find({
        select: ["id","integrity","planification","ponctuality","innovation","motivation","amelioration","commentaire","employee"],
       

      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("evaluation not found");
      return;
    }
    res.send(evaluation);
  };

 
  static GetEvaluationByEmployee = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const evaluationRepository = connectio.getRepository("Evaluation");



    const employee = req.params.employee;


    let evaluation;
    try {
        evaluation = await evaluationRepository.find({
        select: ["id","integrity","planification","ponctuality","innovation","motivation","amelioration","commentaire","employee"],
        where: { employee: employee }
        //We dont want to send the passwords on response
      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("evaluation not found");
      return;
    }
    res.send(evaluation);
  };

  
  static GetEvaluation = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const evaluationRepository = connectio.getRepository("Evaluation");
    let evaluation;
    try {
        evaluation = await evaluationRepository.find({
        select: ["id","integrity","planification","ponctuality","innovation","motivation","amelioration","commentaire","employee"],
       

      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("evaluation not found");
      return;
    }
    res.send(evaluation);
  };


  




  static deleteEvaluation = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const conn = getConnection();
    //Try to find user on database
    const evaluationRepository = conn.getRepository("Evaluation");
    let evaluation;
    try {
        evaluation = await evaluationRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("evaluation not found");
      return;
    }
    evaluationRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };


  


} export default EvaluationController;