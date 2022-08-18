/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {Feather, FontAwesome} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {ColorfulTabBar} from 'react-navigation-tabbar-collection';

import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-root-toast';
import useDataStore from '../hooks/useDataStore';
import useThemeColors from '../hooks/useThemeColors';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import LinkingConfiguration from './LinkingConfiguration';
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from './types';

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}} />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={{
            presentation: 'transparentModal',
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const isDarkMode = useDataStore(store => store.isDarkMode);
  const loadRoutes = useDataStore(store => store.loadRoutes);
  const loadRouteToFavoriteStopIndices = useDataStore(
    store => store.loadRouteToFavoriteStopIndices
  );
  const toggleIsDarkMode = useDataStore(store => store.toggleIsDarkMode);

  const ThemeColors = useThemeColors();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBar={({state, descriptors, navigation}) => (
        <ColorfulTabBar
          state={state}
          navigation={navigation}
          descriptors={descriptors as any}
          maxWidth={600}
          height={55}
          darkMode={isDarkMode}
          colorPalette={{
            primary: ThemeColors.tabBarActiveTint,
            secondary: '#6c757d',
            success: '#198754',
            danger: '#c9379d',
            warning: '#e6a919',
            info: '#00bcd4',
            light: ThemeColors.tabBarBackground, //Background Color
            dark: ThemeColors.hint, //Foreground Color
          }}
        />
      )}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerStyle: {
          backgroundColor: ThemeColors.headerBackground,
        },
        headerTitleStyle: {
          fontFamily: 'Montserrat_700Bold',
          color: ThemeColors.headerTitle,
        },
        tabBarLabelStyle: {
          fontFamily: 'Montserrat_400Regular',
        },

        headerRight: () => (
          <View style={{flexDirection: 'row', marginRight: 15}}>
            <TouchableOpacity
              onPress={async () => {
                Toast.show(isDarkMode ? 'Disabling dark mode...' : 'Enabling dark mode...', {
                  position: -75,
                  duration: 1000,
                  shadow: false,
                });
                await toggleIsDarkMode();
              }}
              style={{height: '100%', paddingHorizontal: 10}}
            >
              <Feather
                name={isDarkMode ? 'moon' : 'sun'}
                size={20}
                color={ThemeColors.headerIcon}
              />
            </TouchableOpacity>

            <View style={{width: 5}} />

            <TouchableOpacity
              onPress={() => {
                loadRoutes();
                loadRouteToFavoriteStopIndices();
              }}
              style={{height: '100%', paddingHorizontal: 10}}
            >
              <Feather name="refresh-cw" size={20} color={ThemeColors.headerIcon} />
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({navigation}: RootTabScreenProps<'TabOne'>) => ({
          title: 'Routes',
          tabBarIcon: ({color}) => <TabBarIcon name="bus" color={color} />,
        })}
      />

      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Favorites',
          tabBarIcon: ({color}) => <TabBarIcon name="star" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{marginBottom: -3}} {...props} />;
}
