const { verify } = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret')

module.exports = async ( req, res, next) => {
    const token = req.headers.authorization

    if(!token){
        res.status(401).send('Access token não informado')
        return
    }

    const [, accessToken] = token.split(" ")

    try {
        verify(token,)
    } catch (error) {
        res.status(401).send("Usuário não autorizado")
    }

}