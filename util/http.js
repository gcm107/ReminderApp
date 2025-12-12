// basically same code from assignment 6, so i am using the same backend_url
import axios from "axios";

const BACKEND_URL = 
        'https://assignment6-9919d-default-rtdb.firebaseio.com';

export async function storeReminder(reminderData) {
      // Serialize the date to ISO string for Firebase
      const serializedData = {
        ...reminderData,
        date: reminderData.date instanceof Date ? reminderData.date.toISOString() : reminderData.date
      };
      const response = await axios.post(BACKEND_URL + '/reminders.json', serializedData);
      const id = response.data.name;
      return id;
}
        
export async function fetchReminders() {
          const response = await axios.get(BACKEND_URL + '/reminders.json');
        
          const reminders = [];
        
          for (const key in response.data) {
            const reminderObj = {
              id: key,
              title: response.data[key].title,
              date: new Date(response.data[key].date),
              description: response.data[key].description,
              location: response.data[key].location || null
            };
            reminders.push(reminderObj);
          }
        
          return reminders;
  }
        
export function updateReminder(id, reminderData) {
          // fixing date for firebase
          const serializedData = {
            ...reminderData,
            date: reminderData.date instanceof Date ? reminderData.date.toISOString() : reminderData.date
          };
          return axios.put(BACKEND_URL + `/reminders/${id}.json`, serializedData);
}
        
export function deleteReminder(id) {
          return axios.delete(BACKEND_URL + `/reminders/${id}.json`);
}

