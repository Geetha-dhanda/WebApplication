const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");


exports.addUser = (req, res, next) => {
    const user = new User({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email

    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });

}

exports.getPosts = (req, res, next) => {

  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = User.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return User.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Get users successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(error => {

      res.status(500).json({
        message: "Get users failed!"
      });
    });
};


