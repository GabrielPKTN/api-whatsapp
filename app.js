/**********************************************************************
 * Objetivo: EndPoints referente a API do whatsapp.
 * Data: 30/09/2025
 * Autor: Gabriel Lacerda Correia
 * Versão: 1.0
 * 
 * Observações: Instalação do Express, Cors, Body-Parser
 * npm install      express     --save
 * npm install       cors       --save
 * npm install    body-parser   --save
 **********************************************************************/

// Importando dependencias da API
const express    = require('express')        // Responsável pela API
const cors       = require('cors')           // Responsável pelas permissões da API (APP)
const bodyParser = require('body-parser')    // Responsável por gerenciar a chegada dos dados da API com o front
const usersData = require('./modulo/funcoes.js')

// Retorna a porta do servidor atual ou colocamos uma porta local.
const PORT = process.PORT || 8000

// Criando uma instancia de uma classe do express
const app = express()

// Configuração de permissões
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')    // Servidor de origem
    response.header('Access-Control-Allow-Methods', 'GET') // Verbos permitidos

    // Carrega as configurações no CORS da API
    app.use(cors())
    next() // Próximo, carregar os próximos EndPoints 
})

//EndPoints

app.get('/v1/whatsapp/users/', (request, response) => {

    let users = usersData.getAllDataUsers()

    response.status(users.status_code).json(users)

})

app.get('/v1/whatsapp/users/:userCellphoneNumber', (request, response) => {
    
    let user = usersData.getAllDataUser(request.params.userCellphoneNumber)

    response.status(user.status_code).json(user)

})

app.get('/v1/whatsapp/user/contacts/:userCellphoneNumber', (request, response) => {

    let contacts = usersData.getAllDataContacts(request.params.userCellphoneNumber)

    response.status(contacts.status_code).json(contacts)

})

app.get('/v1/whatsapp/user/contacts/messages/:userCellphoneNumber', (request, response) => {

    let contactsMessages = usersData.getAllMessagesUser(request.params.userCellphoneNumber)

    response.status(contactsMessages.status_code).json(contactsMessages)

})

app.get('/v1/whatsapp/user/contact/messages/', (request, response) => {

    let userNumber = request.query.userCellphoneNumber
    let contactNumber = request.query.contactCellphoneNumber

    let chat = usersData.getUserChat(userNumber, contactNumber)

    response.status(chat.status_code).json(chat)

})

app.get('/v1/whatsapp/user/contact/message/filter/', (request, response) => {

    let userNumber = request.query.userCellphoneNumber
    let keyword = request.query.keyword

    let messages = usersData.getMessageByKeyword(userNumber, keyword)

    response.status(messages.status_code).json(messages)

})

// Start na API
app.listen(PORT, () => {
    console.log('Está vivo...!!!')
})