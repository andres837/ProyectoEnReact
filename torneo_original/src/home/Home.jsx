import "../home/home.css";
import sistema from '../assets/sistema.jpg'; // Importa la imagen
const Home = () => {
    return (
        <>

        <div className="container_1">
        <div className="card text-center">

        <h1 className="estilohome">BIENVENDO AL SISTEMA FICTICIO</h1>
        </div>
        </div>
        <div className="Imagen-fondo">
        <img src={sistema}  className="Imagen" />
        </div>
        </>
    )
   
}
export default Home