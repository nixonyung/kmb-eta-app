/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {ColorSchemeName, TouchableOpacity, View} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import useColorScheme from '../hooks/useColorScheme';
import useDataStore from '../hooks/useDataStore';
import useThemeColors from '../hooks/useThemeColors';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import LinkingConfiguration from './LinkingConfiguration';
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from './types';

export default function Navigation({colorScheme}: {colorScheme: ColorSchemeName}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
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
  const colorScheme = useColorScheme();

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
      screenOptions={{
        tabBarActiveTintColor: ThemeColors.tabBarActiveTintColor,
        tabBarActiveBackgroundColor: ThemeColors.tabBarActiveBackgroundColor,
        tabBarInactiveBackgroundColor: ThemeColors.tabBarInactiveBackgroundColor,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({navigation}: RootTabScreenProps<'TabOne'>) => ({
          title: 'Routes',
          tabBarIcon: ({color}) => <TabBarIcon name="bus" color={color} />,
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={async () => {
                  await toggleIsDarkMode();
                }}
                style={{marginRight: 25}}
              >
                <FontAwesome
                  name={isDarkMode ? 'moon-o' : 'sun-o'}
                  size={20}
                  color={ThemeColors.headerIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  loadRoutes();
                  loadRouteToFavoriteStopIndices();
                }}
                style={{marginRight: 25}}
              >
                <FontAwesome name="refresh" size={20} color={ThemeColors.headerIcon} />
              </TouchableOpacity>
            </View>
          ),
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
