import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from '../SearchBar';
import img from './epsy-logo.png'

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	let sessionLinks;
	if (sessionUser && sessionUser.id) {
		sessionLinks = (
			<ul className='allNavLinks'>
				<li className='navLinks-logged-in'>
					<NavLink id='link' exact to="/"><img className='navigation-etsy-logo' src={img} alt=''></img></NavLink>
					<SearchBar id='link' placeholder='Search for a product' />
					<NavLink title="Create a Product Listing" id='link' className="navigation-create-a-product" exact to="/products/create"><i class="fa-solid fa-store"></i></NavLink>
				</li>
				{isLoaded && (
					<li className='navLinks'>
						<ProfileButton title="Your account" id='profileLink' user={sessionUser} />
						<NavLink title="Cart" id='link' className="navigation-cart" exact to="/cart_items"><i className="fa-solid fa-cart-shopping"></i></NavLink>
					</li>
				)}
			</ul>
		)
	} else {
		sessionLinks = (
			<ul className='allNavLinks'>
				<li className='navLinks-logged-out'>
					<NavLink id='link' exact to="/"><img className='navigation-etsy-logo' src={img} alt=''></img></NavLink>
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
