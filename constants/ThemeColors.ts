const tintColorDark = '#fff';

const ThemeColors = {
  light: {
    tabBarInactiveBackgroundColor: 'white',
    tabBarActiveBackgroundColor: 'white',
    tabBarActiveTintColor: '#2f95dc',

    screenBackground: 'white',
    textInputBorder: '#888888',
    textInputBackground: 'white',
    loadingIndicator: '#eeeeee',

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
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};

export default ThemeColors;
