import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import * as Notifications from 'expo-notifications';

import ReminderForm from '../components/ManageReminder/ReminderForm';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { RemindersContext } from '../store/reminders-context';

function ManageReminder({ route, navigation }) {
  const remindersCtx = useContext(RemindersContext);

  const editedReminderId = route.params?.reminderId;
  const isEditing = !!editedReminderId;

  const selectedReminder = remindersCtx.reminders.find(       
    (reminder) => reminder.id === editedReminderId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Reminder' : 'Add Reminder',
    });
  }, [navigation, isEditing]);

  function deleteReminderHandler() {
    remindersCtx.deleteReminder(editedReminderId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(reminderData) {
    if (isEditing) {
      remindersCtx.updateReminder(editedReminderId, reminderData);

      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Reminder Updated!',
          body: `${reminderData.title}`,
        },
        trigger: {
          seconds: 1
        },
      });
    } else {
      remindersCtx.addReminder(reminderData);

      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Reminder Added!',
          body: `${reminderData.title}`,
        },
        trigger: {
          seconds: 1
        },
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ReminderForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedReminder}    
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteReminderHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageReminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});

