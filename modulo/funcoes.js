/********************************************************************
 * Objetivo: Arquivo de funções para gerenciar a API do WhatsApp
 * Data: 28/09/2025
 * Autor: Gabriel Lacerda Correia
 * Versão: 1.0
*********************************************************************/

const { get } = require('http')
const dataUser = require("./contatos.js")

const MESSAGE_ERROR = [
    {
        "status": false,
        "status_code": 500,
        "development": "Gabriel Lacerda Correia"
    },
    {
        "status": false,
        "status_code": 404,
        "development": "Gabriel Lacerda Correia"
    }
]


// Faz a listagem dos dados de todos usuários
const getAllDataUsers = () => {

    let message = {
        status: true,
        status_code: 200,
        development: "Gabriel Lacerda Correia",
        result: dataUser.contatos['whats-users']
    }


    return message
}

const getDataUser = (nickname) => {
    
    let message = {
        status: true,
        status_code: 200,
        development:"Gabriel Lacerda Correia", 
        user: {

        }
    }

    dataUser.contatos['whats-users'].forEach((user) => {

        if (user.nickname === nickname) {

            message.user.nome = user.account
            message.user.nome_usuario = user.nickname
            message.user.numero = user.number
            message.user.foto_perfil = user['profile-image']
            message.user.cor_fundo = user.background
            message.user.data_ingresso_saída = user['created-since']

        }

    })

    return message
}


// console.log(getAllDataUsers())
console.log(getDataUser('Ricky'))

module.exports = {
    getAllDataUsers
}