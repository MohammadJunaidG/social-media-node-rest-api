const user = require('../controllers/user.controller')

module.exports = (app) =>{
    app.put("/socialapp/api/v1/users/:id", user.update)
    app.put("/socialapp/api/v1/users/:id/follow", user.follow)
    app.put("/socialapp/api/v1/users/:id/unfollow", user.unfollow)
    app.get("/socialapp/api/v1/users/:id", user.get)
    app.delete("/socialapp/api/v1/users/:id", user.delete)
}