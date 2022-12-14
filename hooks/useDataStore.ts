import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import {Appearance} from 'react-native';
import create from 'zustand';
import Route from '../schemas/Route';
import compareRouteNameOrder from '../utils';

export interface StoreState {
  isDarkMode: boolean;
  routes: Route[] | undefined;
  routeToStopNames: Map<Route, string[]>;
  routeToFavoriteStopIndices: Map<Route, number[]>;

  loadIsDarkMode: () => void;
  loadRoutes: () => void;
  loadRouteToFavoriteStopIndices: () => void;

  toggleIsDarkMode: () => void;
  addFavoritestopIndexToRoute: (index: number, route: Route) => void;
  removeFavoritestopIndexToRoute: (index: number, route: Route) => void;
}

const useDataStore = create<StoreState>()(set => ({
  isDarkMode: Appearance.getColorScheme() === 'dark',
  routes: undefined,
  routeToStopNames: new Map(),
  routeToFavoriteStopIndices: new Map(),

  loadIsDarkMode: async () => {
    const storedIsDarkMode = await AsyncStorage.getItem('isDarkMode');
    if (storedIsDarkMode !== null) {
      set(store => ({isDarkMode: storedIsDarkMode === '1'}));
    }
  },

  loadRoutes: async () => {
    const res = await fetch('https://data.etabus.gov.hk/v1/transport/kmb/route');
    const data = await res.json();

    set(state => ({
      routes: data.data.map((d: any) =>
        _.pick(d, ['route', 'bound', 'service_type', 'orig_tc', 'dest_tc'])
      ),
    }));
  },

  // should run after loadRoutes
  loadRouteToFavoriteStopIndices: async () => {
    const routeToFavoriteStopIndices = new Map();
    const storedFavoriteKeys = (await AsyncStorage.getAllKeys()).filter(
      k => k.match(/^favorites_.+_\d_[IO]_\d+$/) !== null
    );

    set(state => {
      if (state.routes === undefined) return {};

      _(storedFavoriteKeys)
        .sort((lhs, rhs) => compareRouteNameOrder(lhs, rhs))
        // .sort((lhs, rhs) => lhs.localeCompare(rhs)
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

  toggleIsDarkMode: async () => {
    let isDarkMode;
    set(state => {
      isDarkMode = !state.isDarkMode;
      return {isDarkMode};
    });

    await AsyncStorage.setItem('isDarkMode', isDarkMode ? '1' : '0');
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

      const newIndices = currentIndices.filter(_index => _index !== index);
      if (newIndices.length !== 0) {
        routeToFavoriteStopIndices.set(route, newIndices);
      } else {
        routeToFavoriteStopIndices.delete(route);
      }

      return {routeToFavoriteStopIndices};
    });
  },
}));

export default useDataStore;
