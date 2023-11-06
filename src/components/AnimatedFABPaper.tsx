import { AnimatedFAB } from 'react-native-paper';

type AnimatedFABPaperProps = {
    icon: string
    label: string
    extended: boolean
    onPress: () => void
    visible?: boolean
    customStyle?: {}
    iconMode?: "dynamic" | "static"
    animateFrom?: "left" | "right"
}

export default function AnimatedFABPaper({
    icon,
    label,
    onPress,
    extended,
    visible, 
    animateFrom,
    iconMode,
    customStyle
}: AnimatedFABPaperProps) {
    return (
        <AnimatedFAB
            icon={icon}
            label={label}
            extended={extended}
            onPress={onPress}
            visible={visible}
            animateFrom={animateFrom}
            iconMode={iconMode}
            style={customStyle}
        />
    )
}

