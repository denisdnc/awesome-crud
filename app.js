const express = require('express');
const app = express();

const Config = require('scr/main/config/app-setup');
const UserController = require('scr/main/user/gateways/controllers/user-controller');

Config.init(app);
UserController.init(app);

app.listen(process.env.PORT || 3000, function() {
  console.log('Example app listening on port:', process.env.PORT || '3000');
});

module.exports = app;
