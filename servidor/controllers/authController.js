import bcryptjs from 'bcryptjs'
import UserModel from '../models/userModel.js'
import { sendPasswordResetEmail } from '../servicios/emailService.js'
import { where } from 'sequelize'

import jwt from 'jsonwebtoken'

export const createUser = async (req, res) => { // funcion para crear usuarios
	try {
		const { name, email, password } = req.body

		// validar si ya existe un usuario con el mismo correo 
		let user = await UserModel.findOne({ where: { email: email } })

		if (user) {
             // si el usuario existe 
			res.json({ "message": "El usuario ya existe "})

		} else { // si el usuario no existe, permite ingresar 
			// console.log(password)
		//incriptar la constraseña

		let passHash = await bcryptjs.hash(password, 6)

		//enviar datos a la base db
		const userOk = await UserModel.create({
			"name": name,
			"email": email,
			"password": passHash
		})
		// para generar el token se asigna 3 elementos 1: los datos que se obtienen del usuario 2: la llave del archivo .env 3: la duracion del token
		const tokenUser = jwt.sign({ user: { email: userOk.email } }, process.env.JWT_LLAVE, { expiresIn: '4h' })
		// console.log("TOKEN: " + tokenUser)
		
		 res.json({ "message": "Usuario creado exitosamente" })
			res.json({ tokenUser })

		}

	
	} catch (error) {

		res.json({"message": error})
	}
}
    export const verifyToken = (req, res) => {

    const token = req.header('Authorization').replace('Bearer ', '')

    if (!token) {

        res.status(401).json({ message: 'Acceso denegado' })
    }

    try {
        const decodificado = jwt.verify(token, process.env.JWT_LLAVE)
        req.user = decodificado
        res.status(200).json({ message: 'token valido' })

    } catch (error) {

        res.status(400).json({ message: 'token invalido' })
    }
}
 
 export const logInUser = async (req, res) => {
    const { email, password } = req.body; // Recibir los datos del formulario

    try {
        // Buscar el usuario con ese correo
        const userOk = await UserModel.findOne({ where: { email: email } });

        // Verificar si el usuario no existe o si la contraseña es incorrecta
        if (!userOk || !bcryptjs.compareSync(password, userOk.password)) {
             res.status(401).json({ message: 'Usuario o clave inválidos' });

        } else {
            // Si el usuario y la contraseña son correctos, generar el token
        const tokenUser = jwt.sign({ user: { email: userOk.email } }, process.env.JWT_LLAVE, { expiresIn: '4h' });

        // Retornar el token como respuesta
        res.json({ tokenUser })

        }
    } catch (error) {
        // Manejar errores de base de datos u otros errores internos
        res.status(500).json({ message: error.message });
    }
};
 
 export const getResetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Usar 'await' para esperar el resultado de la búsqueda
    const user = await UserModel.findOne({ where: { email: email } });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Crear el token para restablecer la contraseña
    const tokenForPassword = jwt.sign(
      { user: { id: user.id, name: user.name, email: user.email } },
      process.env.JWT_LLAVE,
      { expiresIn: '30m' }
    );

    // Enviar el correo electrónico de restablecimiento de contraseña
    await sendPasswordResetEmail(email, tokenForPassword);

    return res.status(200).json({ message: 'El mensaje para restablecer la contraseña fue enviado' });
  } catch (error) {
    // Manejo de errores
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
 export const setNewPassword = async (req, res) => {
 	
 	const { tokenForPassword, newPassword } = req.body

 	try {
 		const decodificado = jwt.verify(tokenForPassword, process.env.JWT_LLAVE)
        
        const user = await UserModel.findByPk(decodificado.user.id)

        if (!user) {
        	res.status(404).json({ message: 'Usuario no encontrado'})

        } else {
        	let passHash = await bcryptjs.hash(newPassword, 6)

        	// se actualiza la contraseña del usuario
        	await UserModel.update({
        		password: passHash
        	}, { where: { id: decodificado.user.id } })

        	res.status(200).json({ message: 'contraseña actualizada correctamente' })
        }	

 	} catch (error) {
 		res.status(400).json({ message: 'informaion invalida o el tiempo a expirado'})

 	}
 }