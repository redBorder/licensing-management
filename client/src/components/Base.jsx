import React from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';
import PropTypes  from 'prop-types';

/* Componente Base encargado de crear la barra de navegación superior.
Hará uso de React router para la navegación entre las diferentes opciones del menú
Recibirá los siguientes parámetros:
  1) Children: Componente que se mostrará haciendo uso de React-Router bajo la barra de navegación
*/

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
          <div>
            <div>
              <ul className="nav navbar-nav" >
                <li>
                  <Link to="/listOrgs"> Organizations </Link>
                </li>
                <li>
                  <Link to="/listUsers/all/all"> Users </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="nav navbar-nav navbar-right" >
                <li>
                  <Link to="/changeProfile"><span className="glyphicon glyphicon-user"></span> My Profile</Link>
                </li>
                <li>
                  <Link to="/logout"><span className="glyphicon glyphicon-log-out"></span> Log out</Link>
                </li>
              </ul>
            </div>
          </div>
          ) : (
            <div>
              {Auth.hasOrganization() ? (
              <ul className="nav navbar-nav" >
                <li>
                  <Link to={"/listLicenses/" + localStorage.getItem('userProfileOrg') + "/" + encodeURIComponent("my organization")}> My licenses </Link>
                </li>
              </ul>
              ) : null }
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="/changeProfile"><span className="glyphicon glyphicon-user"></span> My Profile</Link>
                </li>
                <li>
                  <Link to="/logout"><span className="glyphicon glyphicon-log-out"></span> Log out</Link>
                </li>
              </ul>
            </div>
          )
        ) : (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Log in user</Link>
              </li>
            </ul>
        )}
        </div>
      </div>
    </nav>
    <div className="container">
    {children}
    </div>
  </div>
);

//Haciendo uso de propTypes se comprueba que existe el componente 'children', ya que es obligatorio
Base.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Base;
