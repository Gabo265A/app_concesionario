import React, {useState} from 'react';
import {Button, Dialog, Text} from 'react-native-paper';

const DialogAlert = ({alertMessage, changeVisibility}) => {
  const [visible, setVisible] = useState(true);

  return (
    <Dialog
      visible={visible}
      onDismiss={() => {
        setVisible(false);
        changeVisibility(false);
      }}>
      <Dialog.Title>Atención</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">{alertMessage}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button
          onPress={() => {
            setVisible(false);
            changeVisibility(false);
          }}>
          Entendido
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DialogAlert;
