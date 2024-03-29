import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useModal } from "../../context/Modal";
import * as sessionActions from '../../store/session';
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const { closeModal } = useModal();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  const handleUserDetails = (e) => {
    e.preventDefault();
    history.push('/user_details')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const demoSubmit = (e) => {
    e.preventDefault();
    closeModal()
    return dispatch(sessionActions.demoLogin());
  };

  let ifUser = () => {
    if (user) {
      return (
        <img className="profile-button-img" src={user.imageURL || "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/755c80088d2c6fd111162efa8235ecda~c5_720x720.jpeg?x-expires=1678694400&x-signature=MxBth9PCTul3xkjPNsPVBWzHWfg%3D"} alt='' onClick={openMenu}></img>
      )
    } else {
      return (
        <button style={{fontSize: "20px"}} className="profile-button-img-logged-out" onClick={openMenu}>
          <i class="fa-regular fa-user"></i>
        </button>
      )
    }
  }

  return (
    <>
      {ifUser()}
      <div className="profile-button-container-dropdown">
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <div className="logged-in-profile-dropdown-user-info-div">
              <b><li className="logged-in-profile-dropdown-user-info">{user.firstName}</li></b>
              <li className="logged-in-profile-dropdown-user-info">{user.email}</li>
              <li className="logged-in-profile-dropdown"><button className="user-details-button" onClick={handleUserDetails}>User Details</button></li>
              <li className="logged-in-profile-dropdown">
                <button className="logout-button" onClick={handleLogout}>Log Out</button>
              </li>
            </div>
          ) : (
            <div className="profile-button-container-dropdown-logged-out">
              <OpenModalButton
                className='profile-button-log-in'
                buttonText="Login"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />

              <OpenModalButton
                className='profile-button-sign-up'
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />

              <form className="demo-login-div" onSubmit={demoSubmit}>
                <button className="demo-login">Demo Login</button>
              </form>
            </div>
          )}
        </ul>
      </div>
    </>
  );
}

export default ProfileButton;
