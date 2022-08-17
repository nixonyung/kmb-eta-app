import {SearchBar} from '@rneui/themed';
import {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import useDataStore from '../hooks/useDataStore';
import useThemeColors from '../hooks/useThemeColors';
import {RootTabScreenProps} from '../navigation/types';
import Route from '../schemas/Route';

const {width, height} = Dimensions.get('window');

export default function TabOneScreen({navigation}: RootTabScreenProps<'TabOne'>) {
  const routes = useDataStore(state => state.routes);
  const [SearchText, setSearchText] = useState('');
  const filteredRoutes = routes?.filter(r => r.route.match(new RegExp(`^${SearchText}`, 'gi')));

  const updateSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  const ThemeColors = useThemeColors();

  return (
    <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: ThemeColors.screenBackground,
        }}
      >
        <SearchBar
          value={SearchText}
          onChangeText={setSearchText}
          placeholder="請輸入路線..."
          lightTheme
          containerStyle={{
            marginHorizontal: 20,
            marginBottom: 30,
            padding: 3,
            backgroundColor: ThemeColors.textInputBorder,
          }}
          inputContainerStyle={{backgroundColor: ThemeColors.textInputBackground}}
        />

        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: ThemeColors.routeListBackground,
          }}
        >
          {routes === undefined ? (
            <ActivityIndicator style={{marginTop: 40}} color={ThemeColors.loadingIndicator} />
          ) : (
            filteredRoutes !== undefined &&
            filteredRoutes.length !== 0 && (
              <RecyclerListView
                style={{flex: 1}}
                dataProvider={new DataProvider((it1, it2) => it1 !== it2).cloneWithRows(
                  filteredRoutes
                )}
                layoutProvider={
                  new LayoutProvider(
                    index => 0,

                    (type, dim) => {
                      dim.width = width;
                      dim.height = 40;
                    }
                  )
                }
                rowRenderer={(type, it: Route) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Modal', it)}
                    style={{
                      flex: 1,
                      paddingHorizontal: 20,
                      borderWidth: 1,
                      borderColor: ThemeColors.routeListItemBorder,
                      backgroundColor: ThemeColors.routeListItemBackground,
                    }}
                  >
                    <Text style={{fontSize: 20, color: ThemeColors.routeListItemText}}>
                      {it.route.padEnd(6, ' ')}
                      {'\t'}
                      &nbsp;往&nbsp;
                      {it.dest_tc}
                      {it.service_type === '1' ? '' : '  (特別班)'}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
