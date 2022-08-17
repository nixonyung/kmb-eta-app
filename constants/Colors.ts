interface ColorsConfig {
  tabBarInactiveBackgroundColor: string;
  tabBarActiveBackgroundColor: string;
  tabBarActiveTintColor: string;

  headerIcon: string;
  screenBackground: string;
  textInputBorder: string;
  textInputBackground: string;
  loadingIndicator: string;

  routeListBackground: string;
  routeListItemBorder: string;
  routeListItemBackground: string;

  etaModalOverlayBackground: string;
  etaModalHeaderBackground: string;

  etaListBackground: string;
  etaListItemBorder: string;
  etaListItemBackground: string;
  etaListItemText: string;
  etaListItemLateText: string;
  etaListItemStarActive: string;
  etaListItemStarInactive: string;
}
interface Colors {
  light: ColorsConfig;
  dark: ColorsConfig;
}

const tintColorDark = '#fff';

const Colors: Colors = {
  light: {
    tabBarInactiveBackgroundColor: 'white',
    tabBarActiveBackgroundColor: 'white',
    tabBarActiveTintColor: '#2f95dc',

    headerIcon: '#222222',
    screenBackground: 'white',
    textInputBorder: '#888888',
    textInputBackground: 'white',
    loadingIndicator: '#444444',

    routeListBackground: 'white',
    routeListItemBorder: '#666666',
    routeListItemBackground: '#a2c5fa',

    etaModalOverlayBackground: 'rgba(0,0,0,0.7)',
    etaModalHeaderBackground: '#dddddd',

    etaListBackground: '#a2c5fa',
    etaListItemBorder: '#666666',
    etaListItemBackground: '#a2c5fa',
    etaListItemText: 'black',
    etaListItemLateText: '#ff2222',
    etaListItemStarActive: '#ffdc00',
    etaListItemStarInactive: '#aaaaaaaa',
  },
  dark: {
    tabBarInactiveBackgroundColor: 'white',
    tabBarActiveBackgroundColor: 'white',
    tabBarActiveTintColor: '#2f95dc',

    headerIcon: '#222222',
    screenBackground: 'black',
    textInputBorder: '#888888',
    textInputBackground: 'white',
    loadingIndicator: '#444444',

    routeListBackground: 'white',
    routeListItemBorder: '#666666',
    routeListItemBackground: '#a2c5fa',

    etaModalOverlayBackground: 'rgba(0,0,0,0.7)',
    etaModalHeaderBackground: '#dddddd',

    etaListBackground: '#a2c5fa',
    etaListItemBorder: '#666666',
    etaListItemBackground: '#a2c5fa',
    etaListItemText: 'black',
    etaListItemLateText: '#ff2222',
    etaListItemStarActive: '#ffdc00',
    etaListItemStarInactive: '#aaaaaaaa',
  },
};

export default Colors;
