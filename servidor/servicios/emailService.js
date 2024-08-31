import nodeMailer from 'nodemailer'

export const transportador = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
        user: 'andresossa078@gmail.com',
        pass: 'aquivalaconstraseña', // 
    }
})

export const sendPasswordResetEmail = async (email, tokenForPassword) => {
    const RESET_URL = `http://localhost:5173/reset-password?llave=${tokenForPassword}`
    const mailOptions = {
        from: 'andresossa078@gmail.com',
        to: email,
        subject: 'Restablecer contraseña',
        text: `Por favor usa el siguiente enlace para restablecer tu contraseña: ${RESET_URL}`
    }

    try {
        await transportador.sendMail(mailOptions)
        console.log('Correo enviado con éxito')
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw error; // Opcional: vuelve a lanzar el error para manejarlo en otro lugar si es necesario
    }
}
