import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';

function ReminderItem({ id, title, description, date }) {
  const navigation = useNavigation();

  function reminderPressHandler() {
    navigation.navigate('ManageReminder', {
      reminderId: id
    });
  }

  return (
    <Pressable
      onPress={reminderPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.reminderItem}>
        <Image 
          source={require('../../assets/icon.png')} 
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.textBase, styles.title]}>
            {title}
          </Text>
          <Text style={styles.textBase}>{description}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ReminderItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  reminderItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  icon: {
    width: 40,
    height: 40,
  },
});

