import axios from "axios";
import { useState, useEffect } from "react"
// import { v4 as uuidv4 } from 'uuid';
// import { ToastContainer, toast } from "react-toastify";

export function Categoria(){
    const url = "http://localhost:8080/categoria";

    const [categoria, setCategoria] = useState([])
    const [ id, setId ]   = useState("")
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    
    useEffect( () => {
      axios.get(url)
      .then( res => setCategoria(res.data));
      // console.log(categoria)
    }, [categoria])

    const Inserir = (e) => {
        e.preventDefault()

        axios.post(url, {
            nome,
            descricao
        })
        .then( () => {
            alert(nome + " Cadastrado com sucesso")
            setNome(''), setDescricao('')
        })
        .catch( (error ) => {
            console.log('Error: ' + error)
        })
    }

    /** Metodo Remover  */
    const Remover = (id, nome) => {
        // console.log('Remover !!! ')

            const res = window.confirm('Deseja realmente excluir? ' + nome)
            
            if(res === true){
                axios.delete(`${url}/${id}`)
                console.log(id);
                return false
            }else{
                console.log('error')
            }
    }

    return(
        <>
            {/* <ToastContainer /> */}
            <form>
                <input type="text" placeholder="Categoria" onChange={ e => setNome(e.target.value)} value={nome} />
                <input type="text" placeholder="Descrição" onChange={ e => setDescricao(e.target.value)} value={descricao} />

                <input type="hidden" value={id} name="id" onChange={ e => setId(e.target.value)} />
                <button onClick={Inserir}>Cadastrar</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Categoria</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        categoria.map( item => (
                        // <tr key={uuidv4()}>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.descricao}</td>
                            <td>
                                <button onClick={ () => Remover(item.id, item.nome) } > 
                                    Exluir
                                </button>
                            </td>
                        </tr>
                      ))
                    }
                </tbody>
            </table>
        </>
    )
}