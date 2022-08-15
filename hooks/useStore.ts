import create from 'zustand';

export interface Route {
  route: string;
  bound: 'I' | 'O';
  service_type: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  orig_tc: string;
  dest_tc: string;
}

interface StoreState {
  routes: Route[] | undefined;
  setRoutes: (routes: Route[]) => void;
}

const useStore = create<StoreState>()(set => ({
  routes: undefined,
  setRoutes: routes => set(state => ({routes: routes})),
}));

export default useStore;
