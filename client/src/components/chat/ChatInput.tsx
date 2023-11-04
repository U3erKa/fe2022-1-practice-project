import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { InferType } from 'yup';
import { useDispatch, useSelector } from 'hooks';
import { sendMessage } from 'store/slices/chatSlice';
import { FormInput } from 'components/input';
import { Picture } from 'components/general';
import { MessageSchema } from 'utils/validators/validationSchems';
import { STATIC_IMAGES_PATH } from 'constants/general';
import styles from './styles/ChatInput.module.sass';

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
    resolver: yupResolver(MessageSchema),
  });

  const onSubmit = (values: InferType<typeof MessageSchema>) => {
    dispatch(
      sendMessage({
        messageBody: values.message,
        recipient: interlocutor!.id,
        // @ts-expect-error
        interlocutor,
      }),
    );
    reset();
  };

  return (
    <div className={styles.inputContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FormInput
          name="message"
          control={control}
          placeholder="message"
          autoComplete="off"
          classes={classes}
        />
        <button type="submit">
          <Picture
            srcSet={[
              `${STATIC_IMAGES_PATH}send.avif`,
              `${STATIC_IMAGES_PATH}send.webp`,
            ]}
            src={`${STATIC_IMAGES_PATH}send.png`}
            alt="send Message"
          />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
