import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getClientes, removeCliente } from '../../services/cliente-requests.js';
import { FaTrash, FaEdit } from 'react-icons/fa';

function ViewCliente(){

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        carregaClientes();
    }, []);

    const carregaClientes = async () => {
        const clientesResponse = await getClientes();

        setClientes(await clientesResponse.data);
    }

    const deleteCliente = async (id) => {
        await removeCliente(id);

        return carregaClientes();
    }

    return (
        <div>
            <section className='view-client-container'>
                <h1 className='view-clients-title'>Clientes <span className='text-detail'>cadastrados</span></h1>
                <table className='table-content'>
                    <thead>
                        <tr>
                            <th className='table-column-title'>ID</th>
                            <th className='table-column-title'>Idade</th>
                            <th className='table-column-title'>Nome</th>
                            <th className='table-column-title'>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        { clientes.map(cliente => (
                            <tr key={ cliente.id }>
                                <td data-label="Id">{ cliente.id }</td>
                                <td data-label="Idade">{ cliente.idade }</td>
                                <td data-label="Nome">{ cliente.nome }</td>
                                <td data-label="Email">{ cliente.email }</td>
                                <td>
                                    <Link to={`../edit/${encodeURIComponent(cliente.id)}`}><button className='table-btn'><FaEdit/></button></Link>
                                                      <button className='table-btn' onClick={() => deleteCliente(cliente.id)}><FaTrash/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default ViewCliente;