import {FontAwesome} from '@expo/vector-icons';
import _ from 'lodash';
import {Text, TouchableOpacity, View} from 'react-native';
import StopNameWithEtas from '../schemas/StopNameWithEtas';

interface EtaListItemProp {
  index: number;
  stopNameWithEtas: StopNameWithEtas;
  isFavorite?: boolean;
  _addFavoritestopIndexToRoute: (index: number) => void;
  _removeFavoritestopIndexToRoute: (index: number) => void;
}

export default function EtaListItem({
  index,
  stopNameWithEtas,
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
            if (isFavorite) _removeFavoritestopIndexToRoute(index);
            else _addFavoritestopIndexToRoute(index);
          }}
        >
          <FontAwesome
            size={30}
            name={isFavorite ? 'star' : 'star-o'}
            color={isFavorite ? '#ffff00' : '#aaaaaa66'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
