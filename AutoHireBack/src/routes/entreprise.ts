import { Router } from "express"; import EntrepriseController from "../controllers/EntrepriseController"; 
const router = Router(); 
router.post("/newEntreprise",  EntrepriseController.newEntreprise); 
router.patch("/:id" ,EntrepriseController.editEntreprise);
router.get("/n/:nom" ,EntrepriseController.GetEntrepriseByNom);
router.get("/id/:id" ,EntrepriseController.GetEntrepriseById);

router.get("/" ,EntrepriseController.GetAllEntreprise);



router.delete("/delete/:id", EntrepriseController.deleteEntreprise);
router.get("/ApplicantsForOffer/:entrepriseId", EntrepriseController.GetApplicantsForOffer);



    export default router;