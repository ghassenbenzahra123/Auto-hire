import { Router } from "express"; import ExperienceController from "../controllers/ExperienceController"; 
const router = Router(); 
router.post("/newExperience", ExperienceController.newExperience); 
router.post("/:id" ,ExperienceController.editExperience);


router.get("/" ,ExperienceController.GetAllExperience);

router.get("/exp" ,ExperienceController.GetAllExperienceUser);



router.post("/delete/:id", ExperienceController.deleteExperience);



    export default router;