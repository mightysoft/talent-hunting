const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');

dotenv.config({ path: './config.env'});
const app = require('./app');



mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>
    console.log('Database connection Successful!❤'))
    .catch((err)=> console.log(chalk.redBright(err)));
const port = process.env.PORT || 3000;
app.listen(port,()=>
    console.log(`app running on port ${chalk.greenBright(port)} ....`)
);



