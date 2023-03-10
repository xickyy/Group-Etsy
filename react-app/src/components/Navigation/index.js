import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from '../SearchBar';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	let sessionLinks;
	if (sessionUser && sessionUser.id) {
		sessionLinks = (
			<ul className='allNavLinks'>
				<li className='navLinks'>
					<NavLink id='link' exact to="/"><img className='navigation-etsy-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Etsy_logo.svg/2560px-Etsy_logo.svg.png' alt=''></img></NavLink>
					<SearchBar id='link' placeholder='Search for a product' />
					<NavLink id='link' exact to="/products/create">Create a Product Listing</NavLink>
					<NavLink id = 'link' exact to="/cart_items"><i className="fa-solid fa-cart-shopping"></i></NavLink>
				</li>
				{isLoaded && (
					<li className='navLinks'>
						<ProfileButton id='profileLink' user={sessionUser} />
					</li>
				)}
			</ul>
		)
	} else {
		sessionLinks = (
			<ul className='allNavLinks'>
				<li className='navLinks'>
					<NavLink id='link' exact to="/"><img className='navigation-etsy-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Etsy_logo.svg/2560px-Etsy_logo.svg.png' alt=''></img></NavLink>
					<SearchBar id='link' placeholder='Search for a product' />
				</li>
				{isLoaded && (
					<li className='navLinks'>
						<ProfileButton id='profileLink' user={sessionUser} />
					</li>
				)}
			</ul>
		)
	}


	return (
		<div>
			{isLoaded && sessionLinks}
		</div>
	)

}

export default Navigation;
