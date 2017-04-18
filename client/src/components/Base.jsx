import React from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';
import PropTypes  from 'prop-types';

const Base = ({children}) => (
  <div>
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">

        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#base-collapse" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <IndexLink className="navbar-brand" to="/" style={{color: 'blue'}}><span className="glyphicon glyphicon-home"></span></IndexLink>
        </div>

        <div className="collapse navbar-collapse" id="base-collapse">
       {Auth.isUserAuthenticated() ? (
          Auth.isAdmin() ? (
          
            <ul className="nav navbar-nav" >
              <li>
                <Link to="/listOrgs"> Organizations </Link>
              </li>
              <li>
                <Link to="/listUsers"> Users </Link>
              </li>
              <li>
                <Link to="/changeProfile"><span className="glyphicon glyphicon-user"></span> My Profile</Link>
              </li>
              <li>
                <Link to="/logout"><span className="glyphicon glyphicon-log-out"></span> Log out</Link>
              </li>
            </ul>
          ) : (
            <ul className="nav navbar-nav">
              <li>
                <Link to="/changeProfile"><span className="glyphicon glyphicon-user"></span> My Profile</Link>
              </li>
              <li>
                <Link to="/logout"><span className="glyphicon glyphicon-log-out"></span> Log out</Link>
              </li>
            </ul>
          )
        ) : (
            <ul className="nav navbar-nav">
              <li>
                <Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Log in user</Link>
              </li>
            </ul>
        )}
        </div>
      </div>
    </nav>
    <div className="container">
    { /* child component will be rendered here */ }
    {children}
    </div>
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Base;
