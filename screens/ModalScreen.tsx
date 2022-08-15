import {FontAwesome} from '@expo/vector-icons';
import _ from 'lodash';
import {Dimensions, Pressable, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import {View} from '../components/Themed';
import useStopNameToEtaList from '../hooks/useStopNameToEtaList';
import useStore from '../hooks/useStore';
import {RootStackScreenProps} from '../navigation/types';

export default function ModalScreen({route, navigation}: RootStackScreenProps<'Modal'>) {
  const {width, height} = Dimensions.get('window');
  const {isSuccess, stopNameToEtaList} = useStopNameToEtaList(route.params);

  const routeToFavoritestopIndices = useStore(store => store.routeToFavoritestopIndices, _.isEqual);
  const addFavoritestopIndexToRoute = useStore(store => store.addFavoritestopIndexToRoute);
  const removeFavoritestopIndexToRoute = useStore(store => store.removeFavoritestopIndexToRoute);

  const FavoritestopIndices = routeToFavoritestopIndices.get(route.params);

  return (
    <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: 'transparent'}}>
      {/* Overlay */}
      <Pressable
        style={[StyleSheet.absoluteFill, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}
        onPress={navigation.goBack}
      />

      {/* header */}
      <View
        style={{
          borderTopStartRadius: 10,
          borderTopEndRadius: 10,
          backgroundColor: 'white',
        }}
      >
        <Text style={{marginVertical: 10, fontSize: 18, textAlign: 'center'}}>
          {route.params.route} 往 {route.params.dest_tc}
          {route.params.service_type === '1' ? '' : ' (特別班)'}
        </Text>
      </View>

      {/* ETA list */}
      <View style={{height: 320, backgroundColor: 'white'}}>
        {isSuccess ? (
          <RecyclerListView
            style={{flex: 1}}
            dataProvider={new DataProvider(
              (it1: typeof stopNameToEtaList[number], it2: typeof stopNameToEtaList[number]) =>
                it1.name_tc !== it2.name_tc
            ).cloneWithRows(stopNameToEtaList)}
            layoutProvider={_(
              new LayoutProvider(
                index => 0,

                (type, dim) => {
                  dim.width = width;
                  dim.height = 100;
                }
              )
            )
              // lodash.tap to modify properties inplace
              .tap(it => (it.shouldRefreshWithAnchoring = false))
              .value()}
            rowRenderer={(type, item: typeof stopNameToEtaList[number], index) => (
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
                    {index + 1}. {item.name_tc}
                  </Text>

                  {_.isEmpty(item.eta) ? (
                    <Text style={{marginTop: 10, marginLeft: 30, fontSize: 18}}>暫沒有班次</Text>
                  ) : (
                    item.eta.map((etaText, index) => (
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
                  >
                    {FavoritestopIndices?.includes(index) ? (
                      <FontAwesome
                        size={30}
                        name="star"
                        color="#ffff00"
                        onPress={() => {
                          removeFavoritestopIndexToRoute(index, route.params);
                        }}
                      />
                    ) : (
                      <FontAwesome
                        size={30}
                        name="star-o"
                        color="#aaaaaa66"
                        onPress={() => {
                          addFavoritestopIndexToRoute(index, route.params);
                        }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={{paddingTop: 40, fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
            Loading...
          </Text>
        )}
      </View>
    </View>
  );
}
