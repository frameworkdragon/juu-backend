const mongoose = require('mongoose')

const Family = mongoose.model('Family', new mongoose.Schema({
    lastName: String,
    parents: [{
        familyName: String,
        firstName: String,
        gender: String
    }],
    children: [{
        familyName: String,
        firstName: String,
        gender: String,
        grade: Number
    }],
    pets:[{
        givenName: String
    }],
    address: {
        country: String,
        state: String,
        city: String
    }
}));

const family = new Family({
    lastName: "Volum",
    parents: [
        { firstName: "Thomas" },
        { firstName: "Mary Kay" }
    ],
    children: [
        { firstName: "Ryan", gender: "male", grade: 8 },
        { firstName: "Patrick", gender: "male", grade: 7 }
    ],
    pets: [
        { givenName: "Buddy" }
    ],
    address: { country: "USA", state: "WA", city: "Seattle" }
});

family.save((err, saveFamily) => {
    console.log(JSON.stringify(saveFamily));
});

const VacationDestinations = mongoose.model('VacationDestinations', new mongoose.Schema({
    name: String,
    country: String
   }));

   const vacaySpot = new VacationDestinations({
    name: "Honolulu",
    country: "USA"
   });
   
   vacaySpot.save((err, saveVacay) => {
    console.log(JSON.stringify(saveVacay));
   });

   Family.find({ 'children.gender' : "male"}, function(err, foundFamily){
    foundFamily.forEach(fam => console.log("Found Family: " + JSON.stringify(fam)));
});