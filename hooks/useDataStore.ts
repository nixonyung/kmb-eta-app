import _ from 'lodash';
import create from 'zustand';
import Route from '../schemas/Route';

export interface StoreState {
  routes: Route[] | undefined;
  routeToStopNames: Map<Route, string[]>;
  routeToFavoriteStopIndices: Map<Route, number[]>;

  initRoutes: (routes: Route[]) => void;

  addFavoritestopIndexToRoute: (index: number, route: Route) => void;
  removeFavoritestopIndexToRoute: (index: number, route: Route) => void;
}

const useDataStore = create<StoreState>()(set => ({
  routes: undefined,
  routeToStopNames: new Map(),
  routeToFavoriteStopIndices: new Map(),

  initRoutes: routes => set(state => ({routes})),

  addFavoritestopIndexToRoute: (index, route) =>
    set(state => {
      const currentIndices = state.routeToFavoriteStopIndices.get(route) ?? [];

      return {
        routeToFavoriteStopIndices: _.cloneDeep(state.routeToFavoriteStopIndices).set(route, [
          ...new Set([...currentIndices, index]),
        ]),
      };
    }),

  removeFavoritestopIndexToRoute: (index, route) =>
    set(state => {
      const currentIndices = state.routeToFavoriteStopIndices.get(route);

      if (currentIndices !== undefined) {
        return {
          routeToFavoriteStopIndices: _.cloneDeep(state.routeToFavoriteStopIndices).set(
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
