import {FontAwesome} from '@expo/vector-icons';
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import EtaListItem from '../components/EtaListItem';
import useDataStore from '../hooks/useDataStore';
import useThemeColors from '../hooks/useThemeColors';

export default function TabTwoScreen() {
  const routeToFavoriteStopIndices = useDataStore(store => store.routeToFavoriteStopIndices);
  const ThemeColors = useThemeColors();

  return (
    <SafeAreaProvider style={{flex: 1, backgroundColor: ThemeColors.screenBackground}}>
      {routeToFavoriteStopIndices.size === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <FontAwesome name="star" size={80} color={ThemeColors.hint} />
          <Text
            style={{
              marginTop: 40,
              textAlign: 'center',
              fontSize: 30,
              color: ThemeColors.hint,
            }}
          >
            {'Add favorites and\nsee them here!'}
          </Text>
        </View>
      ) : (
        <ScrollView style={{flex: 1}}>
          {[...routeToFavoriteStopIndices].flatMap(([route, indices]) =>
            indices.map(index => (
              <EtaListItem
                key={`${route.route}_${route.service_type}_${route.bound}_${index}`}
                index={index}
                route={route}
                routeNameShown
              />
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaProvider>
  );
}
