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
  routeToFavouriteStopIndices: Map<Route, number[]>;
  addFavouriteStopIndexToRoute: (index: number, route: Route) => void;
  removeFavouriteStopIndexToRoute: (index: number, route: Route) => void;
}

const useStore = create<StoreState>()(set => ({
  routes: undefined,
  setRoutes: routes => set(state => ({routes})),

  routeToFavouriteStopIndices: new Map(),

  addFavouriteStopIndexToRoute: (index, route) => {
    console.log(index);
    console.log(route);
    set(state => {
      const favouriteStopIndicesOfRoute = state.routeToFavouriteStopIndices.get(route) ?? [];

      return {
        routeToFavouriteStopIndices: state.routeToFavouriteStopIndices.set(route, [
          ...new Set([...favouriteStopIndicesOfRoute, index]),
        ]),
      };
    });
  },

  removeFavouriteStopIndexToRoute: (index, route) =>
    set(state => {
      const favouriteStopIndicesOfRoute = state.routeToFavouriteStopIndices.get(route);

      if (favouriteStopIndicesOfRoute !== undefined) {
        return {
          routeToFavouriteStopIndices: state.routeToFavouriteStopIndices.set(
            route,
            favouriteStopIndicesOfRoute.filter(_index => _index !== index)
          ),
        };
      } else {
        return {};
      }
    }),
}));

export default useStore;
