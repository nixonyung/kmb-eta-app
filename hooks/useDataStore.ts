import _ from 'lodash';
import create from 'zustand';
import Route from '../schemas/Route';

export interface StoreState {
  routes: Route[] | undefined;
  routeToFavoritestopIndices: Map<Route, number[]>;

  setRoutes: (routes: Route[]) => void;

  addFavoritestopIndexToRoute: (index: number, route: Route) => void;
  removeFavoritestopIndexToRoute: (index: number, route: Route) => void;
}

const useDataStore = create<StoreState>()(set => ({
  routes: undefined,
  routeToFavoritestopIndices: new Map(),

  setRoutes: routes => set(state => ({routes})),

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

export default useDataStore;
