require("dotenv").config();
var moment = require("moment");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];

function spotifyMusic() {
    var trackName = process.argv.slice(3).join(" ");
    spotify.search({ type: 'track', query: trackName }, function (err, data) {
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

function spotifyDefault() {

    spotify.search({ query: "the sign", type: 'track', year: 1993 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(`
        Artist: ${data.tracks.items[9].album.artists[0].name}
        Song Title: ${data.tracks.items[9].name}
        Preview Link: ${data.tracks.items[9].preview_url}
        Album: ${data.tracks.items[9].album.name}`);

    });
}

function bandsInTown() {

    var artist = process.argv.slice(3).join(" ");

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
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

    var movie = process.argv.slice(3).join(" ");

    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
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

function OMDBDefault() {

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
}

function doIt() {

    fs.readFile("./random.txt", "utf8", function (err, data) {

        if (err) {
            return console.log(err);
        }

        console.log(data);
    })

}


if (command === "spotify-this-song") {

    if (process.argv.length < 4) {
        console.log("\nYou didn't pick a song, so enjoy the one I've picked.\n")
        
        spotifyDefault()
    } else {
        spotifyMusic();
    }


}

if (command === "concert-this") {

    bandsInTown()

}

if (command === "movie-this") {
    
    if (process.argv.length < 4) {
        console.log("\nYou didn't specify a movie, so here is one to check out.\n")
        
        OMDBDefault()

    } else {
        OMDB();
    }
}

if (command === "do-what-it-says") {

    fs.readFile("./random.txt", "utf8", function (err, data) {

        if (err) {
            return console.log(err);
        }

        console.log(data);
    })

}



