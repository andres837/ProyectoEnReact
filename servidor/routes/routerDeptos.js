import express from 'express'
import { getAllDeptos } from "../controllers/deptosController.js";

const router = express.Router()

router.get('/', getAllDeptos)

export default router