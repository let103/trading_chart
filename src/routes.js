import NotFound from './components/NotFound/NotFound';
import LoadableModule from './utils/loadable/loadable';

const createRoutes = () => {
  return [
    {
      path: '/user',
      exact: true,
      component: LoadableModule(
        {
          loader: () => { return import('./pages/User/UserContainer'); },
        },
      ),
    },
    {
      path: '/signin',
      exact: true,
      component: LoadableModule(
        {
          loader: () => { return import('./pages/Login/Login'); },
        },
      ),
    },
    {
      path: '/signup',
      exact: true,
      component: LoadableModule(
        {
          loader: () => { return import('./pages/Register/Register'); },
        },
      ),
    },
    {
      path: '/',
      exact: true,
      component: LoadableModule(
        {
          loader: () => { return import('./pages/User/UserContainer'); },
        },
      ),
    },
    {
      component: NotFound,
    },
  ];
};


export default createRoutes;