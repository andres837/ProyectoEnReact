import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
// import CrudPlayers from './players/crudPlayers.jsx'
// import FormPlayers from './players/formPlayers.jsx'
import { BrowserRouter } from 'react-router-dom'



// import EditPlayer from './players/editPlayer';
// const root = createRoot(container);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    
{/* <CrudPlayers/> */}





  </React.StrictMode>,
)
