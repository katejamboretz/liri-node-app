// First, open terminal within this folder.
// Make sure you have node installed.
// Install these NPM packages through commandline:
//     - node-spotify-api
//     - axios
//     - moment
//     - DotEnv

// npm install --save node-spotify-api
// npm install axios
// npm install moment
// npm install dotenv

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
      var dateArray = response.data[i].datetime.split("T");
      // sample date format: 2020-09-29T18:30:00
      var date = dateArray[0];
      var dateMo = moment(date, "YYYY-MM-DD");
      console.log("Concert Name: " + response.data[i].title);
      console.log(
        "Venue: " +
          response.data[i].venue.name +
          ", " +
          response.data[i].venue.city
      );
      console.log("Date: " + moment(dateMo).format("MM/DD/YYYY"));

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

// do-what-it-says
// use fs to run random.txt, run spotify-this-song for 'I want it that way'
if (searchType === "do-what-it-says") {
  var term = fs.readFile("random.txt", "utf8", function(error, data) {
    var array = data.split(",");
    if (array[0] === "spotify-this-song") {
      spot
        .search({ type: "track", query: array[1] })
        .then(function(response) {
          console.log("SONG SEARCHED: " + array[1]);
          console.log(
            "------------------------------------------------------------------------"
          );
          //   console.log(response);
          for (var i = 0; i < response.tracks.items.length; i++) {
            console.log("SONG NAME: " + response.tracks.items[i].name);
            console.log(
              "PREVIEW LINK: " + response.tracks.items[i].preview_url
            );
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

    if (array[0] === "concert-this") {
      var URL =
        "https://rest.bandsintown.com/artists/" +
        array[1] +
        "/events?app_id=codingbootcamp";

      axios.get(URL).then(function(response) {
        // conole.log data for band
        // - name of venue
        // - venue location
        // -MM/DD/YYYY date of event
        console.log("BAND SEARCHED: " + array[1]);
        console.log(
          "------------------------------------------------------------------------"
        );

        for (var i = 0; i < response.data.length; i++) {
          var dateArray = response.data[i].datetime.split("T");
          // sample date format: 2020-09-29T18:30:00
          var date = dateArray[0];
          var dateMo = moment(date, "YYYY-MM-DD");
          console.log("Concert Name: " + response.data[i].title);
          console.log(
            "Venue: " +
              response.data[i].venue.name +
              ", " +
              response.data[i].venue.city
          );
          console.log("Date: " + moment(dateMo).format("MM/DD/YYYY"));

          console.log(
            "///////////////////////////////////////////////////////////////////\\\\\\"
          );
        }
      });
    }

    if (array[0] === "movie-this" && array[1]) {
      var URL = "https://www.omdbapi.com/?t=" + array[1] + "&apikey=dd6d0395&";
      axios
        .get(URL)
        .then(function(response) {
          console.log("MOVIE SEARCHED: " + array[1]);
          console.log(
            "------------------------------------------------------------------------"
          );
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
          console.log(
            "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value
          );
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

    if (array[0] === "movie-this" && !array[1]) {
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
          console.log(
            "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value
          );
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
  });
}

// bonus - add log.txt to append commands to
