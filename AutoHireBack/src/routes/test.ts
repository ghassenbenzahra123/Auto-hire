import { Router } from "express"; import TestController from "../controllers/TestController"; 
const router = Router(); 
router.post("/newTest",  TestController.newTest); 
router.patch("/:id" ,TestController.editTest);
router.get("/:question" ,TestController.GetTestByQuestion);
router.get("/sujet/:sujet" ,TestController.GetquestionBySujet);
router.get("/question/:question" ,TestController.GetreponseByQuestion);
router.get("/sujet/sujets" ,TestController.GetSujet);


router.get("/" ,TestController.GetAllTest);



router.delete("/delete/:id", TestController.deleteTest);



    export default router;