import { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { RemindersContext } from '../store/reminders-context';
import { GlobalStyles } from '../constants/styles';

function Map() {
  const remindersCtx = useContext(RemindersContext);

  // trying to filter reminders that have location data
  const remindersWithLocation = remindersCtx.reminders.filter(
    (reminder) => reminder.location && reminder.location.lat && reminder.location.lng
  );

  //like in our assignment i am uising Norman OK as default if no reminders with location
  const region = remindersWithLocation.length > 0
    ? {
        latitude: remindersWithLocation[0].location.lat,
        longitude: remindersWithLocation[0].location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : {
        latitude: 35.2226,  // Norman, OK (OU campus)
        longitude: -97.4395,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reminder Locations</Text>
      {remindersWithLocation.length === 0 ? (
        <View style={styles.noLocationContainer}>
          <Text style={styles.noLocationText}>
            No reminders with locations yet. Add a location to your reminders to see them on the map!
          </Text>
        </View>
      ) : (
        <MapView style={styles.map} initialRegion={region}>
          {remindersWithLocation.map((reminder) => (
            <Marker
              key={reminder.id}
              title={reminder.title}
              description={reminder.description}
              coordinate={{
                latitude: reminder.location.lat,
                longitude: reminder.location.lng,
              }}
              pinColor={GlobalStyles.colors.primary500}
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 16,
    backgroundColor: GlobalStyles.colors.primary500,
    color: GlobalStyles.colors.primary50,
  },
  map: {
    flex: 1,
  },
  noLocationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 24,
  },
  noLocationText: {
    fontSize: 16,
    color: GlobalStyles.colors.primary50,
    textAlign: 'center',
  },
});

