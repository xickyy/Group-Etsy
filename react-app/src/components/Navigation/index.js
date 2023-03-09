import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from '../SearchBar';
import Cart from '../Cart'

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const userState = useSelector((state) => state.session);


	let sessionLinks;
	if (sessionUser && sessionUser.id) {
		sessionLinks = (
			<ul className='allNavLinks'>
				<li className='navLinks'>
					<NavLink id='link' exact to="/">Home</NavLink>
					<NavLink id='link' exact to="/products/create">Create a Product Listing</NavLink>
					<SearchBar id='link' placeholder='Search for a product' />
					<NavLink id = 'link' exact to="/cart_items">Cart</NavLink>
					<h2>{`Welcome back, ${userState.user.firstName} ${userState.user.lastName}`}</h2>
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
					<NavLink id='link' exact to="/">Home</NavLink>
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

	// return (
	// 		<ul className='allNavLinks'>
	// 			<li className='navLinks'>
	// 				<NavLink id='link' exact to="/">Home</NavLink>
	// 				<NavLink id='link' exact to="/products">Products</NavLink>
	// 				<NavLink id='link' exact to="/products/create">Create a Product Listing</NavLink>
	// 				<SearchBar id='link' placeholder='Search for a product' />
	// 			</li>
	// 			{isLoaded && (
	// 				<li className='navLinks'>
	// 					<ProfileButton id='profileLink' user={sessionUser} />
	// 				</li>
	// 			)}
	// 		</ul>
	// );
}

export default Navigation;
