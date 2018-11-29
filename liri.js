require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js")
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];

if (command === "spotify-this-song") {

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


//   spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });