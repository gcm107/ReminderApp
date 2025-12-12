import { useContext } from 'react';

import RemindersOutput from '../components/RemindersOutput/RemindersOutput';
import { RemindersContext } from '../store/reminders-context';

function AllReminders() {
  const remindersCtx = useContext(RemindersContext);

  return (
    <RemindersOutput
      reminders={remindersCtx.reminders}
      remindersPeriod="Total"
      fallbackText="No registered reminders found!"
    />
  );
}

export default AllReminders;

