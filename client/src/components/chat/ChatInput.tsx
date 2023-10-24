import { Form, Formik, type FormikHelpers } from 'formik';
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

  const submitHandler = (
    values: InferType<typeof MessageSchema>,
    { resetForm }: FormikHelpers<InferType<typeof MessageSchema>>,
  ) => {
    dispatch(
      sendMessage({
        messageBody: values.message,
        recipient: interlocutor!.id,
        // @ts-expect-error
        interlocutor,
      }),
    );
    resetForm();
  };

  return (
    <div className={styles.inputContainer}>
      <Formik
        onSubmit={submitHandler}
        initialValues={{ message: '' }}
        validationSchema={MessageSchema}
      >
        <Form className={styles.form}>
          <FormInput
            name="message"
            type="text"
            label="message"
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
        </Form>
      </Formik>
    </div>
  );
};

export default ChatInput;
