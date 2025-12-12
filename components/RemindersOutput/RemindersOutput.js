import { StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '../../constants/styles';
import RemindersList from './RemindersList';
import RemindersSummary from './RemindersSummary';

function RemindersOutput({ reminders, remindersPeriod, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (reminders.length > 0) {
    content = <RemindersList reminders={reminders} />;
  }

  return (
    <View style={styles.container}>
      <RemindersSummary reminders={reminders} periodName={remindersPeriod} />
      {content}
    </View>
  );
}

export default RemindersOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});

