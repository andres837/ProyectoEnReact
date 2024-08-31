import express from 'express'
import { getAllMunicipios, getMunicipiosPorDepto } from '../controllers/municipioController.js'

const router = express.Router()

router.get('/', getAllMunicipios)
router.get('/depto/:idDepto', getMunicipiosPorDepto)
export default router