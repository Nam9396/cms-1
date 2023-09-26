import express from "express";
import { testFunction } from "../controller/cloudController.js";

const cloudRoute = express.Router();

cloudRoute.route('/start').get(testFunction);



export default cloudRoute;