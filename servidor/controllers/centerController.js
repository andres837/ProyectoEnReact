import { Sequelize } from "sequelize";
import CenterModel from "../models/centerModel.js";

import { DeptosModel, MunicipioModel } from "../app.js";
//mostrar registros 
export const getAllCenters = async (req, res) => {
    try {
        const centers = await CenterModel.findAll({
           
         include: [{
            model:DeptosModel, 
            as: 'deptos'
         },{
            model: MunicipioModel,
            as: 'mcipio'
         }
         ]




     })

  res.json(centers) 

    } catch (error) {
        res.json({ message: error.message })
    
}
}
//mostrar un registro 
export const getCenter = async (req, res) => {
    try {
        const center = await CenterModel.findAll({
            where: {id: req.params.id }
        })
        res.json(center[0])

    } catch (error) {
        res.json({ message: error.message })
    }
}
export const createCenter = async (req, res) => {
    try {
        await CenterModel.create(req.body)
        res.json({ "message": "Registro Creado Exitosamente" })

    }catch (error) {
        res.json({ message: error.message})
    }
}
// actualizar un registro 
export const updateCenter = async (req, res) => {
    try {
        await CenterModel.update(req.body, {
         where: { id: req.params.id }

        })
        res.json({ "message": " actualizado exitosamente" })
    } catch(error){
        res.json({ message: error.message })
    }
}
//borrar un registro
export const deleteCenter = async (req, res) => {
    try {
        await CenterModel.destroy({
            where: { id: req.params.id }
        })
        res.json({ "message": "registro borrado exitosamente" })
    }catch (error) {
        res.json ({ message: error.message })
    }
}

//consulta de usuario por documento
export const getQueryCenter =async (req, res) =>{
    try{
        const center = await CenterModel.findAll({
            where:{
                nombre_centro: {
                [Sequelize.Op.like]: `%${req.params.nombre_centro}%`
                //esta instruccion remplaza al like de una consulta en MySQL
                //
                }
            }

        })
        res.json(center) //obtener respuesta
    } catch (error){
        res.json({ menssage: error.menssage})
    }
}