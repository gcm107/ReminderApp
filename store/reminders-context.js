import { createContext, useReducer, useEffect } from 'react';
import { storeReminder, fetchReminders, updateReminder as updateReminderHttp, deleteReminder as deleteReminderHttp } from '../util/http';

export const RemindersContext = createContext({
  reminders: [],
  addReminder: ({ title, description, date, location }) => {},
  setReminders: (reminders) => {},
  deleteReminder: (id) => {},
  updateReminder: (id, { title, description, date, location }) => {},
});

function remindersReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      const updatableReminderIndex = state.findIndex(
        (reminder) => reminder.id === action.payload.id
      );
      const updatableReminder = state[updatableReminderIndex];
      const updatedItem = { ...updatableReminder, ...action.payload.data };
      const updatedReminders = [...state];
      updatedReminders[updatableReminderIndex] = updatedItem;
      return updatedReminders;
    case 'DELETE':
      return state.filter((reminder) => reminder.id !== action.payload);
    default:
      return state;
  }
}

function RemindersContextProvider({ children }) {
  const [remindersState, dispatch] = useReducer(remindersReducer, []);

  useEffect(() => {
    async function getReminders() {
      try {
        const reminders = await fetchReminders();
        dispatch({ type: 'SET', payload: reminders });
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    }
    getReminders();
  }, []);

  function setReminders(reminders) {
    dispatch({ type: 'SET', payload: reminders });
  }

  async function addReminder(reminderData) {
    try {
      const id = await storeReminder(reminderData);
      dispatch({ type: 'ADD', payload: { ...reminderData, id: id } });
    } catch (error) {
      console.error('Error storing reminder:', error);
    }
  }

  async function deleteReminder(id) {
    try {
      await deleteReminderHttp(id);
      dispatch({ type: 'DELETE', payload: id });
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  }

  async function updateReminder(id, reminderData) {
    try {
      await updateReminderHttp(id, reminderData);
      dispatch({ type: 'UPDATE', payload: { id: id, data: reminderData } });
    } catch (error) {
      console.error('Error updating reminder:', error);
    }
  }

  const value = {
    reminders: remindersState,
    addReminder: addReminder,
    setReminders: setReminders,
    deleteReminder: deleteReminder,
    updateReminder: updateReminder,
  };

  return (
    <RemindersContext.Provider value={value}>
      {children}
    </RemindersContext.Provider>
  );
}

export default RemindersContextProvider;

