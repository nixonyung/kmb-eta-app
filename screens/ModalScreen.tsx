import _ from 'lodash';
import {Dimensions, Pressable, StyleSheet, Text} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import EtaListItem from '../components/EtaListItem';
import {View} from '../components/Themed';
import useRouteAllStopNamesWithEtas from '../hooks/useRouteAllStopNamesWithEtas';
import useStore from '../hooks/useStore';
import {RootStackScreenProps} from '../navigation/types';
import StopNameWithEtas from '../schemas/StopNameWithEtas';

export default function ModalScreen({route, navigation}: RootStackScreenProps<'Modal'>) {
  const {width} = Dimensions.get('window');
  const {isSuccess, routeAllStopNamesWithEtas} = useRouteAllStopNamesWithEtas(route.params);

  const routeToFavoritestopIndices = useStore(store => store.routeToFavoritestopIndices, _.isEqual);
  const favoritestopIndices = routeToFavoritestopIndices.get(route.params);

  const addFavoritestopIndexToRoute = useStore(store => store.addFavoritestopIndexToRoute);
  const removeFavoritestopIndexToRoute = useStore(store => store.removeFavoritestopIndexToRoute);

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
              (it1: StopNameWithEtas, it2: StopNameWithEtas) => it1.name_tc !== it2.name_tc
            ).cloneWithRows(routeAllStopNamesWithEtas)}
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
            rowRenderer={(type, item: StopNameWithEtas, index) => (
              <EtaListItem
                index={index}
                stopNameWithEtas={item}
                isFavorite={favoritestopIndices?.includes(index)}
                _addFavoritestopIndexToRoute={_.partialRight(
                  addFavoritestopIndexToRoute,
                  route.params
                )}
                _removeFavoritestopIndexToRoute={_.partialRight(
                  removeFavoritestopIndexToRoute,
                  route.params
                )}
              />
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
