import { Sequelize} from "sequelize"
import MunicipioModel from "../models/municipioModel.js"
//import CenterModel from "../models/centerModel.js";
//obtener todos los municipios
export const getAllMunicipios = async (req, res) => {
	try{
		const municipios = await MunicipioModel.findAll()
           
		res.json(municipios)

	} catch (error) {
		res.json({ message: error.message })
	}
}
// otbtener los municipios de un departamento
export const getMunicipiosPorDepto = async(req, res) => {
	try {
		const municipios = await MunicipioModel.findAll({


			 
			where: { idDepto: req.params.idDepto }
			
			
			
		})
		// console.log(municipios)
		res.json(municipios)
	} catch (error) {
		res.json({ message: error.message })
	}
}