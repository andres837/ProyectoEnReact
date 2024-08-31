import db from "../database/db.js";
import { DataTypes } from "sequelize";

const PlayerModel = db.define('players', {
    documento: { type: DataTypes.NUMBER },
    nombres: { type: DataTypes.STRING },
    apellidos: { type: DataTypes.STRING },
    genero: { type: DataTypes.CHAR },
    foto: { type: DataTypes.STRING }

})
export default PlayerModel