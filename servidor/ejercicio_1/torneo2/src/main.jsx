import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import 'bootstrap/dist/css/bootstrap.min.css'
import CrudPlayers from './players/crudPlayers.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
<CrudPlayers/>
  </React.StrictMode>,
)
