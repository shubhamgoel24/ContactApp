
const exp = require('constants');
const express = require('express');
const path = require('path');

const port = 8001;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname, 'views'));
// app.use(express.urlencoded());
app.use(express.urlencoded({extended:true}));
app.use(express.static('assets'));

app.get('/',function(req,res){
    // res.send('../baischttpserver/data.html');

    Contact.find({} , function(err, contacts){
        if(err){
            console.log("Error in fetching contacts");
            return;
        }

        return res.render('home',{
            title : 'Contacts List',
            contact : contacts
        });
    });
});

app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // })
    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log("Error in creating contact");
            return;
        }
        return res.redirect('back');
    });


    // return res.redirect('back');
});


app.get('/delete-contact/',function(req,res){
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
});


app.listen(port,function(err){
    if(err){
        console.log("Error: ",err);
    }
    console.log("Server Live");
});