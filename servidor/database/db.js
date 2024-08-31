import  { Sequelize } from "sequelize";
const db = new Sequelize('torneo_react', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})
export default db