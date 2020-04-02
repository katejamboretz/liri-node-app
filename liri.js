// First, open terminal within this folder.
// Make sure you have node installed.
// Install these NPM packages through commandline:
//     - node-spotify-api
//     - axios
//     - moment
//     - DotEnv
//     - fs

// npm install --save node-spotify-api
// npm install axios
// npm install moment
// npm install dotenv
// npm install fs

// require apps as described in documentation

var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var dotenv = require("dotenv").config();
var fs = require("fs");

// import and store keys.js file
// can access keys info: var spotify = new Spotify(keys.spotify)
var keys = require("./keys.js");

// take in arguments with process.argv
// process.argv[2] determines which search
//  concert-this OR spotify-this-song OR movie-this OR do-what-it-says

var searchType = process.argv[2];

// process.argv[3] is the search term

var searchTerm = process.argv[3];
var searchJoin = process.argv.slice(3).join("+");

// if song, make API request for Spotify
console.log(
  "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
);
console.log("Search Term: " + searchTerm);
console.log("Search Type: " + searchType);
console.log(
  "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
);
// console.log("Keys: " + keys.spotify);

// conole.log data for song
// - artist(s)
// - song's name
// - preview link for song from Spotify
// - album that song is from

var spot = new Spotify(keys.spotify);

if (searchType === "spotify-this-song") {
  spot
    .search({ type: "track", query: searchTerm })
    .then(function(response) {
      //   console.log(response);
      for (var i = 0; i < response.tracks.items.length; i++) {
        console.log("SONG NAME: " + response.tracks.items[i].name);
        console.log("PREVIEW LINK: " + response.tracks.items[i].preview_url);
        console.log("ALBUM: " + response.tracks.items[i].album.name);
        console.log("ARTISTS: ");
        for (var j = 0; j < response.tracks.items[i].artists.length; j++) {
          console.log(response.tracks.items[i].artists[j].name);
        }
        console.log(
          "///////////////////////////////////////////////////////////////////\\\\\\"
        );
      }
    })
    .catch(function(err) {
      console.log(err);
    });
}

// if band, make API request through Axios for Bands in Town API
// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

if (searchType === "concert-this") {
  var URL =
    "https://rest.bandsintown.com/artists/" +
    searchTerm +
    "/events?app_id=codingbootcamp";

  axios.get(URL).then(function(response) {
    // conole.log data for band
    // - name of venue
    // - venue location
    // -MM/DD/YYYY date of event

    for (var i = 0; i < response.data.length; i++) {
      console.log("Concert Name: " + response.data[0].title);
      console.log(
        "Venue: " +
          response.data[0].venue.name +
          ", " +
          response.data[i].venue.city
      );
      console.log("Date: " + response.data[0].datetime);

      console.log(
        "///////////////////////////////////////////////////////////////////\\\\\\"
      );
    }
  });
}

// if movie, make API request through Axios for OMDB api
// use key Trilogy

if (searchType === "movie-this" && searchTerm) {
  var URL = "https://www.omdbapi.com/?t=" + searchTerm + "&apikey=dd6d0395&";
  axios
    .get(URL)
    .then(function(response) {
      // console.log data for movie
      // - title
      // - year came out
      // - IMDB rating
      // - rotten tomatoes rating
      // - country movie produced
      // - language
      // - plot
      // - actors
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country Produced In: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      console.log(
        "///////////////////////////////////////////////////////////////////\\\\\\"
      );
    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

// no movie, output 'Mr. Nobody' data

if (searchType === "movie-this" && !searchTerm) {
  var URL = "https://www.omdbapi.com/?t=Mr.+Nobody&apikey=dd6d0395&";
  axios
    .get(URL)
    .then(function(response) {
      // console.log data for movie
      // - title
      // - year came out
      // - IMDB rating
      // - rotten tomatoes rating
      // - country movie produced
      // - language
      // - plot
      // - actors
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country Produced In: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      console.log(
        "///////////////////////////////////////////////////////////////////\\\\\\"
      );
    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

// if (searchType === "do-what-it-says") {
// }

// do-what-it-says
// use fs to run random.txt, run spotify-this-song for 'I want it that way'

// bonus - add log.txt to append commands to
