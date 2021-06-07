import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { validate } from "class-validator";
import { Test } from "../entity/Test";


const distance = 60000; // en metre

class TestController {
  static newTest = async (req: Request, res: Response) => { //Get parameters from the body 
    let { question,reponseA,reponseB,reponseC,reponseD,sujet } = req.body;
    let test1 = new Test();
    test1.question = question;
    test1.reponseA = reponseA;
    test1.reponseB = reponseB;
    test1.reponseC = reponseC;
    test1.reponseD = reponseD;
    test1.sujet = sujet;

    

    const connection = getConnection();
    const testRepository = connection.getRepository("Test");

    try {
 
      await testRepository.save(test1);
    }
    catch (e) {
      res.status(409).send("test already in use");

      return;
    } //If all ok, send 201 response 
    res.status(201).send("test created");
  };


  static editTest = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { question,reponseA,reponseB,reponseC,reponseD,sujet }  = req.body;
    const conn = getConnection();
    //Try to find user on database
    const testRepository = conn.getRepository("Test");
    let test;
    try {
      test = await testRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("test not found");
      return;
    }

    //Validate the new values on model
    test.question = question;
    test.reponseA = reponseA;
    test.reponseB = reponseB;
    test.reponseC = reponseC;
    test.reponseD = reponseD;
    test.sujet = sujet;
    const errors = await validate(test);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await testRepository.save(test);
    } catch (e) {
      res.status(409).send("test  already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };


  static GetTestByQuestion = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const testRepository = connectio.getRepository("Test");



    const question = req.params.question;


    let test;
    try {
      test = await testRepository.find({
        select: ["id","quetion","reponseA","reponseB","reponseC","reponseD","sujet"],
        where: { question: question }
        //We dont want to send the passwords on response
      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("question not found");
      return;
    }
    res.send(test);
  };

 

  
  static GetAllTest = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const testRepository = connectio.getRepository("Test");



   


    let test;
    try {
      test = await testRepository.find({
        select: ["id","question","reponseA","reponseB","reponseC","reponseD","sujet"],
       

      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("test not found");
      return;
    }
    res.send(test);
  };


  static GetSujet = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const testRepository = connectio.getRepository("Test");
    let test;
    try {
      test = await testRepository.find({
        select: ["id","sujet"],
       

      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("test not found");
      return;
    }
    res.send(test);
  };





  static deleteTest = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const conn = getConnection();
    //Try to find user on database
    const testRepository = conn.getRepository("Test");
    let test;
    try {
      test = await testRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("test not found");
      return;
    }
    testRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static GetquestionBySujet = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const testRepository = connectio.getRepository("Test");



    const tests = req.params.sujet;


    let test;
    try {
      test = await testRepository.find({
        select: ["id", "question","reponseA","reponseB","reponseC","reponseD","sujet"],
        where: { sujet: tests }
        //We dont want to send the passwords on response
      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("avis not found");
      return;
    }
    res.send(test);
  };
  
  static GetreponseByQuestion = async (req: Request, res: Response) => {
    //Get the ID from the url

    const connectio = getConnection();

    //Get the user from database
    const testRepository = connectio.getRepository("Test");



    const tests = req.params.question;


    let test;
    try {
      test = await testRepository.find({
        select: ["id", "question", "reponseA","reponseB","reponseC","reponseD", "sujet"],
        where: { question: tests }
        //We dont want to send the passwords on response
      });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("avis not found");
      return;
    }
    res.send(test);
  };
  

} export default TestController;