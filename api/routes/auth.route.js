const auth = require('../controllers/auth.controller')

module.exports = (app) =>{
    app.post("/socialapp/api/v1/register", auth.register)
    app.post("/socialapp/api/v1/login", auth.login)
}