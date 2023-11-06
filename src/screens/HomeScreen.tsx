import {
  StyleSheet,
  ScrollView,
  // Text,
  SafeAreaView,
} from 'react-native'
import { useState } from 'react'
import AnimatedFABPaper from '../components/AnimatedFABPaper';
import { Dialog, Portal, Text, Button } from 'react-native-paper';
import InputPaper from '../components/InputPaper';
import { usePaperColorScheme } from '../theme/theme';

export default function HomeScreen() {
  const theme = usePaperColorScheme()
  const [isExtended, setIsExtended] = useState(() => true);

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);

  const [text, setText] = useState("")

  return (
    <SafeAreaView style={styles.container}>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} theme={theme}>
          <Dialog.Icon icon="account-circle" size={50} />
          <Dialog.Title style={styles.title}>Customer Details</Dialog.Title>
          <Dialog.Content>
            <InputPaper label='Mobile Number' onChangeText={setText} value={text} keyboardType='numeric' />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(!visible)} textColor={theme.colors.error}>CANCEL</Button>
            <Button onPress={() => {console.log('OK NUMBER: ', text); setText("")}}>NEXT</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ScrollView onScroll={onScroll}>
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

  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});