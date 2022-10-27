const post = require('../controllers/post.controller')

module.exports = (app) =>{
    app.post("/socialapp/api/v1/posts", post.create)
    app.get("/socialapp/api/v1/posts/:id", post.get)
    app.put("/socialapp/api/v1/posts/:id", post.update)
    app.delete("/socialapp/api/v1/posts/:id", post.delete)
    app.get("/socialapp/api/v1/posts/timeline/all", post.timeline)
    app.put("/socialapp/api/v1/posts/:id/like", post.like)
}