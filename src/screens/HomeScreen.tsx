import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from 'react-native'
import { useState } from 'react'
import AnimatedFABPaper from '../components/AnimatedFABPaper';
import { Surface, Text } from 'react-native-paper';
import InputPaper from '../components/InputPaper';
import DialogBox from '../components/DialogBox';

export default function HomeScreen() {
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
        <InputPaper label='Mobile Number' onChangeText={setNum} value={num} keyboardType='numeric' />
      </DialogBox>
      <ScrollView onScroll={onScroll}>

        <ImageBackground imageStyle={{ borderRadius: 30 }}
          blurRadius={10} source={require("../resources/images/hills.jpg")} style={styles.surface}>
          <Text variant="displaySmall" style={{ fontFamily: "ProductSans-Medium", textAlign: "center" }}>Welcome Back, Admin!</Text>
        </ImageBackground>

        <Surface style={styles.surface} elevation={2}>
          <Text variant="headlineSmall" style={{ fontFamily: "ProductSans-Medium", textAlign: "center" }}>Mobile No. {num}</Text>
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
    fontFamily: "ProductSans-Medium",
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

  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});