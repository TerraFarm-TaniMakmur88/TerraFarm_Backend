import express from "express";
var fieldRouter = express.Router();

/* GET users listing. */
fieldRouter.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

export default fieldRouter;
