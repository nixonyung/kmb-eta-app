import {FontAwesome} from '@expo/vector-icons';
import _ from 'lodash';
import {Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-root-toast';
import useDataStore from '../hooks/useDataStore';
import useRouteAllStopNamesWithEtas from '../hooks/useRouteAllStopNamesWithEtas';
import Route from '../schemas/Route';

interface EtaListItemProp {
  route: Route;
  index: number;
  routeNameShown?: boolean;
}

export default function EtaListItem({route, index, routeNameShown = false}: EtaListItemProp) {
  const {isSuccess, routeAllStopNamesWithEtas} = useRouteAllStopNamesWithEtas(route);
  const stopNameWithEtas = routeAllStopNamesWithEtas[index];

  const routeToFavoriteStopIndices = useDataStore(store => store.routeToFavoriteStopIndices);
  const isFavorite = routeToFavoriteStopIndices.get(route)?.includes(index) ?? false;

  const addFavoritestopIndexToRoute = useDataStore(store => store.addFavoritestopIndexToRoute);
  const removeFavoritestopIndexToRoute = useDataStore(
    store => store.removeFavoritestopIndexToRoute
  );

  return (
    <View
      style={{
        height: routeNameShown ? 130 : 100,

        flexDirection: 'row',
        paddingVertical: 5,
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: '#666666',
        backgroundColor: '#a2c5fa',
      }}
    >
      {isSuccess && (
        <>
          <View>
            {routeNameShown && (
              <Text style={{marginVertical: 5, fontSize: 20, fontWeight: 'bold'}}>
                {route.route}
              </Text>
            )}

            <Text style={{fontSize: 18}}>
              {index + 1}. {stopNameWithEtas.name_tc}
            </Text>

            {_.isEmpty(stopNameWithEtas.eta) ? (
              <Text style={{marginTop: 10, marginLeft: 30, fontSize: 18}}>暫沒有班次</Text>
            ) : (
              stopNameWithEtas.eta.map((etaText, index) => (
                <Text
                  style={{marginLeft: 30, color: etaText[0] === '-' ? '#ff2222' : 'black'}}
                  key={index}
                >
                  {etaText}
                </Text>
              ))
            )}
          </View>

          <View style={{flex: 1}} />

          <View style={{height: '100%'}}>
            <TouchableOpacity
              style={{flex: 1, paddingHorizontal: 30, justifyContent: 'center'}}
              onPress={() => {
                if (!isFavorite) addFavoritestopIndexToRoute(index, route);
                else
                  Toast.show('Long press the start to remove the item from your favorites.', {
                    duration: Toast.durations.SHORT,
                    position: -75,
                    shadow: false,
                  });
              }}
              onLongPress={() => {
                if (isFavorite) removeFavoritestopIndexToRoute(index, route);
              }}
            >
              <FontAwesome
                size={30}
                name={isFavorite ? 'star' : 'star-o'}
                color={isFavorite ? '#ffdc00' : '#aaaaaa66'}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
