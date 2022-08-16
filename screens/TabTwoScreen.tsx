import {useQueries} from '@tanstack/react-query';
import {Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import useStore from '../hooks/useStore';

export default function TabTwoScreen() {
  const routeToFavoritestopIndices = useStore(store => store.routeToFavoritestopIndices);

  useQueries({queries: [...routeToFavoritestopIndices.keys()].map(route => ({queryKey: []}))});

  return (
    <SafeAreaProvider style={{flex: 1, backgroundColor: 'white'}}>
      <Text>haha</Text>

      {[...routeToFavoritestopIndices].flatMap(([route, indices]) =>
        indices.map(index => (
          // <EtaListItem index={index} route={route} isFavorite />
          <Text key={`${route.route}-${route.service_type}-${route.bound}-${index}`}>
            {route.route} {route.service_type} {route.bound}: {index}
          </Text>
        ))
      )}
    </SafeAreaProvider>
  );
}
