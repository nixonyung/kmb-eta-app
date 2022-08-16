import {useQueries} from '@tanstack/react-query';
import {ScrollView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import EtaListItem from '../components/EtaListItem';
import useDataStore from '../hooks/useDataStore';

export default function TabTwoScreen() {
  const routeToFavoriteStopIndices = useDataStore(store => store.routeToFavoriteStopIndices);

  useQueries({queries: [...routeToFavoriteStopIndices.keys()].map(route => ({queryKey: []}))});

  return (
    <SafeAreaProvider style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={{flex: 1}}>
        {[...routeToFavoriteStopIndices].flatMap(([route, indices]) =>
          indices.map(index => (
            <EtaListItem
              key={`${route.route}-${index}`}
              index={index}
              route={route}
              routeNameShown
            />
          ))
        )}
      </ScrollView>
    </SafeAreaProvider>
  );
}
