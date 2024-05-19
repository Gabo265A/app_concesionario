import react from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Avatar, Button, Card, Text} from 'react-native-paper';

const Vehicle = ({imageUrl, description, price, name, iconCar}: any) => {
  const LeftContent = (props: any) => <Avatar.Icon {...props} icon={iconCar} />; // Icono del vehículo

  return (
    <ScrollView style={styles.container}>
      <View style={{margin: 10}}>
        <Card style={styles.card}>
          <Card.Title title={name} subtitle={'$' + price} left={LeftContent} />
          <Card.Content>
            <Text variant="bodyMedium">{description}</Text>
          </Card.Content>
          <Card.Cover
            source={{uri: imageUrl}}
            style={{width: '95%', marginLeft: '2.5%', marginTop: '2.5%'}}
          />
          <Card.Actions>
            <Button mode="contained">Más información</Button>
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 5,
  },
});

export default Vehicle;
