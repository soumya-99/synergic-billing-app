import { useColorScheme } from 'react-native';
import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';

export const usePaperColorScheme = () => {
    const colorScheme = useColorScheme();

    const fontConfig = {
        labelSmall: {
            fontFamily: "ProductSans-Medium",
            fontSize: 15
        },
        labelMedium: {
            fontFamily: "ProductSans-Medium",
            fontSize: 15
        },
        labelLarge: {
            fontFamily: "ProductSans-Medium",
            fontSize: 15
        },

        displayMedium: {
            fontFamily: "ProductSans-Medium",
            fontSize: 40
        }
    };

    return (colorScheme === 'dark')
        ? {
            ...MD3DarkTheme,
            colors: {
                ...MD3DarkTheme.colors
            },
            fonts: configureFonts({ config: fontConfig }),
        }
        : {
            ...MD3LightTheme,
            colors: {
                ...MD3LightTheme.colors
            },
            fonts: configureFonts({ config: fontConfig }),
        };
}
