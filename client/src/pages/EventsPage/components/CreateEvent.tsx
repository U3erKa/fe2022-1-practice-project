import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { InferType } from 'yup';
import { useDispatch } from 'hooks';
import { createEvent } from 'store/slices/eventSlice';
import { FormInput, SelectInput } from 'components/input';
import { newEventSchema } from 'utils/validators/validationSchems';
import { notifyOptions } from 'constants/general';
import type { useForceUpdate } from 'hooks';
import styles from '../styles/CreateEvent.module.sass';

export const defaultValues = {
  name: '',
  date: '',
  notify: notifyOptions[0] as (typeof notifyOptions)[number],
};

export type Props = {
  forceUpdate: ReturnType<typeof useForceUpdate>;
};

const selectInputClasses = {
  inputContainer: styles.inputContainer,
  selectInput: styles.input,
  inputHeader: styles.text,
};

const formInputClasses = {
  container: styles.inputContainer,
  input: styles.input,
  label: styles.text,
};

export default function CreateEvent({ forceUpdate }: Props) {
  const dispatch = useDispatch();
  const { handleSubmit, control, reset } = useForm({
    defaultValues,
    resolver: yupResolver(newEventSchema),
  });

  const onSubmit = (values: InferType<typeof newEventSchema>) => {
    dispatch(createEvent(values));
    reset();
    forceUpdate();
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.heading}>Create new event:</h2>
      <FormInput
        name="name"
        control={control}
        label="Name of event:"
        classes={formInputClasses}
      />
      <FormInput
        name="date"
        control={control}
        label="Date & time of the event:"
        type="datetime-local"
        classes={formInputClasses}
      />
      <SelectInput
        name="notify"
        control={control}
        header="When to remind me about the event:"
        optionsArray={notifyOptions}
        classes={selectInputClasses}
      />
      <button type="submit" className={styles.submit}>
        Create event
      </button>
    </form>
  );
}
