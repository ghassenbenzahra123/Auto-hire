import { Router } from "express"; import CandidatureController from "../controllers/CandidatureController"; 
const router = Router(); 
router.post("/newCandidature",  CandidatureController.newCandidature); 
router.patch("/:id" ,CandidatureController.editCandidature);
router.get("/:ref" ,CandidatureController.GetCandidatureByRef );

router.get("/" ,CandidatureController.GetAllCandidature);



router.delete("/delete/:id", CandidatureController.deleteCandidature);



    export default router;