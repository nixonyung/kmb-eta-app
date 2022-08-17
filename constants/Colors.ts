interface ColorsConfig {
  headerBackground: string;
  headerTitle: string;
  headerIcon: string;

  tabBarInactiveBackground: string;
  tabBarActiveBackground: string;
  tabBarActiveTint: string;

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
    headerBackground: 'white',
    headerTitle: 'black',
    headerIcon: '#222222',

    tabBarInactiveBackground: 'white',
    tabBarActiveBackground: 'white',
    tabBarActiveTint: '#2f95dc',

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
    headerBackground: 'white',
    headerTitle: 'black',
    headerIcon: '#222222',

    tabBarInactiveBackground: 'white',
    tabBarActiveBackground: 'white',
    tabBarActiveTint: '#2f95dc',

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
