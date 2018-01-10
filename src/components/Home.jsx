import React from 'react';
import NowPlaying from './NowPlaying.jsx';
import Tracklist from './Tracklist.jsx';
import PlaybackControls from './PlaybackControls.jsx';

export default class Home extends React.Component {

	render() {

		return (
			<div>
	      <h3>Now Playing</h3>
	      <NowPlaying image={this.props.image} track={this.props.nowPlaying} />
	      <Tracklist tracks={this.props.tracklist} display={5} />
				<PlaybackControls playing={this.props.playing} />
			</div>
		);
	}
}