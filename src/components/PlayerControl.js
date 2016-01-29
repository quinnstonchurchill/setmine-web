import React, {PropTypes} from 'react'
import {togglePlay} from '../services/playerService'
import {S3_ROOT_FOR_IMAGES} from '../constants/constants'
import BaseComponent from './BaseComponent'

class PlayerControl extends BaseComponent {
	constructor(props) {
		super(props)
		this.autoBind('togglePlay', 'handleKeypress')
	}
	componentDidMount() {
		let search = document.getElementById('search')
		document.body.addEventListener('keypress', this.handleKeypress)
	}
	handleKeypress(e) {
		// TODO move this to a separate service
		let key = e.charCode
		switch(true) {
			case(key == 32 && search != document.activeElement):
				e.preventDefault()
				this.togglePlay()
				break
			case(key >= 97 && key <= 122 && document.location.pathname != '/events'):
				search.focus()
				break
			case(key >= 65 && key <= 90 && document.location.pathname != '/events'):
				search.focus()
				break
		}
	}
	togglePlay() {
		var sound = this.props.appState.get('sound')
		var playing = this.props.appState.get('playing')

		togglePlay(sound)
		this.context.push({
			type: 'SHALLOW_MERGE',
			data: {
				playing: !playing
			}	
		})
	}
	render() {
		var currentSet = this.props.appState.get('currentSet')
		var playing = this.props.appState.get('playing')

		if(!!playing) {
			var playButtonIcon = 'fa center fa-pause'
		} else {
			var playButtonIcon = 'fa center fa-play'
		}

		var image = {
			backgroundImage: `url('${S3_ROOT_FOR_IMAGES+currentSet.artistImage}')`,
			backgroundSize: '100% 100%'
		}

		return (
			<div className='click flex-container' id='PlayButton' onMouseUp={this.togglePlay} style={image}>
				<i className={playButtonIcon}/>
			</div>
		)
	}
}

PlayerControl.contextTypes = {
	push: PropTypes.func
}

export default PlayerControl