import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StatusBar} from 'expo-status-bar';
import _ from 'lodash';
import {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import useStore from './hooks/useStore';
import Navigation from './navigation';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({queryKey}) => {
        const res = await fetch(
          `https://data.etabus.gov.hk/v1/transport/kmb/${queryKey.join('/')}`,
          {
            method: 'GET',
            mode: 'no-cors',
          }
        );
        return await res.json();
      },
    },
  },
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const setRoutes = useStore(state => state.setRoutes);

  useEffect(() => {
    fetch('https://data.etabus.gov.hk/v1/transport/kmb/route')
      .then(res => res.json())
      .then(data =>
        setRoutes(
          data.data.map((d: any) =>
            _.pick(d, ['route', 'bound', 'service_type', 'orig_tc', 'dest_tc'])
          )
        )
      );
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    );
  }
}
