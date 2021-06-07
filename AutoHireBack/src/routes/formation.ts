import { Router } from "express"; import FormationController from "../controllers/FormationController"; 
const router = Router(); 
router.post("/newFormation", FormationController.newFormation); 
router.post("/:id" ,FormationController.editFormation);


router.get("/" ,FormationController.GetAllFormations);



router.post("/delete/:id",FormationController.deleteFormation);



    export default router;