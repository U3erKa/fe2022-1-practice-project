import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'store';
import { createEvent } from 'store/slices/eventSlice';
import { FormInput, SelectInput } from 'components/input';
import {
  type NewEvent,
  NewEventSchema,
  type Notify,
} from 'utils/schemas';
import { NOTIFY_OPTIONS } from 'constants/general';
import type { useForceUpdate } from 'hooks';
import styles from './styles/CreateEvent.module.scss';

export const defaultValues = {
  name: '',
  date: '',
  notify: NOTIFY_OPTIONS[0] as Notify,
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
    resolver: zodResolver(NewEventSchema),
  });

  const onSubmit = (values: NewEvent) => {
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
        optionsArray={NOTIFY_OPTIONS}
        classes={selectInputClasses}
      />
      <button type="submit" className={styles.submit}>
        Create event
      </button>
    </form>
  );
}
