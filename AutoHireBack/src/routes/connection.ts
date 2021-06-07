import { Router } from "express"; import ConnectionController from "../controllers/ConnectionController"; 
const router = Router(); 
router.post("/accept",  ConnectionController.accept); 
router.post("/send",  ConnectionController.send); 

export default router;