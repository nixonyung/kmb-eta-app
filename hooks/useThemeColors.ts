import Colors from '../constants/Colors';
import useDataStore from './useDataStore';

export default function useThemeColors() {
  const isDarkMode = useDataStore(store => store.isDarkMode);

  return Colors[isDarkMode ? 'dark' : 'light'];
}
