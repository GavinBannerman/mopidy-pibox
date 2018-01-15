import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './style/App.css';
import Search from './components/Search.jsx';
import Home from './components/Home.jsx'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
var Mopidy = require("mopidy");
var Spinner = require('react-spinkit');
var mopidy;

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nowPlaying: {
        name: "Test Title",
        artists: [{name: "Test Artist"}],
        album: {name: "Test Album"}
      },
      playing: false,
      imageUrl: null,
      tracklist: [{
        name: "Summertime",
        artists: [{name: "Vince Staples"}],
        album: {name: "Test Album"}
      },
      {
        name: "Money Trees",
        artists: [{name: "Kendrick Lamar"}, {name: "Jay Rock"}],
        album: {name: "Test Album"}
      },
      {
        name: "Real Friends",
        artists: [{name: "Kanye West"}],
        album: {name: "Test Album"}
      }],
      loading: false
    };
  }

  updateTracklist() {
    mopidy.tracklist.getTracks().done((tracklist) => {
      this.setState({tracklist: tracklist});
    });
  }

  updateNowPlaying() {
    mopidy.playback.getCurrentTrack().done((track) => {
      this.setState({nowPlaying: track});
      if (track) {
        mopidy.library.getImages([track.uri]).done((result) => {
          this.setState({imageUrl: result[track.uri][0].uri});
        });
      } else {
        this.setState({imageUrl: null});
      }
    });
  }

  updatePlaybackState() {
    mopidy.playback.getState().done((playbackState) => {
      if (playbackState === "playing") {
        this.setState({playing: true});
      } else {
        this.setState({playing: false});
      }
    });
  }

  componentDidMount() {
    mopidy = new Mopidy();
    mopidy.on("state:online", () => {
      console.debug("Mopidy: CONNECTED");
      mopidy.tracklist.setConsume(true);
      this.updateTracklist();
      this.updateNowPlaying();
      this.updatePlaybackState();
      this.setState({loading: false});
    });
    mopidy.on("state:offline", () => {
      console.debug("Mopidy: DISCONNECTED");
      this.setState({loading: true});
    });
    mopidy.on("reconnectionPending", () => {
      console.debug("Mopidy: RECONNECTION PENDING");
      this.setState({loading: true});
    });
    mopidy.on("reconnecting", () => {
      console.debug("Mopidy: RECONNECTING");
      this.setState({loading: true});
    });
    mopidy.on("event:playbackStateChanged", (playbackState) => {
      if (playbackState.new_state === "playing") {
        this.setState({playing: true});
      } else {
        this.setState({playing: false});
      }
      this.updateNowPlaying();
      this.updateTracklist();
    });
    mopidy.on("event:tracklistChanged", () => {
      this.updateTracklist();
    });
  }

  render() {

    if (this.state.loading) {
      return(
        <div className="App">
          <div className="loading">
            <h1>pibox</h1>
            <Spinner fadeIn="quarter" name="double-bounce" />
          </div>
        </div>
      );
    }

    return (
      <MuiThemeProvider>
        <div className="App">
          <ToastContainer autoClose={3000} hideProgressBar={true} pauseOnHover={false} closeButton={false} />
          <Router>
            <div>

              <Route 
                exact 
                path="/pibox/" 
                render={ () => 
                  <Home 
                    nowPlaying={this.state.nowPlaying} 
                    tracklist={this.state.tracklist} 
                    image={this.state.imageUrl} 
                    playing={this.state.playing} /> 
                } />
              <Route 
                path="/pibox/search" 
                render={ () =>
                  <Search
                    tracklist={this.state.tracklist} />
                } />
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export function getMopidy() {
  return mopidy;
}


