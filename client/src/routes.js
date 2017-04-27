import BasePage from './containers/BasePage.jsx';
import HomePage from './containers/HomePage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import ForgotPage from './containers/ForgotPage.jsx';
import NewPasswordPage from './containers/NewPasswordPage.jsx';
import ProfilePage from './containers/ProfilePage.jsx';
import CreateUserPage from './containers/CreateUserPage.jsx';
import CreateOrgPage from './containers/CreateOrgPage.jsx';
import CreateLicensePage from './containers/CreateLicensePage.jsx';
import ListUsersPage from './containers/ListUsersPage.jsx';
import EditUserPage from './containers/EditUserPage.jsx';
import EditOrgPage from './containers/EditOrgPage.jsx';
import ListOrgsPage from './containers/ListOrgsPage.jsx';
import ListLicensesPage from './containers/ListLicensesPage.jsx';
import ExtendLicensePage from './containers/ExtendLicensePage.jsx';
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
      path: '/createLicense/:UserId/:OrgId',
      component: CreateLicensePage
    },
    {
      path: '/listUsers/:id/:orgName',
      component: ListUsersPage
    },
    {
      path: '/listLicenses/:id/:orgName',
      component: ListLicensesPage
    },
    {
      path: '/editUserAdmins/:id',
      component: EditUserPage
    },
    {
      path: '/editOrgAdmins/:id',
      component: EditOrgPage
    },
    {
      path: '/listOrgs',
      component: ListOrgsPage
    },
    {
      path: '/extendLicense/:LicenseId/:OrgId',
      component: ExtendLicensePage
    }
  ]
};

export default routes;