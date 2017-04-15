import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';

const Base = ({children}) => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <IndexLink to="/" style={{color: 'blue'}}>Home</IndexLink>
      </div>

     {Auth.isUserAuthenticated() ? (
        Auth.isAdmin() ? (
        <div className="top-bar-right">
          <Link to="/createOrg"> Create Organization </Link>
          <Link to="/createUser"> Create User </Link>
          <Link to="/listUsers"> List Users </Link>
          <Link to="/changeProfile">Profile</Link>
          <Link to="/logout">Log out</Link>
        </div>
        ) : (
        <div className="top-bar-right">
          <Link to="/changeProfile">Profile</Link>
          <Link to="/logout">Log out</Link>
        </div>
        )
      ) : (
        <div className="top-bar-right">
          <Link to="/login">Log in user</Link>
        </div>
      )}
    </div>

    { /* child component will be rendered here */ }
    {children}

  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Base;
