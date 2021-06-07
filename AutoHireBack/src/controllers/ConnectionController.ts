import { Request, Response } from "express";
import {  getMongoRepository } from "typeorm";

import { User } from "../entity/User";
import { ObjectID } from 'mongodb';


class ConnectionController {

static accept = async (req: Request, res: Response) => {
    let { from,me } = req.body;

    try {
      const userRepository = getMongoRepository(User);
      const fromm = await userRepository.findOne({
        _id: new ObjectID(from)
      });
      const to = await userRepository.findOne({
        _id: new ObjectID(me)
      });

      var isInArray = fromm.connectionsSent.some(function (user) {
        return user.equals(me);
      });
      var isInArray2 = to.connectionsGet.some(function (user) {
        return user.equals(from);
      });
      var isInArray3 = fromm.connections.some(function (user) {
        return user.equals(me);
      });
      if (isInArray && isInArray2 && !isInArray3) {
        fromm.connections.push(to._id);
       const index =fromm.connectionsSent.indexOf(to._id);
       fromm.connectionsSent.splice(index)
        to.connections.push(fromm._id);
        const x =to.connectionsGet.indexOf(fromm._id);
        fromm.connectionsGet.splice(x)
        await userRepository.save(fromm);
        await userRepository.save(to);
      }
      else
        throw "Exception";

   
    }

    catch (e) {
      res.status(404).send("you have no invitation with this name");
      return;
    }


    res.status(200).send("You have new connection");

  }
  static deccline = async (req: Request, res: Response) => {
    let { from,too } = req.body;


    try {
      const userRepository = getMongoRepository(User);
      const fromm = await userRepository.findOne({
        _id: new ObjectID(from)
      });
      const to = await userRepository.findOne({
        _id: new ObjectID(too)
      });

    

      var isInArray = fromm.connectionsSent.some(function (user) {
        return user.equals(too);
      });
      var isInArray2 = to.connectionsGet.some(function (user) {
        return user.equals(from);
      });
      
      if (isInArray && isInArray2 ) {
       
        const index =fromm.connectionsSent.indexOf(to._id);
        fromm.connectionsSent.splice(index);
        const x =to.connectionsGet.indexOf(fromm._id);
        fromm.connectionsGet.splice(x);
        await userRepository.save(fromm);
        await userRepository.save(to);

      }
      else
        throw "Exception";

    }

    catch (e) {
      res.status(404).send("you have no invitation with this name");
      return;
    }

    res.status(200).send("You have decclined the invitaion successfully");

  }
  static send = async (req: Request, res: Response) => {
    let { from,too } = req.body;

    try {
      const userRepository = getMongoRepository(User);
      const fromm = await userRepository.findOne({
        _id: new ObjectID(from)
      });
      const to = await userRepository.findOne({
        _id: new ObjectID(too)
      });
      var isInArray = fromm.connectionsSent.some(function (user) {
        return user.equals(too);
      });
      var isInArray2 = to.connectionsGet.some(function (user) {
        return user.equals(from);
      });
      var isInArray23 = to.connections.some(function (user) {
        return user.equals(from);
      });
      if (!isInArray && !isInArray2 && !isInArray23) {
        fromm.connectionsSent.push(to._id);
        to.connectionsGet.push(fromm._id);

        await userRepository.save(fromm);
        await userRepository.save(to);
      }
      else
        throw "Exception";

    }

    catch (e) {
      res.status(404).send("you have already sent connection name");
      return;
    }

    res.status(200).send("You have new invitation");

  }


} export default ConnectionController;