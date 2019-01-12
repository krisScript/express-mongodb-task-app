const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks')
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(taskRoutes)

app.use(errorController.get404);

process.on('unhandledRejection', (reason, p) => {
  
});
mongoConnect(() => {
    app.listen(3000);
});