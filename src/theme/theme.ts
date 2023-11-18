import { Platform, useColorScheme } from "react-native"
import { MD3LightTheme, MD3DarkTheme, configureFonts } from "react-native-paper"

export const usePaperColorScheme = () => {
  const colorScheme = useColorScheme()
  const fontConfig = {
    default: {
      fontFamily: "ProductSans-Medium",
    },
    labelSmall: {
      fontFamily: "ProductSans-Medium",
      fontSize: 15,
    },
    labelMedium: {
      fontFamily: "ProductSans-Medium",
      fontSize: 15,
    },
    labelLarge: {
      fontFamily: "ProductSans-Medium",
      fontSize: 15,
    },

     titleLarge: {
      fontFamily: "ProductSans-Bold",
      fontSize: 20,
    },

    displayMedium: {
      fontFamily: "ProductSans-Medium",
      fontSize: 40,
    },
  }

  return colorScheme === "dark"
    ? {
        ...MD3DarkTheme,
        colors: {
          ...MD3DarkTheme.colors,
          primary: "rgb(165, 200, 255)",
          onPrimary: "rgb(0, 49, 95)",
          primaryContainer: "rgb(0, 71, 134)",
          onPrimaryContainer: "rgb(212, 227, 255)",
          secondary: "rgb(188, 199, 220)",
          onSecondary: "rgb(39, 49, 65)",
          secondaryContainer: "rgb(61, 71, 88)",
          onSecondaryContainer: "rgb(216, 227, 248)",
          tertiary: "rgb(218, 189, 226)",
          onTertiary: "rgb(61, 40, 70)",
          tertiaryContainer: "rgb(85, 63, 93)",
          onTertiaryContainer: "rgb(247, 216, 255)",
          error: "rgb(255, 180, 171)",
          onError: "rgb(105, 0, 5)",
          errorContainer: "rgb(147, 0, 10)",
          onErrorContainer: "rgb(255, 180, 171)",
          background: "rgb(26, 28, 30)",
          onBackground: "rgb(227, 226, 230)",
          surface: "rgb(26, 28, 30)",
          onSurface: "rgb(227, 226, 230)",
          surfaceVariant: "rgb(67, 71, 78)",
          onSurfaceVariant: "rgb(195, 198, 207)",
          outline: "rgb(141, 145, 153)",
          outlineVariant: "rgb(67, 71, 78)",
          shadow: "rgb(0, 0, 0)",
          scrim: "rgb(0, 0, 0)",
          inverseSurface: "rgb(227, 226, 230)",
          inverseOnSurface: "rgb(47, 48, 51)",
          inversePrimary: "rgb(0, 95, 175)",
          elevation: {
            level0: "transparent",
            level1: "rgb(33, 37, 41)",
            level2: "rgb(37, 42, 48)",
            level3: "rgb(41, 47, 55)",
            level4: "rgb(43, 49, 57)",
            level5: "rgb(46, 52, 62)",
          },
          surfaceDisabled: "rgba(227, 226, 230, 0.12)",
          onSurfaceDisabled: "rgba(227, 226, 230, 0.38)",
          backdrop: "rgba(45, 49, 56, 0.4)",
          green: "rgb(130, 219, 126)",
          onGreen: "rgb(0, 57, 10)",
          greenContainer: "rgb(0, 83, 18)",
          onGreenContainer: "rgb(157, 248, 152)",
          orange: "rgb(255, 183, 134)",
          onOrange: "rgb(80, 36, 0)",
          orangeContainer: "rgb(114, 54, 0)",
          onOrangeContainer: "rgb(255, 220, 198)",
          pink: "rgb(255, 177, 194)",
          onPink: "rgb(102, 0, 43)",
          pinkContainer: "rgb(143, 0, 63)",
          onPinkContainer: "rgb(255, 217, 223)",
        },
        fonts: configureFonts({ config: fontConfig }),
      }
    : {
        ...MD3LightTheme,
        colors: {
          ...MD3LightTheme.colors,
          primary: "rgb(0, 95, 175)",
          onPrimary: "rgb(255, 255, 255)",
          primaryContainer: "rgb(212, 227, 255)",
          onPrimaryContainer: "rgb(0, 28, 58)",
          secondary: "rgb(84, 95, 113)",
          onSecondary: "rgb(255, 255, 255)",
          secondaryContainer: "rgb(216, 227, 248)",
          onSecondaryContainer: "rgb(17, 28, 43)",
          tertiary: "rgb(110, 86, 118)",
          onTertiary: "rgb(255, 255, 255)",
          tertiaryContainer: "rgb(247, 216, 255)",
          onTertiaryContainer: "rgb(39, 20, 48)",
          error: "rgb(186, 26, 26)",
          onError: "rgb(255, 255, 255)",
          errorContainer: "rgb(255, 218, 214)",
          onErrorContainer: "rgb(65, 0, 2)",
          background: "rgb(253, 252, 255)",
          onBackground: "rgb(26, 28, 30)",
          surface: "rgb(253, 252, 255)",
          onSurface: "rgb(26, 28, 30)",
          surfaceVariant: "rgb(224, 226, 236)",
          onSurfaceVariant: "rgb(67, 71, 78)",
          outline: "rgb(116, 119, 127)",
          outlineVariant: "rgb(195, 198, 207)",
          shadow: "rgb(0, 0, 0)",
          scrim: "rgb(0, 0, 0)",
          inverseSurface: "rgb(47, 48, 51)",
          inverseOnSurface: "rgb(241, 240, 244)",
          inversePrimary: "rgb(165, 200, 255)",
          elevation: {
            level0: "transparent",
            level1: "rgb(240, 244, 251)",
            level2: "rgb(233, 239, 249)",
            level3: "rgb(225, 235, 246)",
            level4: "rgb(223, 233, 245)",
            level5: "rgb(218, 230, 244)",
          },
          surfaceDisabled: "rgba(26, 28, 30, 0.12)",
          onSurfaceDisabled: "rgba(26, 28, 30, 0.38)",
          backdrop: "rgba(45, 49, 56, 0.4)",
          green: "rgb(16, 109, 32)",
          onGreen: "rgb(255, 255, 255)",
          greenContainer: "rgb(157, 248, 152)",
          onGreenContainer: "rgb(0, 34, 4)",
          orange: "rgb(150, 73, 0)",
          onOrange: "rgb(255, 255, 255)",
          orangeContainer: "rgb(255, 220, 198)",
          onOrangeContainer: "rgb(49, 19, 0)",
          pink: "rgb(185, 12, 85)",
          onPink: "rgb(255, 255, 255)",
          pinkContainer: "rgb(255, 217, 223)",
          onPinkContainer: "rgb(63, 0, 24)",
        },
        fonts: configureFonts({ config: fontConfig }),
      }
}
