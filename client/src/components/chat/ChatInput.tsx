import { Form, Formik } from 'formik';

import { useDispatch, useSelector } from 'hooks';
import { sendMessage } from 'store/slices/chatSlice';
import { FormInput } from 'components/input';

import { MessageSchema } from 'utils/validators/validationSchems';
import { STATIC_IMAGES_PATH } from 'constants/general';
import styles from './styles/ChatInput.module.sass';

const ChatInput = () => {
  const interlocutor = useSelector(({ chatStore }) => chatStore.interlocutor);
  const dispatch = useDispatch();

  const submitHandler = (values, { resetForm }) => {
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
            classes={{
              container: styles.container,
              input: styles.input,
              notValid: styles.notValid,
            }}
          />
          <button type="submit">
            <img src={`${STATIC_IMAGES_PATH}send.png`} alt="send Message" />
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChatInput;
