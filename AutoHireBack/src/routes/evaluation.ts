import { Router } from "express"; 
import EvaluationController from "../controllers/EvaluationController";
const router = Router(); 
router.post("/newEvaluation",  EvaluationController.newEvaluation); 
router.patch("/:id" ,EvaluationController.editEvaluation);
router.get("/" ,EvaluationController.GetEvaluation);
router.get("/e/:employee" ,EvaluationController.GetEvaluationByEmployee);
router.delete("/delete/:id", EvaluationController.deleteEvaluation);




    export default router;