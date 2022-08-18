import {Montserrat_400Regular, Montserrat_700Bold} from '@expo-google-fonts/montserrat';
import {focusManager, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useFonts} from 'expo-font';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import {AppState, Platform} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RootSiblingParent} from 'react-native-root-siblings';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
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
  const isDarkMode = useDataStore(state => state.isDarkMode);
  const loadIsDarkMode = useDataStore(state => state.loadIsDarkMode);
  const loadRoutes = useDataStore(state => state.loadRoutes);
  const loadRouteToFavoriteStopIndices = useDataStore(
    state => state.loadRouteToFavoriteStopIndices
  );

  // load fonts
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  // init data store
  useEffect(() => {
    (async function () {
      await loadIsDarkMode();
      await loadRoutes();
      await loadRouteToFavoriteStopIndices();
    })();
  }, []);

  // React Query refetch on focusing app
  useEffect(() => {
    const subscription = AppState.addEventListener('change', status => {
      if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active');
      }
    });

    return () => subscription.remove();
  }, []);

  if (!isLoadingComplete || !fontsLoaded) {
    return null;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{flex: 1}}>
          <RootSiblingParent>
            <SafeAreaProvider>
              <Navigation />
              <StatusBar style={isDarkMode ? 'light' : 'dark'} />
            </SafeAreaProvider>
          </RootSiblingParent>
        </GestureHandlerRootView>
      </QueryClientProvider>
    );
  }
}
