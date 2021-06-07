import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import offre from "./offre";
import adresse from "./adresse";
import experience from "./experience";
import entreprise from "./entreprise";
import formation from "./formation";
import candidature from "./candidature";
import avis from "./avis";
import evaluation from "./evaluation";
import test from "./test";
import connection from "./connection";
const routes = Router();


routes.use("/auth", auth);
routes.use("/user", user);

routes.use("/offre", offre);

routes.use("/connection", connection);
routes.use("/adresse", adresse);
routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/experience", experience);
routes.use("/offre", offre);
routes.use("/entreprise", entreprise);
routes.use("/formation", formation);
routes.use("/test", test);
routes.use("/candidature", candidature);
routes.use("/avis", avis);
routes.use("/evaluation", evaluation);

export default routes;