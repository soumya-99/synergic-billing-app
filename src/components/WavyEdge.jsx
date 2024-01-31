import React from "react"
import { View, StyleSheet } from "react-native"
import Svg, { Path } from "react-native-svg"

const WavyEdge = () => {
  return (
    <View style={styles.container}>
      <Svg height="60%" width="100%" viewBox="0 0 1440 320" style={styles.svg}>
        <Path
          fill="#fff" // Set the color you want
          d="M0,64L48,85.3C96,107,192,149,288,149.3C384,149,480,107,576,96C672,85,768,107,864,133.3C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  svg: {
    position: "absolute",
    bottom: 0,
  },
})

export default WavyEdge
