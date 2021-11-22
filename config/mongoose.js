//require the library
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact_list_db',{useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error',console.error.bind(console,'Error connecting to DB'));

db.once('open',function(){
    console.log("Database Connected");
});