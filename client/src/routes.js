import BasePage from './containers/BasePage.jsx';
import HomePage from './containers/HomePage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import ForgotPage from './containers/ForgotPage.jsx';
import NewPasswordPage from './containers/NewPasswordPage.jsx';
import ProfilePage from './containers/ProfilePage.jsx';
import CreateUserPage from './containers/CreateUserPage.jsx';
import CreateOrgPage from './containers/CreateOrgPage.jsx';
import ListUsersPage from './containers/ListUsersPage.jsx';
import RemoveUserPage from './containers/RemoveUserPage.jsx';
import EditUserPage from './containers/EditUserPage.jsx';
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
    },
    {
      path: '/changeProfile',
      component: ProfilePage
    },
    {
      path: '/createUser',
      component: CreateUserPage
    },
    {
      path: '/createOrg',
      component: CreateOrgPage
    },
    {
      path: '/listUsers',
      component: ListUsersPage
    },
    {
      path: '/removeUsersAdmin/:id',
      component: RemoveUserPage
    },
    {
      path: '/editUserAdmins/:id/:name/:email',
      component: EditUserPage
    }
  ]
};

export default routes;