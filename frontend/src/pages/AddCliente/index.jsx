import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { addCliente } from '../../services/cliente-requests.js';

function AddCliente(){

    const navigate = useNavigate();

    const [cliente, setCliente] = useState({
        nome: "",
        idade: "",
        email: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setCliente((clienteAnterior) => {
            return {
                ...clienteAnterior,
                [name]: value
            }
        }
        );
    }

    const salvaCliente = async (event) => {
        event.preventDefault();
        console.log(cliente);

        await addCliente(cliente);

        navigate('/cliente/view');
    }

    return (
        <div>
            <section className="add-client-container">
                <h1 className="add-client-title">Adicionar <span className="text-detail">Cliente</span></h1>
                <form className="add-client-form-layout" onSubmit={salvaCliente}>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" name="nome" value={cliente.nome} onChange={handleChange} />
                    
                    <label htmlFor="idade">Idade</label>
                    <input type="text" name="idade" value={cliente.idade} onChange={handleChange} />
                    
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={cliente.email} onChange={handleChange} />
                    
                    <button type="submit">Salvar</button>
                </form>
            </section>
        </div>
    );
}

export default AddCliente;