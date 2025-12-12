import { FlatList } from 'react-native';

import ReminderItem from './ReminderItem';

function renderReminderItem(itemData) {
  return <ReminderItem {...itemData.item} />;
}

function RemindersList({ reminders }) {
  return (
    <FlatList
      data={reminders}
      renderItem={renderReminderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default RemindersList;

