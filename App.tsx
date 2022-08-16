import {focusManager, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StatusBar} from 'expo-status-bar';
import _ from 'lodash';
import {useEffect} from 'react';
import {AppState, Platform} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import useDataStore from './hooks/useDataStore';
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
  const initRoutes = useDataStore(state => state.initRoutes);

  useEffect(() => {
    fetch('https://data.etabus.gov.hk/v1/transport/kmb/route')
      .then(res => res.json())
      .then(data =>
        initRoutes(
          data.data.map((d: any) =>
            _.pick(d, ['route', 'bound', 'service_type', 'orig_tc', 'dest_tc'])
          )
        )
      );
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', status => {
      if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active');
      }
    });

    return () => subscription.remove();
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
