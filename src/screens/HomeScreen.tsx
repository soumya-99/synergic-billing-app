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
import DialogBox from '../components/DialogBox';

export default function HomeScreen() {
  const theme = usePaperColorScheme()
  const [isExtended, setIsExtended] = useState(() => true);

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const [visible, setVisible] = useState(() => false);
  const hideDialog = () => setVisible(() => false);
  const [text, setText] = useState(() => "")

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
        onSuccess={() => { console.log('OK NUMBER: ', text); setText("") }}
      >
        <InputPaper label='Mobile Number' onChangeText={setText} value={text} keyboardType='numeric' />
      </DialogBox>

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