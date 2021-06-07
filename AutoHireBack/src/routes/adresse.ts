import { Router } from "express"; import AdresseController from "../controllers/AdresseController"; 

const router = Router(); 
router.post("/newAdresse",  AdresseController.newAdresse); 
router.patch("/:id" ,AdresseController.editAdresse);
router.get("/:ville" ,AdresseController.GetAdresseByVille);
router.get("/" ,AdresseController.GetAllAdresse);
router.delete("/delete/:id", AdresseController.deleteAdresse);

export default router;