const express = require('express');
const app = express();

const Config = require('./scr/main/config/app-setup');
const TaskController = require('./scr/main/task/gateways/controllers/task-controller');

Config.init(app);
TaskController.init(app);

app.listen(process.env.PORT || 3000, function() {
  console.log('Example app listening on port:', process.env.PORT || '3000');
});
