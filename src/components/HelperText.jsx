import React from 'react'
import { HelperText } from 'react-native-paper'

const Helper = (props) => {
    const { type, isVisible, text } = props
    return (
        <>
            <HelperText type={type} visible={isVisible}>
                {text}
            </HelperText>
        </>
    )
}

export default Helper
