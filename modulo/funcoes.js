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

const getAllDataUser = (nickname) => {
    
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

const getAllDataContacts = (nickname) => {

    let message = {
        status: true,
        status_code: 200,
        development:"Gabriel Lacerda Correia", 
        user: {nickname},
        contacts: [

        ]
    }

    dataUser.contatos['whats-users'].forEach((user) => {
        if (user.nickname === nickname) {
            user.contacts.forEach((contact) => {

                let name = contact.name
                let photo = contact.image
                let description = contact.description

                message.contacts.push(
                    {
                        name,
                        photo,
                        description

                    }
                )
            })
        }
    })

    return message

}

const getAllMessagesUser = (nickname) => {

    let message = {
        status: true,
        status_code: 200,
        development:"Gabriel Lacerda Correia", 
        user: {nickname},
        contacts: [ ]
    }

    dataUser.contatos['whats-users'].forEach((user) => {

        if (user.nickname === nickname) {

            user.contacts.forEach((contact) => {
                
                let messages = []
                let name = contact.name
                
                contact.messages.forEach((message) => {
                   
                    let messageSender = message.sender
                    let messageContent = message.content
                    let messageTime = message.time

                    messages.push( 
                        {

                            messageSender,
                            messageContent,
                            messageTime

                        }

                    )
                })

                message.contacts.push(
                    {
                        name,
                        messages
                    }
                )

            })

        }

    })

    // Teste para verificar se realmente existe uma conversa no array

    // message.contacts.forEach((contact) => {

    //     if (contact.name === "Jane Smith") {

    //         contact.messages.forEach((message) => {
    //         console.log(message)
    //     })

    //     }

    // })

    return message

}



// console.log(getAllDataUsers())
// console.log(getDataUser('Ricky'))
// console.log(getAllDataContacts('BeeR'))
// console.log(getAllMessagesUser('Sand'))

module.exports = {
    getAllDataUsers,
    getAllDataUser,
    getAllDataContacts,
    getAllMessagesUser
}