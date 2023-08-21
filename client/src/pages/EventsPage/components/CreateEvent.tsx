import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import uniqueId from 'lodash/uniqueId';
import { useDispatch } from 'hooks';
import { createEvent } from 'store/slices/eventSlice';
import { newEventSchema } from 'utils/validators/validationSchems';
import { notifyOptions } from 'constants/general';
import type { Event } from 'types/api/event';
import styles from '../styles/CreateEvent.module.sass';

export const initialValues = {
  name: '',
  date: '',
  notify: notifyOptions[0] as (typeof notifyOptions)[number],
};

function NotifyEventField() {
  const options = notifyOptions.map((option) => (
    <option key={uniqueId('notify')} value={option}>
      {option}
    </option>
  ));
  return <>{options}</>;
}

export default function CreateEvent() {
  const dispatch = useDispatch();

  const onSubmit = (values: Event, formikBag: FormikHelpers<Event>) => {
    dispatch(createEvent(values));
    formikBag.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues as any}
      validationSchema={newEventSchema}
      onSubmit={onSubmit}
    >
      <Form className={styles.container}>
        <h2 className={styles.heading}>Create new event:</h2>
        <label className={styles.inputContainer}>
          <p className={styles.text}>Name of event:</p>
          <Field className={styles.input} name="name" />
          <ErrorMessage name="name" />
        </label>
        <label className={styles.inputContainer}>
          <p className={styles.text}>Date & time of the event:</p>
          <Field className={styles.input} name="date" type="datetime-local" />
          <ErrorMessage name="date" />
        </label>
        <label className={styles.inputContainer}>
          <p className={styles.text}>When to remind me about the event:</p>
          <Field className={styles.input} name="notify" as="select">
            <NotifyEventField />
          </Field>
          <ErrorMessage name="notify" />
        </label>
        <button type="submit" className={styles.submit}>
          Create event
        </button>
      </Form>
    </Formik>
  );
}
