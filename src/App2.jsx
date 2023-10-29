import axios from "axios";
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';

function App() {
  const url = "http://localhost:8080/categoria";

  const [categoria, setCategoria] = useState([])

/*** 
  const lista = [
    { "id": 1, "nome": "Front-End" },
    { "id": 3, "nome": "BackEnd" },
    { "id": 3, "nome": "UX Experiência" }
  ]
*/
  useEffect( () => {
    axios.get(url)
    .then( res => setCategoria(res.data));
    console.log(categoria)
  }, [categoria])

  return (
    <>
        {
        categoria.map( item => (
          <ul key={uuidv4()}>
            <li>{item.nome}</li>
          </ul>
        ))
      }
    </>
  )
}

export default App
