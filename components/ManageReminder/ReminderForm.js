import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Input from './Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

function ReminderForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    title: {
      value: defaultValues ? defaultValues.title : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
    latitude: {
      value: defaultValues?.location?.lat ? defaultValues.location.lat.toString() : '',
      isValid: true,
    },
    longitude: {
      value: defaultValues?.location?.lng ? defaultValues.location.lng.toString() : '',
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const reminderData = {
      title: inputs.title.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    // Add location if both lat and lng are provided
    if (inputs.latitude.value.trim() && inputs.longitude.value.trim()) {
      reminderData.location = {
        lat: parseFloat(inputs.latitude.value),
        lng: parseFloat(inputs.longitude.value),
      };
    }

    const titleIsValid = reminderData.title.trim().length > 0;
    const dateIsValid = reminderData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = reminderData.description.trim().length > 0;
    
    // location is optional. 
    // must be valid lat and long if it is provided. 
    const latIsValid = !inputs.latitude.value.trim() || !isNaN(parseFloat(inputs.latitude.value));
    const lngIsValid = !inputs.longitude.value.trim() || !isNaN(parseFloat(inputs.longitude.value));

    if (!titleIsValid || !dateIsValid || !descriptionIsValid || !latIsValid || !lngIsValid) {
      setInputs((curInputs) => {
        return {
          title: { value: curInputs.title.value, isValid: titleIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
          latitude: { value: curInputs.latitude.value, isValid: latIsValid },
          longitude: { value: curInputs.longitude.value, isValid: lngIsValid },
        };
      });
      return;
    }

    onSubmit(reminderData);
  }

  const formIsInvalid =
    !inputs.title.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid ||
    !inputs.latitude.isValid ||
    !inputs.longitude.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Reminder</Text>
      <Input
        label="Title"
        invalid={!inputs.title.isValid}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, 'title'),
          value: inputs.title.value,
        }}
      />
      <Input
        label="Date"
        invalid={!inputs.date.isValid}
        textInputConfig={{
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          onChangeText: inputChangedHandler.bind(this, 'date'),
          value: inputs.date.value,
        }}
      />
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}
      />
      <Text style={styles.locationTitle}>Location (Optional)</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Latitude"
          invalid={!inputs.latitude.isValid}
          style={styles.rowInput}
          textInputConfig={{
            placeholder: '35.2226',
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'latitude'),
            value: inputs.latitude.value,
          }}
        />
        <Input
          label="Longitude"
          invalid={!inputs.longitude.isValid}
          style={styles.rowInput}
          textInputConfig={{
            placeholder: '-97.4395',
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'longitude'),
            value: inputs.longitude.value,
          }}
        />
      </View>
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
          </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ReminderForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary100,
    marginTop: 16,
    marginBottom: 8,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorText: {                                        
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

