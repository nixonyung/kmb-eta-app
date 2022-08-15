import _ from 'lodash';
import create from 'zustand';

export interface Route {
  route: string;
  bound: 'I' | 'O';
  service_type: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  orig_tc: string;
  dest_tc: string;
}

export interface Stop {
  route: string;
  bound: 'I' | 'O';
  service_type: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  index: number;
}

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
