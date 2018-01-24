import React from 'react';
import ArtistSentence from './ArtistSentence.jsx'
import '../style/SearchResultItem.css';
import { getMopidy } from '../App.js';
import { toast } from 'react-toastify';
import {Card, CardHeader} from 'material-ui/Card';

export default class SearchResultItem extends React.Component {

	static contextTypes = {
    router: () => true, // replace with PropTypes.object if you use them
  }

	handleClick() {
		getMopidy().history.getHistory().done((history) => {
			if (history.filter(tuple => (tuple[1].uri === this.props.track.uri)).length > 0) {
				let message = "This track has already been played";
				toast.warn(message, {
					position: toast.POSITION.BOTTOM_CENTER,
					autoClose: 3500
				});
			} else if (this.props.tracklist.filter(track => (track.uri === this.props.track.uri)).length > 0) {
				let message = "This track has already been queued";
				toast.warn(message, {
					position: toast.POSITION.BOTTOM_CENTER,
					autoClose: 3500
				});
			} else {
				let message = this.props.track.name + " was added to the queue";
				getMopidy().tracklist.add([this.props.track], null, null, null).done(() => {
					toast.info(message, {
						position: toast.POSITION.BOTTOM_CENTER
					});
					if (!this.props.playbackState === 'stopped') {
						getMopidy().playback.play();
					}
				});
				this.context.router.history.goBack();
			}
		});
	}

	render() {

		const textStyle = {
		  padding: 5,
		};

		const style = {
		  margin: 10,
		  cursor: 'pointer'
		};

		const artistAndAlbum = (<span><ArtistSentence artists={ this.props.track.artists } /> - {this.props.track.album.name}</span>);

		return (

			<Card style={style} onClick={this.handleClick.bind(this)}>
				<CardHeader 
					title={ this.props.track.name }
					subtitle={artistAndAlbum}
					textStyle={textStyle}
				/>
			</Card>
		);
	}
}