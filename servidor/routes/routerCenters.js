import express, { Router } from "express";
import CenterModel from "../models/centerModel.js";
import { createCenter, deleteCenter, getAllCenters, getCenter, getQueryCenter, updateCenter} from "../controllers/centerController.js";

const router = express.Router()
router.get('/', getAllCenters)
router.get('/:id', getCenter)
router.post('/' ,createCenter)
router.put('/:id', updateCenter)
router.delete('/:id', deleteCenter)
//consulta de centro
router.get('/nombre_centro/:nombre_centro', getQueryCenter)


export default router