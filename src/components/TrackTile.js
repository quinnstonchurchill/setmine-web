import React, { PropTypes } from 'react'
import Base from './Base'
import Icon from './Icon'

import { S3_ROOT_FOR_IMAGES } from '../constants/constants'
import { trackTrackPlay } from '../services/mixpanelService'
import { playSet } from '../actions/player'

export default class TrackTile extends Base {
    static propTypes = {
        songName: PropTypes.string,
        artistName: PropTypes.string,
        trackName: PropTypes.string,
        id: PropTypes.number,
        songUrl: PropTypes.string,
        startTime: PropTypes.string,
        setLength: PropTypes.string,
        event: PropTypes.string,
        artist: PropTypes.string,
        isRadiomix: PropTypes.number,
        eventId: PropTypes.number,
        bannerImage: PropTypes.string,
        artistImage: PropTypes.string
    }
    static contextTypes = {
        dispatch: PropTypes.func,
        router: PropTypes.object
    }
    constructor(props) {
        super(props)
        this.autoBind('openArtistPage', 'openFestivalPage', 'playSet', 'renderArtists')
    }
    openArtistPage(e, artist) {
        e.stopPropagation()
        const artistRoute = artist.split(' ').join('_')
        this.context.router.push(`/artists/${artistRoute}`)
        // mixpanel.track("Artist Clicked", {
        //     "Artist": this.props.artist
        // })
    }
    openFestivalPage(e) {
        e.stopPropagation()
        if(this.props.isRadiomix == 0) {
            this.context.router.push(`/festival/${this.props.eventId}`)
        } else {
            this.context.router.push(`/mix/${this.props.eventId}`)
        }
    }
    playSet() {
        this.context.dispatch(playSet(this.props.id))
        // TODO mixpanel track
    }
    renderArtists() {
        return this.props.artists.map((artist, index) => {
            if(index === this.props.artists.length - 1) {
                return <span key={index} onClick={e => this.openArtistPage(e, artist.artist)}>{artist.artist}</span>
            }

            return <span key={index} onClick={e => this.openArtistPage(e, artist.artist)}>{`${artist.artist}, `}</span>
        })
    }
    render() {
        const image = {
            backgroundImage: `url('${S3_ROOT_FOR_IMAGES+this.props.bannerImage}')`,
            backgroundSize: '100% 100%'
        }
        const time = `${this.props.startTime} | ${this.props.setLength}`

        return (
            <div className='col-xs-6 col-sm-4 col-md-3 col-xl-2'>
                <div className='track-tile flex-column' style={image} title={this.props.trackName}>
                    <div className='track-info flex-row'>
                        <img src={S3_ROOT_FOR_IMAGES+this.props.artistImage} />
                        <header onClick={this.playSet}>
                            <h5>{this.props.trackName}</h5>
                            <p className='play'>
                                <Icon size={14}>play</Icon>{time}
                            </p>
                        </header>
                    </div>
                    <div className='set-info flex-column'>
                        <p className='artist'>{this.renderArtists()}</p>
                        <p className='event' onClick={this.openFestivalPage}>{this.props.event}</p>
                    </div>
                </div>
            </div>
        )
    }
}
