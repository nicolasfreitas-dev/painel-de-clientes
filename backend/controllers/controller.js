const { where } = require('sequelize');
const db = require('../config/db.config.js');
const Cliente = db.Cliente;

exports.createCliente = (req, res) => {
    let cliente = {};

    try {
        cliente.nome = req.body.nome;
        cliente.idade = req.body.idade;
        cliente.email = req.body.email;

        Cliente.create(cliente, {attibutes: ['id', 'nome', 'idade', 'email']})
               .then(result => {
                    res.status(200).json(result);
                });
        }
    catch(error) {
        res.status(500).json({
            message: "Tentativa falha!",
            error: error.message
        });
    }
}

exports.getCliente = (req, res) => {
    Cliente.findByPk(req.params.id, {attibutes: ['id', 'nome', 'idade', 'email']})
           .then(cliente => {
                res.status(200).json(cliente);
            }).catch(error => {
                console.log(error);
                res.status(500).json({
                    message: "Erro!",
                    error: error
                });
            });
}

exports.clientes = (req, res) => {
    try {
        Cliente.findAll({attributes: ['id', 'nome', 'idade', 'email']})
               .then(clientes => {
                res.status(200).json(clientes);
               })
            }catch(error) {
                console.log(error)

                res.status(500).json({
                    message: "Erro!",
                    error: error
                });
    }
}

exports.deleteCliente = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Cliente.findByPk(clienteId);

        if(!cliente) {
            res.status(404).json({
                message: `Não existe cliente com o id = ${clienteId}`,
                error: "404"
            });
        }else {
            await cliente.destroy();
            res.status(200).json('Cliente deletado com sucesso.');
        }
    }
    catch(error) {
        res.status(500).json({
            message: `Erro -> Não foi possível deletar o cliente com o id = ${req.params.id}`,
            error: error.message
        });
    }
}

exports.updateCliente = async (req, res) => {
    try {
        let cliente = await Cliente.findByPk(req.body.id);

        if(!cliente) {
            res.status(404).json({
                message: `Não foi encontrado um cliente com o id = ${clienteId} para atualização.`,
                error: "404"
            });
        } else {
            let updatedObject = {
                nome: req.body.nome,
                idade: req.body.idade,
                email: req.body.email
            }

            let result = await Cliente.update(updatedObject, {
                returning: true,
                where: { id: req.body.id },
                attibutes: ['íd', 'nome', 'idade', 'email']
            });

            if(!result) {
                res.status(500).json({
                    message: `Não foi possível atualizar o cliente com o id = ${req.params.id}`,
                    error: "Não foi possível atualizar"
                })
            }

            res.status(200).json(result);
        }
    }
    catch(error) {
        res.status(500).json({
            message: `Erro -> Não foi possível atualizar o cliente com id = ${req.params.id}`,
            error: error.message
        });
    }
}