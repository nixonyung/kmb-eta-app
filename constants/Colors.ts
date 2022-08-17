// scheme-depending settings
const primaryLight = 'white';
const primaryDark = 'black';
const secondaryLight = '#eeeeee';
const secondaryDark = '#222222';
const textLight = 'black';
const textDark = '#eeeeee';
const borderLight = '#666666';
const borderDark = '#666666';
const listItemBackgroundLight = '#a2c5fa';
const listItemBackgroundDark = '#063275';
const loadingIndicatorLight = '#444444';
const loadingIndicatorDark = '#444444';
const hintLight = '#cccccc';
const hintDark = '#444444';

// common settings
const tabBarActiveTint = '#2f95dc';
const etaModalOverlayBackground = 'rgba(0,0,0,0.7)';
const etaListItemLateText = '#ff2222';
const etaListItemStarActive = '#ffdc00';
const etaListItemStarInactive = '#888888aa';

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
  hint: string;

  routeListBackground: string;
  routeListItemBorder: string;
  routeListItemBackground: string;
  routeListItemText: string;

  etaModalOverlayBackground: string;
  etaModalHeaderBackground: string;
  etaModalHeaderText: string;

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

const Colors: Colors = {
  light: {
    headerBackground: secondaryLight,
    headerTitle: textLight,
    headerIcon: textLight,

    tabBarInactiveBackground: secondaryLight,
    tabBarActiveBackground: secondaryLight,
    tabBarActiveTint,

    screenBackground: primaryLight,
    textInputBorder: borderLight,
    textInputBackground: primaryLight,
    loadingIndicator: loadingIndicatorLight,
    hint: hintLight,

    routeListBackground: listItemBackgroundLight,
    routeListItemBorder: borderLight,
    routeListItemBackground: listItemBackgroundLight,
    routeListItemText: textLight,

    etaModalOverlayBackground,
    etaModalHeaderBackground: secondaryLight,
    etaModalHeaderText: textLight,

    etaListBackground: listItemBackgroundLight,
    etaListItemBorder: borderLight,
    etaListItemBackground: listItemBackgroundLight,
    etaListItemText: textLight,
    etaListItemLateText,
    etaListItemStarActive,
    etaListItemStarInactive,
  },

  dark: {
    headerBackground: secondaryDark,
    headerTitle: textDark,
    headerIcon: textDark,

    tabBarInactiveBackground: secondaryDark,
    tabBarActiveBackground: secondaryDark,
    tabBarActiveTint,

    screenBackground: primaryDark,
    textInputBorder: borderDark,
    textInputBackground: primaryDark,
    loadingIndicator: loadingIndicatorDark,
    hint: hintDark,

    routeListBackground: listItemBackgroundDark,
    routeListItemBorder: borderDark,
    routeListItemBackground: listItemBackgroundDark,
    routeListItemText: textDark,

    etaModalOverlayBackground,
    etaModalHeaderBackground: secondaryDark,
    etaModalHeaderText: textDark,

    etaListBackground: listItemBackgroundDark,
    etaListItemBorder: borderDark,
    etaListItemBackground: listItemBackgroundDark,
    etaListItemText: textDark,
    etaListItemLateText,
    etaListItemStarActive,
    etaListItemStarInactive,
  },
};

export default Colors;
