import NotFound from '@containers/NotFoundPage/Loadable';
import HomeContainer from '@containers/HomeContainer/Loadable';
import routeConstants from '@utils/routeConstants';
export const routeConfig = {
  data: {
    component: HomeContainer,
    ...routeConstants.data
  },
  notFoundPage: {
    component: NotFound,
    route: '/'
  }
};
