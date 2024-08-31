import express from   "express";
import { createPlayer, deletePlayer, getAllPlayers, getPlayer, updatePlayer, getQueryPlayer}  from "../controllers/playerController.js";
import multer from 'multer'
import path from 'path'

const router = express.Router()
//configurar de multer 

const storage = multer.diskStorage({
	// asignar la carpeta dode quedan los archivos
	destination: (req, file, cb) => {
		cb(null, 'public/uploads/')
	},
	//renombrar el archivo con la marca del tiempo actual 
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname))
	}
})
const upload =  multer({ storage })

router.get('/', getAllPlayers)
router.get('/:id', getPlayer)
router.post('/', upload.single('foto'), createPlayer)
router.put('/:id', upload.single('foto'), updatePlayer)
router.delete('/:id', deletePlayer)
//consulta de usuario
router.get('/documento/:documento', getQueryPlayer)


export default router