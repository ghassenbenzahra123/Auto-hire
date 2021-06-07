import { Router } from "express"; import AvisController from "../controllers/AvisController"; 
const router = Router(); 
router.post("/newAvis",  AvisController.newAvis); 
router.patch("/:id" ,AvisController.editAvis);
router.get("/" ,AvisController.GetAvis);
router.get("/e/:entreprise" ,AvisController.GetAvisByEntreprise);
router.delete("/delete/:id", AvisController.deleteAvis);




    export default router;