import NotFound from '../../components/NotFound/NotFound';
import LoadableModule from '../../utils/loadable/loadable';

const createRoutes = (context = '') => {
const PRE_FIX = context;
  return [
    {
      path: `${PRE_FIX}/:userId`,
      exact: true,
      component: LoadableModule(
        {
          loader: () => { return import('./Detail/DetailContainer'); },
        },
      ),
    },
    {
        path: `${PRE_FIX}`,
        exact: true,
        component: LoadableModule(
          {
            loader: () => { return import('./List/ListContainer'); },
          },
        ),
      },
    {
      component: NotFound,
    },
  ];
};


export default createRoutes;