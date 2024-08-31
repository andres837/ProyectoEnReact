import express from 'express';
import cors from 'cors';
import db from './database/db.js';
import playerRoutes from './routes/routesPlayers.js';
import centerRoutes from './routes/routerCenters.js';
//IMPORTAT MODELOS PARA CONSULTAR CON LLAVES FORANEA
import CenterModel from './models/centerModel.js'
import DeptosModel from './models/deptosModel.js'
import MunicipioModel from './models/municipioModel.js'
import authRoutes from './routes/routerAuth.js'

import municipioRoutes from './routes/routerMunicipios.js'

import deptosRoutes from './routes/routerDeptos.js'
import dotenv from 'dotenv'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/players', playerRoutes);
app.use('/centers', centerRoutes);
app.use ('/deptos', deptosRoutes);
app.use('/mcipios', municipioRoutes);
//configurar express para que puede servir los archivos estaticos desde el directorio de cargas 
app.use('/public/uploads/', express.static('public/uploads/'))
app.use('/auth', authRoutes)
// establecer crpet para varibales de entorno con dotev
dotenv.config({ path: './env/.env' })

try {
    await db.authenticate();
    console.log('Conexión exitosa a la base de datos');
} catch (error) {
    console.log(`Error de conexión a la base de datos: ${error}`);
}

app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
// defincicion derelaciones entre tablas 
DeptosModel.hasMany(CenterModel, { foreignKey: 'idDepto', as: 'centers' })
CenterModel.belongsTo(DeptosModel, {foreignKey: 'idDepto', as: 'deptos' })

// Define la relación: Un municipio tiene muchos centros de formación
MunicipioModel.hasMany(CenterModel, { foreignKey: 'id', as: 'centers' });

// Define la relación inversa: Un centro de formación pertenece a un municipio
CenterModel.belongsTo(MunicipioModel, { foreignKey: 'id_municipio', as: 'mcipio' });



export { CenterModel, DeptosModel, MunicipioModel}