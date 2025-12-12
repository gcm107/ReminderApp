import { useContext } from 'react';

import RemindersOutput from '../components/RemindersOutput/RemindersOutput';
import { RemindersContext } from '../store/reminders-context';
import { getDatePlusDays } from '../util/date';

function RecentReminders() {
  const remindersCtx = useContext(RemindersContext);

  const recentReminders = remindersCtx.reminders.filter((reminder) => {
    const today = new Date();
    const date7DaysFromNow = getDatePlusDays(today, 7);

    return reminder.date >= today && reminder.date <= date7DaysFromNow;
  });

  return (
    <RemindersOutput
      reminders={recentReminders}
      remindersPeriod="Next 7 Days"
      fallbackText="No reminders scheduled for the next 7 days."
    />
  );
}

export default RecentReminders;

