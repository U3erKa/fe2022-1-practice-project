import { type FC, type HTMLInputTypeAttribute } from 'react';
import { type FieldInputProps } from 'formik';
import styles from './styles/RoleInput.module.sass';

export type Props = {
  id: string;
  strRole: string;
  infoRole: string;
  field: FieldInputProps<string>;
  type: HTMLInputTypeAttribute;
};

const RoleInput: FC<Props> = ({ id, strRole, infoRole, field, type }) => (
  <label htmlFor={id}>
    <div className={styles.roleContainer}>
      <input {...field} type={type} id={id} />
      <div className={styles.infoRoleContainer}>
        <span className={styles.role}>{strRole}</span>
        <span className={styles.infoRole}>{infoRole}</span>
      </div>
    </div>
  </label>
);

export default RoleInput;
