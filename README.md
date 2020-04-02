# Liri Node App

### Background

This app will search for songs, concerts and movies. This app is used through the terminal and by specifying the search type, APIs can be queried for information about songs searched by song title, upcoming concerts searched by band name and movie information by movie title search. It also has a random search specified by a random text file contents.

### Instructions

In order to run this app, node will need to be installed. This repository will need to be cloned to your desktop and 'npm install' run in the terminal within the repository folder to install node dependencies.

To search a concert, type into the terminal: node liri.js concert-this 'band name'
To search a song, type: node liri.js spotify-this-song 'song name'
To search a movie, type: node liri.js movie-this 'movie title'

See what is returned with 'node do-what-it-says', then look at what is within the random.txt file.

### Video Demonstration

![Liri Demo](LiriDemo2.mp4)

### Built with

- [Node](https://nodejs.org/en/) - A javascript library to use outside of a browser
- [Javascript](https://www.javascript.com/) - coding language for creating interactive websites and apps
- [Spotify API](https://www.npmjs.com/package/node-spotify-api) - song query API
- [OMDB API](http://www.omdbapi.com/) - movie query api
- [Bands in Town API](https://www.artists.bandsintown.com/login) - concert query API
- [Axios](https://www.npmjs.com/package/axios) - node library - request data from APIs
- [fs](https://nodejs.dev/the-nodejs-fs-module) - node library - work with files
- [dotenv](https://www.npmjs.com/package/dotenv) - node library - enable hidden file to request API keys
- [Moment](https://www.npmjs.com/package/moment) - node library - manipulate time data

### Authors

- **Kate Jamboretz** - _Initial work_ - [katejamboretz](https://github.com/katejamboretz)

### Acknowledgements

- UC Berkeley Extension Full Stack Development 2020 Instructor, TAs and classmates
- [PurpleBooth README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
