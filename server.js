const express = require('express');
const app = express();
const path = require ('path');
const port = 3000;



function checkWorkingHours(req, res, next){
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();


    if(day >= 1 && day <= 5 && hour <= 9 && hour >= 17){
        next();
    }else{
        res.status(403).send('The site is only available during working hours (Monday to Friday, 9 AM to 5 PM).')
    }
}

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(checkWorkingHours);

app.get('/', (req , res) => {
    res.render('index',{title : 'Home'})
})

app.get('/services', (req , res) => {
    res.render('services',{title : 'Our Services'})
})

app.get('/contact', (req , res) => {
    res.render('contact',{title : 'Contact Us'})
})


app.listen(port, () =>{
    console.log(`Server is running at http://localhost:${port}`);
})