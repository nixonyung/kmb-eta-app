import {FontAwesome} from '@expo/vector-icons';
import _ from 'lodash';
import {Text, TouchableOpacity, View} from 'react-native';
import RouteStopNamesWithEtas from '../schemas/RouteStopNameWithEtas';

interface EtaListItemProp {
  index: number;
  routeStopNamesWithEtas: RouteStopNamesWithEtas;
  isFavorite?: boolean;
  _addFavoritestopIndexToRoute: (index: number) => void;
  _removeFavoritestopIndexToRoute: (index: number) => void;
}

export default function EtaListItem({
  index,
  routeStopNamesWithEtas,
  isFavorite = false,
  _addFavoritestopIndexToRoute,
  _removeFavoritestopIndexToRoute,
}: EtaListItemProp) {
  return (
    <View
      key={index}
      style={{
        height: '100%',

        flexDirection: 'row',
        paddingVertical: 5,
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: '#00000066',
        backgroundColor: '#c1d8fc',
      }}
    >
      <View style={{backgroundColor: 'transparent'}}>
        <Text style={{fontSize: 18}}>
          {index + 1}. {routeStopNamesWithEtas.name_tc}
        </Text>

        {_.isEmpty(routeStopNamesWithEtas.eta) ? (
          <Text style={{marginTop: 10, marginLeft: 30, fontSize: 18}}>暫沒有班次</Text>
        ) : (
          routeStopNamesWithEtas.eta.map((etaText, index) => (
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
        <TouchableOpacity style={{flex: 1, paddingHorizontal: 30, justifyContent: 'center'}}>
          {isFavorite ? (
            <FontAwesome
              size={30}
              name="star"
              color="#ffff00"
              onPress={() => {
                _removeFavoritestopIndexToRoute(index);
              }}
            />
          ) : (
            <FontAwesome
              size={30}
              name="star-o"
              color="#aaaaaa66"
              onPress={() => {
                _addFavoritestopIndexToRoute(index);
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
