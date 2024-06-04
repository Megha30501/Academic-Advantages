const usersRouter = require("express").Router();
const User = require("../models/user");
usersRouter.get("/", (request, response) => {
    User.find({}).then(user => {
        response.json(user);
    });
});
usersRouter.get("/:id", (request, response, next) => {
    User.findById(request.params.id)
        .then(user => {
            if (user) {
                response.json(user);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => next(error));
});

usersRouter.post("/", (request, response, next) => {
    const body = request.body;
    const user = new User({
        username: body.username,
        name:body.name,
        role:body.role
    });
    user.save()
        .then(savedUser => {
            response.status(201).json(savedUser);
        })
        .catch(error => next(error));
});
module.exports = usersRouter;