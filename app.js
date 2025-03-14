const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const compression = require('compression');


const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');



const app = express();

// implement CORS
app.use(cors());

app.options('*',cors());

// view engine
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// Development Logging 
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Body parser Middleware
app.use(express.json());

// compress all responses
app.use(compression());

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/job',jobRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.all('*', (req, res, next) => {
    next(
      new AppError(`Sorry! Can't find ${req.originalUrl} on this server!`, 404)
    );
});

app.use(globalErrorHandler);
module.exports = app;
