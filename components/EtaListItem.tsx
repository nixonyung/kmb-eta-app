import {FontAwesome} from '@expo/vector-icons';
import _ from 'lodash';
import {Text, TouchableOpacity, View} from 'react-native';
import useDataStore from '../hooks/useDataStore';
import useRouteAllStopNamesWithEtas from '../hooks/useRouteAllStopNamesWithEtas';
import Route from '../schemas/Route';

interface EtaListItemProp {
  route: Route;
  index: number;

  // stopNameWithEtas: StopNameWithEtas;
  // isFavorite?: boolean;
  // _addFavoritestopIndexToRoute: (index: number) => void;
  // _removeFavoritestopIndexToRoute: (index: number) => void;
}

export default function EtaListItem({
  route,
  index,
}: // stopNameWithEtas,
// isFavorite = false,
// _addFavoritestopIndexToRoute,
// _removeFavoritestopIndexToRoute,
EtaListItemProp) {
  const {routeAllStopNamesWithEtas} = useRouteAllStopNamesWithEtas(route);
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
        height: 100,

        flexDirection: 'row',
        paddingVertical: 5,
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: '#666666',
        backgroundColor: '#a2c5fa',
      }}
    >
      <View style={{backgroundColor: 'transparent'}}>
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
      <View style={{flex: 1, backgroundColor: 'transparent'}} />
      <View
        style={{
          height: '100%',
          backgroundColor: 'transparent',
        }}
      >
        <TouchableOpacity
          style={{flex: 1, paddingHorizontal: 30, justifyContent: 'center'}}
          onPress={() => {
            if (isFavorite) removeFavoritestopIndexToRoute(index, route);
            else addFavoritestopIndexToRoute(index, route);
          }}
        >
          <FontAwesome
            size={30}
            name={isFavorite ? 'star' : 'star-o'}
            color={isFavorite ? '#ffdc00' : '#aaaaaa66'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
