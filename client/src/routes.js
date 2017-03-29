import BasePage from './containers/BasePage.jsx';
import HomePage from './containers/HomePage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import ForgotPage from './containers/ForgotPage.jsx';
import NewPasswordPage from './containers/NewPasswordPage.jsx';
import Auth from './modules/Auth';

const routes = {
  // base component (wrapper for the whole application).
  component: BasePage,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        // change the current URL to /
        replace('/');
      }
    },
    {
      path: '/forgot',
      component: ForgotPage
    },
    {
      path: '/reset/:token',
      component: NewPasswordPage
    }
  ]
};

export default routes;