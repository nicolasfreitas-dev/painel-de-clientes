import{ Routes, Route } from 'react-router-dom';
import Home from './pages/Home/index.jsx';
import Cliente from './pages/Cliente/index.jsx';
import AddCliente from './pages/AddCliente/index.jsx';
import EditCliente from './pages/EditCliente/index.jsx';
import ViewCliente from './pages/ViewCliente/index.jsx';
import NoMatch from './pages/NoMatch/index.jsx';
import './root.css'
import './app.css';

function App() {
    return (
        <div>
            <header className="header-container">
                <nav className="sidebar-home">
                    <ul className="sidebar-itens">
                        <li><a href="http://localhost:5173" target='_self'>Página Inicial</a></li>
                        <li><a href="http://localhost:5173/cliente/view" target='_self'>Clientes</a></li>
                        <li><a href="http://localhost:5173/cliente" target='_self'>Adicionar cliente</a></li>
                    </ul>
                </nav>
            </header>
            <Routes>
                <Route index element={<Home />}/>
                <Route path='cliente' element={<Cliente />}>
                    <Route index element={<AddCliente />}/>
                    <Route path='edit/:id' element={<EditCliente />}/>
                    <Route path='view' element={<ViewCliente />}/>
                </Route>
                <Route path='*' element={<NoMatch />}/>
            </Routes>
        </div>
    );
}

export default App
