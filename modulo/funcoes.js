/********************************************************************
 * Objetivo: Arquivo de funções para gerenciar a API do WhatsApp
 * Data: 28/09/2025
 * Autor: Gabriel Lacerda Correia
 * Versão: 1.0
*********************************************************************/

const dataUser = require("./contatos.js")

const MESSAGE_ERROR = [
    {
        "status": false,
        "status_code": 500,
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

    let result = message.result === "" ?  MESSAGE_ERROR : message

    return result
}

// Faz a listagem dos dados do usuário através do nickname
const getAllDataUser = (cellphoneNumber) => {
    
    let message = {
        status: true,
        status_code: 200,
        development:"Gabriel Lacerda Correia", 
        user: []
    }


    if (cellphoneNumber === "") {
        return MESSAGE_ERROR
    }

    dataUser.contatos['whats-users'].forEach((user) => {


        if (user.number === cellphoneNumber) {

            let account = user.account
            let username = user.nickname
            let number  = user.number
            let profile_photo = user['profile-image']
            let background = user.background
            let data_ingresso_saida = user['created-since']

            message.user.push(
                {
                    account,
                    username,
                    number,
                    profile_photo,
                    background,
                    data_ingresso_saida
                }
            )
        } 
    })

    let result = message.user.length < 1 ? MESSAGE_ERROR : message

    return result
}

// Faz a listagem dos dados de todos os contatos do usuário
const getAllDataContacts = (cellphoneNumber) => {

    let message = {
        status: true,
        status_code: 200,
        development:"Gabriel Lacerda Correia", 
        contacts: []
    }

    dataUser.contatos['whats-users'].forEach((user) => {
        if (user.number === cellphoneNumber) {

            message.user = user.nickname

            user.contacts.forEach((contact) => {

                let name = contact.name
                let photo = contact.image
                let description = contact.description

                message.contacts.push({ name, photo, description })

            })
        } 
    })


    let result = message.contacts.length < 1 ? MESSAGE_ERROR : message
    return result

}

// Faz a listagem de todas as mensagens trocadas com os 
// contatos de usuário pelo nickname
const getAllMessagesUser = (cellphoneNumber) => {

    let message = {
        status: true,
        status_code: 200,
        development:"Gabriel Lacerda Correia", 
        contacts: []
    }

    dataUser.contatos['whats-users'].forEach((user) => {

        if (user.number === cellphoneNumber) {

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

                message.contacts.push({ name, messages })

            })

        } 

    })

    let result = message.contacts.length < 1 ? MESSAGE_ERROR : message 
    return result

}

//Pega a conversa com determinado do usuário
const getUserChat = (cellphoneNumber, contactNumber) => {

    let message = {
        status: true,
        status_code: 200,
        development:"Gabriel Lacerda Correia", 
        contact: {}
    }

    dataUser.contatos['whats-users'].forEach((user) => {

        if (user.number === cellphoneNumber) {
            user.contacts.forEach((contact) => {
                if (contact.number === contactNumber) {

                    let messages = []

                    contact.messages.forEach((message) => {

                        let messageSender = message.sender
                        let messageContent = message.content
                        let messageTime = message.time 

                        messages.push({ messageSender, messageContent, messageTime })
                
                    })


                    message.contact.name = contact.name
                    message.contact.messages = messages
                }
            })
        } 
    })

    let result = dataUser.contatos["whats-users"]
    .find(user => user.number === cellphoneNumber) ? message : MESSAGE_ERROR
    
    return result

}

// Procura mensagens de um usuário com uma palavra chave
const getMessageByKeyword = (cellphoneNumber, keyword) => {

    result = {
        status: true,
        status_code: 200,
        development: "Gabriel Lacerda Correia",
        keyword: { keyword },
        messages: []
    }

    dataUser.contatos['whats-users'].forEach((user) => {
        if (user.number === cellphoneNumber) {
            user.contacts.forEach((contact) => {
                contact.messages.forEach((message) => {
                    if(message.content.toLowerCase().includes(keyword.toLowerCase())) {
                        
                        let messageSender = message.sender
                        let messageContent = message.content
                        let messageTime = message.time

                        result.messages.push({ messageSender, messageContent, messageTime })

                    }
                })
            })
        }
    })

    let messageResult = result.messages.length < 1 ? MESSAGE_ERROR : message
    return messageResult

}

// console.log(getAllDataUsers())
// console.log(getAllDataUser('11987876567'))
// console.log(getAllDataContacts('11987876567'))
// console.log(getAllMessagesUser('11987876567'))
// console.log(getUserChat('11987876567', '26999999963'))
// console.log(getMessageByKeyword('11987876567', 'mark'))

module.exports = {
    getAllDataUsers,
    getAllDataUser,
    getAllDataContacts,
    getAllMessagesUser,
    getUserChat,
    getMessageByKeyword
}