import { useColorScheme } from 'react-native';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const usePaperColorScheme = () => {
    const colorScheme = useColorScheme();

    return (colorScheme === 'dark')
    ? {
        ...MD3DarkTheme,
        colors: {
            ...MD3DarkTheme.colors
        }
    }
    : {
        ...MD3LightTheme,
        colors: {
            ...MD3LightTheme.colors
        }
    };
}
