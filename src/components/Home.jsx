import React from 'react';
import NowPlaying from './NowPlaying.jsx';
import Tracklist from './Tracklist.jsx';
import '../style/Home.css';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {

	render() {

		return (
			<div className="home">
        <ul>
        	<li className="nav-item-title"><h2 className="nav-title">pibox</h2></li>
        	<li className="nav-item-search"><Link className="Link" to="/pibox/search/"><img className="icon" alt="search icon" src="https://d30y9cdsu7xlg0.cloudfront.net/png/14173-200.png" /></Link></li>
        </ul>
	      <NowPlaying playback={this.props.playback} />
	      <Tracklist mopidy={this.props.mopidy} tracks={this.props.tracklist} display={3} voteToSkip={this.props.voteToSkip}/>
			</div>
		);
	}
}