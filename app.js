//importing the modules
const path = require('path');
const express = require('express');
const ejs = require('ejs');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// setting view engine and its path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Get Route
app.get('/api/get-countries-tags', (req, res) => {
    const countries = [
        "India",
        "Nepal",
        "Germany",
        "Finland"
    ]
    
    const countryMatrix = [[], [], []];

    // creating a random 3X3 matrix
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            countryMatrix[i][j] = countries[(Math.floor(Math.random() * (countries.length)))];
        }
    }

    // calculating rank of the countries
    const ranks = {};

    let count = 0;

    for (let i = 0; i < countryMatrix.length; i++) {
        let rankCountry = "";
        let rank = 0;
        for (let j = 0; j < countryMatrix[i].length; j++) {
            if (rankCountry) {
                if (rankCountry === countryMatrix[i][j]) {
                    rank += 1;
                } else if (rank <= 1) {
                    rankCountry = countryMatrix[i][j];
                    rank = 1;
                }
            } else {
                rankCountry = countryMatrix[i][j];
                rank = 1;
            }
        }

        if (rank > 1) {
            ranks[rankCountry + ++count] = rank;
        }
    }

    // rendering the result 
    res.render('get-countries-tags', {
        outcome: countryMatrix,
        rank: ranks
    })
})

app.listen(3000, () => console.log('Server running on port 3000...'));
