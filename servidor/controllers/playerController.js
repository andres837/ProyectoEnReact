import { Sequelize } from "sequelize";
import PlayerModel from "../models/playerModel.js";
// mostrar todos los registros
export const getAllPlayers = async (req, res) => {
    try {
        const players = await PlayerModel.findAll()
            res.json(players)
        
    } catch (error) {
        res.json({ message: error.message })
    }
}
// mostrar un registro 
export const getPlayer = async (req, res) => {
    try {
        const player = await PlayerModel.findAll({
            where: { id: req.params.id }
        })
        res.json(player[0])

    } catch (error) {
        res.json({ message: error.message })
    }
}
// crear un jugador
export const createPlayer = async (req, res) => {
    try {
        const { documento, nombres, apellidos, genero} = req.body
        const foto = req.file ? req.file.filename : null
         await PlayerModel.create({
            documento,
            nombres,
            apellidos,
            genero,
            foto
         })
        res.json({ "message": "Registro Creado Exitosamente" })

    }catch (error) {
        res.json({ message: error.message})
    }
}
// actualizar un registro 
export const updatePlayer = async (req, res) => {
    try {
         const { documento, nombres, apellidos, genero } = req.body
         const foto = req.file ? req.file.filename : null

          if (foto != null) {
            await PlayerModel.update({
                documento,
                nombres,
                genero,
                foto

            }, { where: { id: req.params.id }})

          }else {
            await PlayerModel.update({
                documento,
                nombres,
                genero,
                foto
            }, { where: { id: req.params.id}})

          
        }
        res.json({ "message": " actualizado exitosamente" })
    } catch(error){
        res.json({ message: error.message })
    }
}
//borrar un registro
export const deletePlayer = async (req, res) => {
    try {
        await PlayerModel.destroy({
            where: { id: req.params.id }
        })
        res.json({ "message": "registro borrado exitosamente" })
    }catch (error) {
        res.json ({ message: error.message })
    }
}
// consulta de usuario por documento
export const getQueryPlayer =async (req, res) =>{
    try{
        const player = await PlayerModel.findAll({
            where:{
                documento: {
                [Sequelize.Op.like]: `%${req.params.documento}%`
                //esta instruccion remplaza al like de una consulta en MySQL
                //
                }
            }

        })
        res.json(player) //obtener respuesta
    } catch (error){
        res.json({ menssage: error.menssage})
    }
}
