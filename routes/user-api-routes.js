const db = require("../models");
const passport = require("../config/passport");

module.exports = (app) => {
  //login in user with authentication
  app.post("/api/login", passport.authenticate("local"), (request, response) => {
    response.json(request.user);
  });

  ////////// C - Create - Create a new User
  app.post("/api/signup", (request, response) => {
    const { email, password, firstName, lastName } = request.body;
    db.User.create({
      firstName,
      lastName,
      email,
      password,
    })
      .then(() => {
        response.redirect(307, "/api/login");
      })
      .catch((err) => {
        response.status(401).json(err);
      });
  });

  ////////// R - Read - Get one or all  Users

  //Get ALL Users AND their associated BlogPosts
  app.get("/api/users", (request, response) => {
    // "include" in findAll will join,
    //  equivalent of  SELECT * FROM Users LEFT OUTER JOIN BlogPosts ON Users.id = BlogPosts.user_id;
    db.User.findAll({
      //FIXME: This line won't work until associations are added to User/BlogPost models
      //  include: [db.BlogPost],
    }).then(function (dbUser) {
      response.json(dbUser);
    });
  });

  //Get ONE User AND their associated BlogPosts
  app.get("/api/users/:id", (request, response) => {
    // "include" in findOne will join,
    // equivalent of SELECT * FROM users LEFT OUTER JOIN blogposts ON users.id = blogposts.user_id WHERE id = ${request.params.id} LIMIT 1;
    db.Author.findOne({
      where: {
        id: request.params.id,
      },
      //FIXME: This line won't work until associations are added to User/BlogPost models
      //   include: [db.Post],
    }).then(function (dbAuthor) {
      response.json(dbAuthor);
    });
  });

  ////////// U - Update - TODO: Does that mean change user information? Profile? Or is this login?

  ////////// D - Delete (Destroy) - Delete one or all Users ( TODO: Probably not all?)
  // delete user
  app.delete("/profile/:id", (request, response) => {
    console.log(request.params);
    db.User.destroy({
      where: {
        id: request.params.id,
      },
    })
      .then((result) => {
        response.json({ id: result });
      })
      .catch((err) => {
        response.status(401).json(err);
      });
  });

  //logout
  app.get("/logout", (request, response) => {
    request.logout();
    response.redirect("/");
  });
};
