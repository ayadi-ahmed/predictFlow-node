const { UserService } = require("../services");
const errorHandler = require("./error-handler");
cosnt = require("./error-handler");

const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../config/TokenConfig");
require("dotenv").config();

module.exports = (app) => {
  const service = new UserService();
  
  app.post("/register", async (req, res, next) => {
    try {
      let usr = new user(req.body);

      salt = bcrypt.genSaltSync(10);
      bcryptPassword = await bcrypt.hashSync(req.body.password, salt);
      console.log(
        "pass non hash " + usr.password + " pass hashé " + bcryptPassword
      );
      usr.password = bcryptPassword;
      console.log("user " + usr);
      await usr.save();
      res.status(200).send({ message: "user created successfully", data: usr });
    } catch (error) {
      next(error);
    }
  });

  app.post("/login", async (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    data = req.body;
    console.log("data " + JSON.stringify(data));
    let usr = await user.findOne({ email: req.body.email });
    console.log("usr " + usr);

    if (!usr) {
      res.status(404).send("email or password invalid");
    } else {
      validPass = bcrypt.compareSync(req.body.password, usr.password);
      if (!validPass) {
        res.status(401).send("email or password invalid");
      } else {
        payload = {
          _id: usr._id,
          email: usr.email,
          name: usr.name,
          phoneNumber: usr.phoneNumber,
          articles: usr.articles,
          time: Date(),
        };
        token = jwt.sign(payload, jwtSecretKey);
        res.status(200).send({ token });
      }
    }
  });

  app.post("/GetDataFromToken", async (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = req.body.token;

    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        console.error("Token verification failed:", err);
        res.status(401).send("Token verification failed");
      } else {
        console.log("Decoded token:", decoded);
        res.status(200).json(decoded._id);
      }
    });
  });

  app.get("/users", verifyToken, async (req, res, next) => {
    try {
      const users = await service.findAll();
      res
        .status(200)
        .send({ message: "User retreived successfully", data: users });
    } catch (error) {
      next(error);
    }
  });

  //get user articles
  app.get("/user/:id/articles", verifyToken, async (req, res, next) => {
    const id = req.params.id;
    try {
      const articles = await service.getArticles(id);
      res
        .status(200)
        .send({ message: "articles retrieved successfully", data: articles });
    } catch (error) {
      next(error);
    }
  });

  app.get("/user/:id", verifyToken, async (req, res, next) => {
    try {
      const user = await service.findById(req.params.id);
      res
        .status(200)
        .send({ message: "User retreived successfully", data: user });
    } catch (error) {
      next(error);
    }
  });

  app.delete("/user/:id", verifyToken, async (req, res, next) => {
    try {
      const user = await service.deleteById(req.params.id);
      res
        .status(200)
        .send({ message: "User deleted successfully", data: user });
    } catch (error) {
      next(error);
    }
  });

  //add order
  app.post("/user/artilce",verifyToken, async (req, res, next) => {
    const { userId, article } = req.body;
    try {
      const new_article = await service.addArticle(userId, article);
      res
        .status(200)
        .send({ message: "Article deleted successfully", data: new_article });
    } catch (error) {
      next(error);
    }
  });

  app.use(errorHandler);
};
