import axios from "axios";
import { useEffect, useState } from "react"

export function Users(){
    const url = "http://localhost:8080/user"

    const [users, setUsers] = useState([])
    const [ id, setId ]   = useState("")
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");

    useEffect(() => {
        axios.get(url)
        .then(res => setUsers(res.data))
    }, [users])

    const newUser = (event) => {
        event.preventDefault()

        axios.post(url, {
            nome,
            email,
            telefone,
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
        <div className="container">
            <form>
                <h1 className="text-center mt-5 mb-5">Novo Usuário</h1>
                <div className="row mb-5">
                    <div className="col-3">
                        <input 
                            type="text" 
                            value={nome}
                            className="form-control"
                            placeholder="Nome de Usuario" 
                            onChange={ e => setNome(e.target.value) } 
                        />
                    </div>
                    <div className="col-3">
                        <input 
                            type="text" 
                            value={email}
                            className="form-control"
                            placeholder="Nome de Email" 
                            onChange={ e => setEmail(e.target.value) } 
                        />
                    </div>
                    <div className="col-2">
                        <input 
                            type="text" 
                            value={telefone}
                            className="form-control"
                            placeholder="(62) 9999-0000" 
                            onChange={ e => setTelefone(e.target.value) } 
                        />
                    </div>
                    <div className="col-2">
                        <input 
                            type="password" 
                            value={senha}
                            className="form-control"
                            placeholder="Senha do Usuario" 
                            onChange={ e => setSenha(e.target.value) } 
                        />
                    </div>
                    <input 
                        name="id" 
                        value={id} 
                        type="hidden" 
                        onChange={ e => setId(e.target.value)}
                    />

                    <div className="col">
                    <button onClick={newUser} className="btn btn-outline-primary" >Cadastrar</button> 
                    </div>
                </div>
            </form>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
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
                                <td>{user.email}</td>
                                <td>{user.telefone}</td>
                                <td>{user.senha}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={ () => removeUser(user.id, user.nome)} >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )

}