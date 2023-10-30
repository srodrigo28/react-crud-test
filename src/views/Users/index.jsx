import axios from "axios";
import { useEffect, useState } from "react"

export function Users(){
    const url = "http://localhost:8080/user"

    const [users, setUsers] = useState([])
    const [ id, setId ]   = useState("")
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");

    useEffect(() => {
        axios.get(url)
        .then(res => setUsers(res.data))
    }, [users])

    const newUser = (event) => {
        event.preventDefault()

        axios.post(url, {
            nome,
            senha
        })
        .then(() => {
            alert(`Usúario: ${nome} cadastrado com sucesso`)
            setNome(""), setSenha("")
        })
        .catch((err) => {
            console.log('Erro: ' + err)
        })
    }

    const removeUser = (id, nome) => {
        const res = window.confirm(`Deseja realmente apagar o usuário ${nome} ?`)
        
        if (res === true) {
            axios.delete(`${url}/${id}`)
            return false
        } else {
            console.log('Erro Ao Deletar');
        }
    }

    return(
        <>
            <form>
                <input type="text" placeholder="Nome de Usuario" onChange={ e => setNome(e.target.value) } value={nome} />
                <input type="text" placeholder="Senha do Usuario" onChange={ e => setSenha(e.target.value) } value={senha}  />

                <input type="hidden" value={id} name="id" onChange={ e => setId(e.target.value)} />
                <button onClick={newUser}>Cadastrar um Usuário</button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Senha</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.nome}</td>
                                <td>{user.senha}</td>
                                <td>
                                    <button onClick={ () => removeUser(user.id, user.nome)} >
                                        Excluir
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