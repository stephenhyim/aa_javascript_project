const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const { response } = require('express');
const PORT = process.env.PORT || 8000; // process.env accesses heroku's environment variables
const keys = require('./config/keys');
const secret = ({ apiKey: keys.sportsAPI})


app.use(express.static('frontend'))

app.get('/', (request, res) => {
  res.sendFile(path.join(__dirname, './frontend/dist/index.html'))
})

// create route to get single book by its isbn
app.get('/books/:isbn', (request, response) => {
  // make api call using fetch
  // console.log(response)
  fetch(`http://openlibrary.org/api/books?bibkeys=ISBN:${request.params.isbn}&format=json&jscmd=data`)
  .then((response) => {
    // console.log(response)
      return response.text();
  }).then((body) => {
      let results = JSON.parse(body)
      // console.log(results)   // logs to server
      response.send(results) // sends to frontend
    });
});

// app.get('/teams/:selectedTeam1', (request, res) => {
//   fetch(`http://api.sportradar.us/nfl/official/trial/v6/en/seasons/2020/REG/teams/${request.params.selectedTeam1}/statistics.json?api_key=${secret.apiKey}`)
//   .then((response) => {
//     debugger
//     console.log(1)
//     const variable = response.text();
//     console.log(response.body)
//     return (variable);
//   }).then((body) => {
//     debugger
//     console.log(2)
//     console.log(request.constructor.name)
//     // console.log(typeof response.flushHeaders)
//     // console.log(typeof res.flushHeaders)
//     console.log(Object.keys(request))
//     // let results = JSON.parse(body)
//     console.log(body)
//     // console.log(results)
//     res.send((body))
//   }).catch(function (error) {
//     debugger
//     console.log(3)
//     console.log(error)
//   })
// });

app.get('/teams/:selectedTeam1', (request, res) => {
  fetch(`http://api.sportradar.us/nfl/official/trial/v6/en/seasons/2020/REG/teams/${request.params.selectedTeam1}/statistics.json?api_key=${secret.apiKey}`)
  .then((response) => {
    debugger
    return response.text();
  }).then((body) => {
    debugger
    // let results = JSON.parse(body)
    // console.log(results)
    res.send((body))
  }).catch(function (error) {
    debugger
    console.log(error)
  })
});

app.get('/teams/:selectedTeam2', (request, res) => {
  fetch(`http://api.sportradar.us/nfl/official/trial/v6/en/seasons/2020/REG/teams/${request.params.selectedTeam2}/statistics.json?api_key=${secret.apiKey}`)
  .then((response) => {
    debugger
    return response.text();
  }).then((body) => {
    debugger
    // let results = JSON.parse(body)
    // console.log(results)
    res.send((body))
  }).catch(function (error) {
    debugger
    console.log(error)
  })
});

// create a search route
app.get('/search', (request, response) => {
  fetch(`http://openlibrary.org/search.json?q=${request.query.string}`)
  .then((response) => {
    debugger
      return response.text();
  }).then((body) => {
      let results = JSON.parse(body)
      console.log(results)
      response.send(results)
    });
});





app.get('/player', (request, response) => {
  fetch(`http://api.sportradar.us/nfl/official/trial/v6/en/players/41c44740-d0f6-44ab-8347-3b5d515e5ecf/profile.json?api_key=${secret.apiKey}`)
  .then((response) => {
    // debugger
    return response.text();
  }).then((body) => {
    let results = JSON.parse(body)
    console.log(results)
    response.send(results)
  })
})

app.get('/weeklyschedule', (request, response) => {
  fetch(`http://api.sportradar.us/nfl/official/trial/v6/en/games/2020/REG/1/schedule.json?api_key=${secret.apiKey}`)
  .then((response) => {
    return response.text();
  }).then((body) => {
    let results = JSON.parse(body)
    console.log(results)
    response.send(results)
  })
})




app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`)
})
