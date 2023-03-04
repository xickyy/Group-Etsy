import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from '../SearchBar';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
			<ul className='allNavLinks'>
				<li className='navLinks'>
					<NavLink id='link' exact to="/">Home</NavLink>
					<NavLink id='link' exact to="/products">Products</NavLink>
					<NavLink id='link' exact to="/products/create">Create a Product Listing</NavLink>
					<SearchBar id='link' placeholder='Search for a product' />
				</li>
				{isLoaded && (
					<li className='navLinks'>
						<ProfileButton id='profileLink' user={sessionUser} />
					</li>
				)}
			</ul>
	);
}

export default Navigation;
