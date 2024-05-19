import React from 'react';
import {HelperText} from 'react-native-paper';

const Helper = props => {
  const {type, isVisible, text, onAccept} = props;
  return (
    <>
      <HelperText
        type={type}
        visible={isVisible}
        style={{alignSelf: 'flex-end'}}>
        {text}
      </HelperText>
    </>
  );
};

export default Helper;
