import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import uniqueId from 'lodash/uniqueId';
import { useDispatch } from 'hooks';
import { createEvent } from 'store/slices/eventSlice';
import { newEventSchema } from 'utils/validators/validationSchems';
import { notifyOptions } from 'constants/general';
import type { Event } from 'types/api/event';
import { useDispatch } from 'hooks';

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
      <Form>
        <label>
          Name of event:
          <Field name="name" />
          <ErrorMessage name="name" />
        </label>
        <label>
          Date & time of the event:
          <Field name="date" type="datetime-local" />
          <ErrorMessage name="date" />
        </label>
        <label>
          When to remind me about the event:
          <Field name="notify" as="select">
            <NotifyEventField />
          </Field>
          <ErrorMessage name="notify" />
        </label>
        <button type="submit">Create event</button>
      </Form>
    </Formik>
  );
}
