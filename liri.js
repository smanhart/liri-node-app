require("dotenv").config();
var moment = require("moment");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var value = process.argv.slice(3).join(" ");

function spotifyMusic() {

    if (process.argv.length < 4) {
        spotify.search({ query: "ace+of+base", type: 'track', year: 1993 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log(`
            Artist: ${data.tracks.items[0].album.artists[0].name}
            Song Title: ${data.tracks.items[0].name}
            Preview Link: ${data.tracks.items[0].preview_url}
            Album: ${data.tracks.items[0].album.name}`);

        });
    } else {

        spotify.search({ type: 'track', query: value }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log(`
        Artist: ${data.tracks.items[0].album.artists[0].name}
        Song Title: ${data.tracks.items[0].name}
        Preview Link: ${data.tracks.items[0].preview_url}
        Album: ${data.tracks.items[0].album.name}`);

        });

    }
}



function bandsInTown() {



    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
        .then(function (response) {

            for (var i = 0; i < response.data.length; i++) {

                var date = response.data[i].datetime
                var convertedDate = moment(date).format("MM/DD/YYYY")


                console.log(`
            Venue Name: ${response.data[i].venue.name}
            Location: ${response.data[i].venue.city}, ${response.data[i].venue.region}
            Date of Event: ${convertedDate}`)
                console.log(`----------------`)
            }

        })
        .catch(function (error) {
            console.log(error);
        });
}

function OMDB() {

    if (process.argv.length < 4) {

        axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy")
            .then(function (response) {

                console.log(`
                Title: ${response.data.Title}
                Year of Release: ${response.data.Year}
                IMBD Rating: ${response.data.Ratings[0].Value}
                Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
                Country of Production: ${response.data.Country}
                Language: ${response.data.Language}
                Plot: ${response.data.Plot}
                Actors: ${response.data.Actors}`)
            })
            .catch(function (error) {
                console.log(error);
            });
    } else {

        axios.get("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
            .then(function (response) {

                console.log(`
        Title: ${response.data.Title}
        Year of Release: ${response.data.Year}
        IMBD Rating: ${response.data.Ratings[0].Value}
        Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
        Country of Production: ${response.data.Country}
        Language: ${response.data.Language}
        Plot: ${response.data.Plot}
        Actors: ${response.data.Actors}`)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}


function doIt() {

    fs.readFile("./random.txt", "utf8", function (err, data) {

        if (err) {
            return console.log(err);
        }

        var text = data.split(",")
        // console.log(text)
        liri(text);
    })

}


//make if else statements into switch case, then plug switch function into doit function



var liri = function (command) {

    switch (command) {
        case "spotify-this-song":
            spotifyMusic();
            break;
        case "concert-this":
            bandsInTown()
            break;
        case "movie-this":
            OMDB()
            break;
        case "do-what-it-says":
            doIt()
            break;
        default:
            console.log("Please enter a search term")
    }
}

liri(command);
