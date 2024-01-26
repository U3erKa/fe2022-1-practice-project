import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'hooks';
import { FormInput } from 'components/input';
import { sendMessage } from 'store/slices/chatSlice';
import { type Message, MessageSchema } from 'utils/schemas';
import SendMessageIcon from 'assets/icons/send.png';
import styles from './styles/ChatInput.module.scss';

const classes = {
  container: styles.container,
  input: styles.input,
  notValid: styles.notValid,
};

const ChatInput = () => {
  const interlocutor = useSelector(({ chatStore }) => chatStore.interlocutor);
  const dispatch = useDispatch();

  const { handleSubmit, control, reset } = useForm({
    defaultValues: { message: '' },
    resolver: zodResolver(MessageSchema),
  });

  const onSubmit = (values: Message) => {
    dispatch(
      sendMessage({
        interlocutor,
        messageBody: values.message,
        recipient: interlocutor.id,
      }),
    );
    reset();
  };

  return (
    <div className={styles.inputContainer}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          autoComplete="off"
          classes={classes}
          control={control}
          name="message"
          placeholder="message"
        />
        <button type="submit">
          <Image alt="send Message" src={SendMessageIcon} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
