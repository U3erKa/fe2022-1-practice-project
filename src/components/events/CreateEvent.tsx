import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch, type useForceUpdate } from 'hooks';
import { FormInput, SelectInput } from 'components/input';
import { NOTIFY_OPTIONS } from 'constants/general';
import { createEvent } from 'store/slices/eventSlice';
import { NewEventSchema, type NewEvent, type Notify } from 'utils/schemas';
import styles from './styles/CreateEvent.module.scss';

export const defaultValues = {
  date: '',
  name: '',
  notify: NOTIFY_OPTIONS[0] as Notify,
};

export type Props = {
  readonly forceUpdate: ReturnType<typeof useForceUpdate>;
};

const selectInputClasses = {
  inputContainer: styles.inputContainer,
  inputHeader: styles.text,
  selectInput: styles.input,
};

const formInputClasses = {
  container: styles.inputContainer,
  input: styles.input,
  label: styles.text,
};

const CreateEvent = ({ forceUpdate }: Props) => {
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
        classes={formInputClasses}
        control={control}
        label="Name of event:"
        name="name"
      />
      <FormInput
        classes={formInputClasses}
        control={control}
        label="Date & time of the event:"
        name="date"
        type="datetime-local"
      />
      <SelectInput
        classes={selectInputClasses}
        control={control}
        header="When to remind me about the event:"
        name="notify"
        optionsArray={NOTIFY_OPTIONS}
      />
      <button className={styles.button} type="submit">
        Create event
      </button>
    </form>
  );
};

export default CreateEvent;
