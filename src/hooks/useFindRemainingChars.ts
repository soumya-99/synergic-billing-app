import { View, Text } from 'react-native'
import React, { useState } from 'react'

export default function useFindRemainingChars() {
    const getRemainingChars = (charLength: number) => {
        const [remainingChars, setRemainingChars] = useState<number>(() => 0)
        
        setRemainingChars(25 - charLength)
        return remainingChars
    }

    return {
        getRemainingChars
    }
}