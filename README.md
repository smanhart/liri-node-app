# liri-node-app

This is a simple version of a SIRI-like application, using text instead of voice. It can search a concert database, movie database, and music tracks on spotify. Here is the link to the [video demo](https://drive.google.com/file/d/1rtQWFZdecK4-KMa_hU71CkVB4Eenrp-j/view).

To run the bot, you can use the following commands:

* "movie-this" to get information on a particular movie
* "spotify-this-song" to get artist, album, and preview info for a particular song
* "concert-this" to search for tour dates and venues for your favorite musician
* "do-what-it-says" will return a mystery search

At first I had used if/then statements to sort the user input, but found that wouldn't work for the "do what it says" function. I learned that using switch cases was a better and more useful fit in this instance. I also learned about template literals, which is much more intuitive and nicer looking than concatenating.
