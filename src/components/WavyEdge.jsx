// WavyEdge.js
import React from "react"
import { View, StyleSheet } from "react-native"
import Svg, { Path } from "react-native-svg"

const WavyEdge = () => {
  return (
    <View style={styles.container}>
      <Svg height="60%" width="100%" viewBox="0 0 1440 320" style={styles.svg}>
        <Path
          fill="#000" // Set the color you want
          d="M0,96L48,90.7C96,85,192,75,288,101.3C384,128,480,192,576,186.7C672,181,768,107,864,85.3C960,64,1056,96,1152,122.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
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
