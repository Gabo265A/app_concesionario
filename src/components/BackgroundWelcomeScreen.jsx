import {useContext} from 'react';
import {ImageBackground, View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BottomBarContext from '../context/BottomBar/BottomBarContext';

const BackgroundWelcomeScreen = ({children}) => {
  const {isDrawerOpen} = useContext(BottomBarContext);
  return (
    <ScrollView>
      <ImageBackground
        style={isDrawerOpen ? {...styles.image, height: 870} : styles.image}
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/appconcesionario-66cd6.appspot.com/o/sources%2Fwelcome-screen.jpg?alt=media&token=1b8e56df-28e2-4305-9c58-539d9065c1d6',
        }}
      />
      <View style={styles.container}>{children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 815,
  },
  container: {
    position: 'absolute',
  },
});

export default BackgroundWelcomeScreen;
