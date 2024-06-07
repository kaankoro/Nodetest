const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const homeRoute = require('./routes/home-route');
const signupRoute = require('./routes/sign-up-route');
const loginRoute = require('./routes/login-route');
const recordRoute = require('./routes/record');
const viewRoute = require('./routes/view');

const User = require('./models/user-model');



const app = express();

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));

app.engine('hbs', exphbs.engine({
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views', 'layouts'), // Set the directory for layout templates
  partialsDir: path.join(__dirname, 'views', 'layouts'), // Set the directory for partials
  defaultLayout: 'main', // Default layout template
}));
app.set('view engine', 'hbs'); // Set Handlebars as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the directory for view templates

app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', homeRoute);
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/record', recordRoute);
app.use('/view', viewRoute);

app.get('/users', async (req, res) => {
  try {
      const users = await User.find();
      
      console.log(users);

      res.json(users);
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
