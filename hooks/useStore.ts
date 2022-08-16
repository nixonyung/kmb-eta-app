import _ from 'lodash';
import create from 'zustand';
import Route from '../schemas/Route';

interface StoreState {
  routes: Route[] | undefined;
  setRoutes: (routes: Route[]) => void;
  routeToFavoritestopIndices: Map<Route, number[]>;
  addFavoritestopIndexToRoute: (index: number, route: Route) => void;
  removeFavoritestopIndexToRoute: (index: number, route: Route) => void;
}

const useStore = create<StoreState>()(set => ({
  routes: undefined,
  setRoutes: routes => set(state => ({routes})),

  routeToFavoritestopIndices: new Map(),

  addFavoritestopIndexToRoute: (index, route) =>
    set(state => {
      const currentIndices = state.routeToFavoritestopIndices.get(route) ?? [];

      return {
        routeToFavoritestopIndices: _.cloneDeep(state.routeToFavoritestopIndices).set(route, [
          ...new Set([...currentIndices, index]),
        ]),
      };
    }),

  removeFavoritestopIndexToRoute: (index, route) =>
    set(state => {
      const currentIndices = state.routeToFavoritestopIndices.get(route);

      if (currentIndices !== undefined) {
        return {
          routeToFavoritestopIndices: _.cloneDeep(state.routeToFavoritestopIndices).set(
            route,
            currentIndices.filter(_index => _index !== index)
          ),
        };
      } else {
        return {};
      }
    }),
}));

export default useStore;
