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

    displayMedium: {
      fontFamily: "ProductSans-Medium",
      fontSize: 40,
    },
  }

  return colorScheme === "dark"
    ? {
        ...MD3DarkTheme,
        colors: {
          // ...MD3DarkTheme.colors
          primary: "rgb(90, 213, 249)",
          onPrimary: "rgb(0, 53, 66)",
          primaryContainer: "rgb(0, 78, 95)",
          onPrimaryContainer: "rgb(180, 235, 255)",
          secondary: "rgb(179, 202, 212)",
          onSecondary: "rgb(29, 51, 59)",
          secondaryContainer: "rgb(52, 74, 82)",
          onSecondaryContainer: "rgb(206, 230, 240)",
          tertiary: "rgb(194, 196, 235)",
          onTertiary: "rgb(43, 46, 77)",
          tertiaryContainer: "rgb(65, 68, 101)",
          onTertiaryContainer: "rgb(224, 224, 255)",
          error: "rgb(255, 180, 171)",
          onError: "rgb(105, 0, 5)",
          errorContainer: "rgb(147, 0, 10)",
          onErrorContainer: "rgb(255, 180, 171)",
          background: "rgb(25, 28, 29)",
          onBackground: "rgb(225, 227, 228)",
          surface: "rgb(25, 28, 29)",
          onSurface: "rgb(225, 227, 228)",
          surfaceVariant: "rgb(64, 72, 75)",
          onSurfaceVariant: "rgb(191, 200, 204)",
          outline: "rgb(137, 146, 150)",
          outlineVariant: "rgb(64, 72, 75)",
          shadow: "rgb(0, 0, 0)",
          scrim: "rgb(0, 0, 0)",
          inverseSurface: "rgb(225, 227, 228)",
          inverseOnSurface: "rgb(46, 49, 50)",
          inversePrimary: "rgb(0, 103, 126)",
          elevation: {
            level0: "transparent",
            level1: "rgb(28, 37, 40)",
            level2: "rgb(30, 43, 47)",
            level3: "rgb(32, 48, 53)",
            level4: "rgb(33, 50, 55)",
            level5: "rgb(34, 54, 60)",
          },
          surfaceDisabled: "rgba(225, 227, 228, 0.12)",
          onSurfaceDisabled: "rgba(225, 227, 228, 0.38)",
          backdrop: "rgba(41, 50, 53, 0.4)",
        },
        fonts: configureFonts({ config: fontConfig }),
      }
    : {
        ...MD3LightTheme,
        colors: {
          // ...MD3LightTheme.colors
          primary: "rgb(0, 103, 126)",
          onPrimary: "rgb(255, 255, 255)",
          primaryContainer: "rgb(180, 235, 255)",
          onPrimaryContainer: "rgb(0, 31, 39)",
          secondary: "rgb(76, 98, 106)",
          onSecondary: "rgb(255, 255, 255)",
          secondaryContainer: "rgb(206, 230, 240)",
          onSecondaryContainer: "rgb(7, 30, 37)",
          tertiary: "rgb(89, 92, 126)",
          onTertiary: "rgb(255, 255, 255)",
          tertiaryContainer: "rgb(224, 224, 255)",
          onTertiaryContainer: "rgb(22, 25, 55)",
          error: "rgb(186, 26, 26)",
          onError: "rgb(255, 255, 255)",
          errorContainer: "rgb(255, 218, 214)",
          onErrorContainer: "rgb(65, 0, 2)",
          background: "rgb(251, 252, 254)",
          onBackground: "rgb(25, 28, 29)",
          surface: "rgb(251, 252, 254)",
          onSurface: "rgb(25, 28, 29)",
          surfaceVariant: "rgb(219, 228, 232)",
          onSurfaceVariant: "rgb(64, 72, 75)",
          outline: "rgb(112, 120, 124)",
          outlineVariant: "rgb(191, 200, 204)",
          shadow: "rgb(0, 0, 0)",
          scrim: "rgb(0, 0, 0)",
          inverseSurface: "rgb(46, 49, 50)",
          inverseOnSurface: "rgb(239, 241, 242)",
          inversePrimary: "rgb(90, 213, 249)",
          elevation: {
            level0: "transparent",
            level1: "rgb(238, 245, 248)",
            level2: "rgb(231, 240, 244)",
            level3: "rgb(223, 236, 240)",
            level4: "rgb(221, 234, 239)",
            level5: "rgb(216, 231, 236)",
          },
          surfaceDisabled: "rgba(25, 28, 29, 0.12)",
          onSurfaceDisabled: "rgba(25, 28, 29, 0.38)",
          backdrop: "rgba(41, 50, 53, 0.4)",
        },
        fonts: configureFonts({ config: fontConfig }),
      }
}
