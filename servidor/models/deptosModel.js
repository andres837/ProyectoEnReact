import db from '../database/db.js'
import {DataTypes } from 'sequelize'

const DeptosModel = db.define('departamentos', {
	idDepartamento:{ type:DataTypes.NUMBER, primaryKey: true, autoIncrement:true},
	DepNombre: { type:DataTypes.CHAR },
	CodigoRegional: { type: DataTypes.NUMBER }
})

export default DeptosModel