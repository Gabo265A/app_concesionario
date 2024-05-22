import react from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Avatar, Button, Card, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

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
            <Button mode="contained">
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Icon
                  name="information-circle-outline"
                  size={20}
                  color="white"
                  style={{marginRight: 5, top: 1}}
                />
                <Text style={{color: 'white'}}>Ver más detalles</Text>
              </View>
            </Button>
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
