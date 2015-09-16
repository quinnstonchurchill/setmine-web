import React from 'react';
import {Link} from 'react-router';

var NavMenu = React.createClass({

	getDefaultProps: function() {
		return {
			navItems: []
		};
	},
	render: function() {
		var links = this.props.navItems.map(function(nav){

			return(
				<Link 
					className='nav-button click flex flex-row' 
					to={nav.link} 
					onlyActiveOnIndex={nav.onlyActiveOnIndex} 
					activeClassName='active'>
						<i className={nav.icon}/>
						<div className='center'>{nav.text}</div>
				</Link>
			); 
		});
		
		return (
			<nav id='NavMenu' className='flex-column flex-fixed'>
				<div className='set-flex flex'>
					<div className='nav-header'>BROWSE</div>
				</div>
				{links}
				<div className='buffer-3x'/>
			</nav>
		);
	}

});

module.exports = NavMenu;