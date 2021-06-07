
import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all users
router.get("/", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);
router.get("/e/:entreprise" ,UserController.GetByEntreprise);

// Get one user
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  UserController.getOneById
);

//Create a new user
router.post("/", UserController.newUser);

//Edit one user
router.post(
  "/edit/information",
  UserController.editUser
);
router.post(
  "/edit/headline",
  UserController.editUserHedaline
);
//Delete one user
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  UserController.deleteUser
);
router.get(
  "/Info/:username",

  UserController.getInformation
);
router.get(
  "/linked",

  UserController.retrieveDataFromLinkedin
);

router.post(
  "/validateResume",

  UserController.ValidateProfile
);


// Get  user by username
router.post("/me", UserController.getOneByUsername);

//router.put('/forgot-password',UserController.forgotPaswword)


export default router;