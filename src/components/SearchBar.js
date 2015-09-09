import React from 'react';
import splice from '../services/splice';
import {Navigation} from 'react-router';
import constants from '../constants/constants';

var SearchBar = React.createClass({

	mixins: [Navigation],
	componentDidMount: function() {
		var _this = this;

		$('#search').keyup(function() {
			var query = $(this).val();
			if(query.length >= 3) {
				_this.search(query);
			}
		});
	},
	search: function(query) {
		var _this = this;
		var push = this.props.push;
		var activeSearchAjax = null;
		var results, 
			searchUrl = constants.API_ROOT + 'search/' + query;


		push({
			type: 'SHALLOW_MERGE',
			data: {
				loaded: false
			}
		});

		if(activeSearchAjax != null) {
			activeSearchAjax.abort();
			activeSearchAjax = null;
		}

		activeSearchAjax = $.ajax({
			url: searchUrl,
			type: 'get'
		})
		.done(function(response) {
			results = response.payload.search;
			var sets = splice.bigArray(results.sets, 50);
			var events = splice.bigArray(results.upcomingEvents, 50);
			var tracks = splice.bigArray(results.tracks, 50);

			push({
				type: 'SHALLOW_MERGE',
				data: {
					loaded: true,
					searchText: query,
					searchResults: {
						sets: sets,
						upcomingEvents: events,
						tracks: tracks
					}
				}
			});
		});
	},
	render: function() {
		return (
			<div className='center flex flex-row'>
				<i className="nav-button fa fa-search center click"/>
				<input id="search" 
					className="flex"
					placeholder='search'
					onKeyPress={() => this.transitionTo('search')}/>
          </div>
		);
	}

});

module.exports = SearchBar;