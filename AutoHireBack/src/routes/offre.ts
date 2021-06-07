import { Router } from "express"; import OffreController from "../controllers/OffreController";
const router = Router();
router.post("/Newoffre",  OffreController.newOffre);
router.post("/:id" ,OffreController.editOffre);
router.get("/:poste" ,OffreController.GetOffreByPoste);
router.get("/select/:creator" ,OffreController.GetOffreByCreator);
router.get("/selectId/:id" ,OffreController.GetOffreById);
router.get("/e/:industry" ,OffreController.GetByEntreprise);
router.post("/apply/new", OffreController.apply);
router.post("/delete/:id", OffreController.deleteOffre);
router.get("/OffersForApplicant/:UserId", OffreController.GetOffersForApplicant);
router.get("/SavedJobs/:UserId", OffreController.GetSavedJobsForUser);
router.get("/ScrappedOffres/details",OffreController.getDetails);
router.get("/ApplicantsForOffer/:OfferId", OffreController.GetApplicantsForOffer);
router.post("/", OffreController.listOfferByDistance);
router.get("/All/Offre" ,OffreController.GetAll);
router.get("/ByCreator/:creator" , OffreController.GetOffreByCreator);
router.get("/ScrapedOffers/tanit" , OffreController.getScrapedOffers);
router.post("/Save/offre",OffreController.save)
router.post("/Unsave/offre",OffreController.unsave)
 export default router;