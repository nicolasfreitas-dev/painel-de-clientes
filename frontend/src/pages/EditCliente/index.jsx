import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editCliente, getCliente } from '../../services/cliente-requests.js';

function EditCliente(){

    const { id } = useParams();

    const navigate = useNavigate();

    const [cliente, setCliente] = useState({
        id: "",
        nome: "",
        idade: "",
        email: ""
    });

    useEffect(() => {
        buscaCliente(id);
    }, []);

    const buscaCliente = async(id) => {
        const clienteDados = await (await getCliente(id)).data;

        setCliente(clienteDados);
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setCliente((clienteAnterior) => {
            return {
                ...clienteAnterior,
                [name]: value
            }
        }
        );
    }

    const editarCliente = async (event) => {
        event.preventDefault();

        await editCliente(cliente);

        navigate('/cliente/view');
    }

    return (
        <div>
            <section className='edit-client-container'>
                <h1 className='edit-client-title'>Editar <span className='text-detail'>Cliente</span></h1>
                <form className='edit-client-form-layout' onSubmit={editarCliente}>
                    <label htmlFor="id">ID</label>
                    <input type="text" name='id' value={cliente.id} onChange={handleChange} readOnly />

                    <label htmlFor="nome">Nome</label>
                    <input type="text" name='nome' value={cliente.nome} onChange={handleChange} />

                    <label htmlFor="idade">Idade</label>
                    <input type="text" name='idade' value={cliente.idade} onChange={handleChange} />

                    <label htmlFor="email">Email</label>
                    <input type="text" name='email' value={cliente.email} onChange={handleChange} />

                    <button type='submit'>Atualizar Cliente</button>
                </form>
            </section>
        </div>
    );
}

export default EditCliente;