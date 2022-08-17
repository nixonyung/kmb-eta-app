import _ from 'lodash';
import {ActivityIndicator, Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import EtaListItem from '../components/EtaListItem';
import useRouteAllStopNamesWithEtas from '../hooks/useRouteAllStopNamesWithEtas';
import useThemeColors from '../hooks/useThemeColors';
import {RootStackScreenProps} from '../navigation/types';

export default function ModalScreen({route, navigation}: RootStackScreenProps<'Modal'>) {
  const {width} = Dimensions.get('window');
  const {isSuccess, routeAllStopNamesWithEtas} = useRouteAllStopNamesWithEtas(route.params);

  const ThemeColors = useThemeColors();

  return (
    <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor: 'transparent'}}>
      {/* Overlay */}
      <Pressable
        style={[StyleSheet.absoluteFill, {backgroundColor: ThemeColors.etaModalOverlayBackground}]}
        onPress={navigation.goBack}
      />

      {/* header */}
      <View
        style={{
          borderTopStartRadius: 10,
          borderTopEndRadius: 10,
          backgroundColor: ThemeColors.etaModalHeaderBackground,
        }}
      >
        <Text
          style={{
            marginVertical: 10,
            fontSize: 18,
            textAlign: 'center',
            color: ThemeColors.etaModalHeaderText,
          }}
        >
          {route.params.route} 往 {route.params.dest_tc}
          {route.params.service_type === '1' ? '' : ' (特別班)'}
        </Text>
      </View>

      {/* ETA list */}
      <View style={{height: 320, backgroundColor: ThemeColors.etaListBackground}}>
        {isSuccess ? (
          <RecyclerListView
            style={{flex: 1}}
            dataProvider={new DataProvider((lhs: number, rhs: number) => lhs !== rhs).cloneWithRows(
              _.range(0, routeAllStopNamesWithEtas.length)
            )}
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
            rowRenderer={(type, item: number) => (
              // item === index
              <EtaListItem
                key={`${route.params.route}_${item}`}
                index={item}
                route={route.params}
              />
            )}
          />
        ) : (
          <ActivityIndicator
            size="large"
            color={ThemeColors.loadingIndicator}
            style={{marginTop: 40}}
          />
        )}
      </View>
    </View>
  );
}
