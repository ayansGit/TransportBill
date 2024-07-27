import {useColorScheme} from 'react-native';
import {colors as appColors} from './colors';
import {IColors} from './IColors';

const lightTheme: IColors = {
  main: appColors.main,
  background: appColors.white,
  text: appColors.text,
  textLight: appColors.textLight,
};

const darkTheme: IColors = {
  main: appColors.main,
  background: appColors.white,
  text: appColors.text,
  textLight: appColors.textLight,
};

const themeColor = (): IColors => {
  const colorMode = useColorScheme();
  let colors: IColors;

  colors = colorMode === 'dark' ? darkTheme : lightTheme;
  return colors;
};
