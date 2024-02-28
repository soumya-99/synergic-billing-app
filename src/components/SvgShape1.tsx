import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"
const SvgShape1 = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
        <Defs>
            <LinearGradient id="a" x1={0} x2={1} y1={1} y2={0}>
                <Stop offset="0%" stopColor="rgba(55, 133.589, 248, 1)" />
                <Stop offset="100%" stopColor="rgba(19.077, 95.705, 224.335, 1)" />
            </LinearGradient>
        </Defs>
        <Path
            fill="url(#a)"
            d="M17.6 10.7c-5.7 9.4-28.8 9.3-34.7-.2C-22.9 1-11.4-17.8.1-17.8c11.6.1 23.2 19 17.5 28.5Z"
            transform="translate(50 50)"
        />
    </Svg>
)
export default SvgShape1
