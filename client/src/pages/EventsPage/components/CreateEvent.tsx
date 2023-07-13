import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import uniqueId from 'lodash/uniqueId';
import { newEventSchema } from 'utils/validators/validationSchems';
import { notifyOptions } from 'constants/general';
import { events } from './EventListItems';

export const initialValues = {
  name: '',
  date: '',
  notify: notifyOptions[0] as (typeof notifyOptions)[number],
};

export const onSubmit = (
  values: typeof initialValues,
  formikBag: FormikHelpers<typeof initialValues>,
) => {
  // @ts-ignore
  events.push(values);
  formikBag.resetForm();
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
  return (
    <Formik
      initialValues={initialValues}
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
