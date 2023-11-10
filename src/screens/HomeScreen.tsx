import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  useColorScheme,
  View,
} from 'react-native'
import { useState } from 'react'
import AnimatedFABPaper from '../components/AnimatedFABPaper';
import { Divider, Surface, Text } from 'react-native-paper';
import InputPaper from '../components/InputPaper';
import DialogBox from '../components/DialogBox';
import { usePaperColorScheme } from '../theme/theme';

export default function HomeScreen() {
  const colorScheme = useColorScheme()
  const theme = usePaperColorScheme()
  const [isExtended, setIsExtended] = useState(() => true);

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const [visible, setVisible] = useState(() => false);
  const hideDialog = () => setVisible(() => false);
  const [num, setNum] = useState(() => "")

  return (
    <SafeAreaView style={styles.container}>
      <DialogBox
        title="Customer Details"
        icon="account-circle"
        iconSize={50}
        visible={visible}
        hide={hideDialog}
        titleStyle={styles.title}
        onFailure={() => setVisible(!visible)}
        onSuccess={() => { console.log('OK NUMBER: ', num); setVisible(!visible) }}
      >
        <InputPaper leftIcon='phone-outline' label='Mobile Number' onChangeText={setNum} value={num} keyboardType='numeric' />
      </DialogBox>
      <ScrollView onScroll={onScroll}>
        <ImageBackground imageStyle={{ borderRadius: 30 }}
          blurRadius={10} source={colorScheme !== "dark" ? require("../resources/images/hills.jpg") : require("../resources/images/hills-dark.jpg")} style={styles.surface}>
          <Text variant="displaySmall" style={{ fontFamily: "ProductSans-Medium", textAlign: "center" }}>Welcome Back, Soumyadeep!</Text>
        </ImageBackground>

        <Surface style={styles.bill} elevation={2}>
          <Text variant="headlineSmall" style={{ fontFamily: "ProductSans-Medium", textAlign: "center", marginBottom: 5 }}>Summary</Text>

          <View style={{
            width: Dimensions.get("window").width - 60,
            borderStyle: "dashed",
            borderWidth: 1,
            marginBottom: 5,
            borderColor: theme.colors.primary
          }}>
          </View>

          <View>
            {[...new Array(5).keys()].map((_, i) => (
              <Text key={i}>{i}</Text>
            ))}
          </View>

        </Surface>

        {[...new Array(100).keys()].map((_, i) => (
          <Text key={i}>{i}</Text>
        ))}
      </ScrollView>
      <AnimatedFABPaper
        icon='plus'
        label='Generate Receipt'
        onPress={() => setVisible(!visible)}
        extended={isExtended}
        animateFrom='right'
        iconMode='dynamic'
        customStyle={styles.fabStyle}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  title: {
    textAlign: 'center',
  },

  surface: {
    margin: 20,
    height: Dimensions.get("window").height - 550,
    borderRadius: 30,
    width: Dimensions.get("window").width - 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bill: {
    margin: 20,
    padding: 10,
    minHeight: Dimensions.get("window").height - 550,
    height: "auto",
    maxHeight: "auto",
    borderRadius: 30,
    width: Dimensions.get("window").width - 40,
    alignItems: 'center',
  },

  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});