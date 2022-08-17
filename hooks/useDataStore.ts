import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import create from 'zustand';
import Route from '../schemas/Route';

export interface StoreState {
  routes: Route[] | undefined;
  routeToStopNames: Map<Route, string[]>;
  routeToFavoriteStopIndices: Map<Route, number[]>;

  initRoutes: () => void;
  loadRouteToFavoriteStopIndices: () => void;

  addFavoritestopIndexToRoute: (index: number, route: Route) => void;
  removeFavoritestopIndexToRoute: (index: number, route: Route) => void;
}

const useDataStore = create<StoreState>()(set => ({
  routes: undefined,
  routeToStopNames: new Map(),
  routeToFavoriteStopIndices: new Map(),

  initRoutes: async () => {
    const res = await fetch('https://data.etabus.gov.hk/v1/transport/kmb/route');
    const data = await res.json();

    set(state => ({
      routes: data.data.map((d: any) =>
        _.pick(d, ['route', 'bound', 'service_type', 'orig_tc', 'dest_tc'])
      ),
    }));
  },

  loadRouteToFavoriteStopIndices: async () => {
    const routeToFavoriteStopIndices = new Map();
    const storedKeys = await AsyncStorage.getAllKeys();

    set(state => {
      if (state.routes === undefined) return {};

      _(storedKeys)
        .groupBy(s => s.slice(0, s.lastIndexOf('_')))
        .forEach((v, k) => {
          const [route, service_type, bound] = k.split('_').slice(1);
          const _key = state.routes?.find(it => _.isMatch(it, {route, service_type, bound}));
          const _value = v.map(s => parseInt(s.split('_').slice(-1)[0]));

          routeToFavoriteStopIndices.set(_key, _value);
        });

      return {routeToFavoriteStopIndices};
    });

    // AsyncStorage.clear();
  },

  addFavoritestopIndexToRoute: async (index, route) => {
    await AsyncStorage.setItem(
      `favorites_${route.route}_${route.service_type}_${route.bound}_${index}`,
      '1'
    );

    set(state => {
      const currentIndices = state.routeToFavoriteStopIndices.get(route) ?? [];

      const routeToFavoriteStopIndices = _.cloneDeep(state.routeToFavoriteStopIndices);
      routeToFavoriteStopIndices.set(route, [...new Set([...currentIndices, index])]);

      return {routeToFavoriteStopIndices};
    });
  },

  removeFavoritestopIndexToRoute: async (index, route) => {
    await AsyncStorage.removeItem(
      `favorites_${route.route}_${route.service_type}_${route.bound}_${index}`
    );

    set(state => {
      const currentIndices = state.routeToFavoriteStopIndices.get(route);
      if (currentIndices === undefined) return {};

      const routeToFavoriteStopIndices = _.cloneDeep(state.routeToFavoriteStopIndices);
      routeToFavoriteStopIndices.set(
        route,
        currentIndices.filter(_index => _index !== index)
      );

      return {routeToFavoriteStopIndices};
    });
  },
}));

export default useDataStore;
