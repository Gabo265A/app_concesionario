import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

const UserProfile = () => {
  return (
    <View style={styles.container}>
      <Text>Perfil del Usuario</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default UserProfile;
