import { Sequelize} from "sequelize";
import DeptoModel from "../models/deptosModel.js"
 export const getAllDeptos = async (req, res) =>{
 	try {
 		const deptos = await DeptoModel.findAll()
 		res.json(deptos)
 	} catch (error) {
 		res.json({ message: error.message})
 	}
 }