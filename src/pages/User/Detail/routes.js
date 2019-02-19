import NotFound from '../../../components/NotFound/NotFound';
import LoadableModule from '../../../utils/loadable/loadable';

const createRoutes = (context = '') => {
const PRE_FIX = context;
  return [
    {
      path: `${PRE_FIX}/portfilo`,
      exact: true,
      component: LoadableModule(
        {
          loader: () => { return import('./Portfolios/PortfoliosContainer'); },
        },
      ),
    },
    {
        path: `${PRE_FIX}/portfolio/:portFoliosId`,
        exact: true,
        component: LoadableModule(
          {
            loader: () => { return import('./Item/ItemContainer'); },
          },
        ),
      },
    {
        path: `${PRE_FIX}`,
        exact: true,
        component: LoadableModule(
          {
            loader: () => { return import('./Portfolios/PortfoliosContainer'); },
          },
        ),
      },
    {
      component: NotFound,
    },
  ];
};


export default createRoutes;