import {
  type DetailedHTMLProps,
  type FC,
  type HTMLInputTypeAttribute,
  type InputHTMLAttributes,
} from 'react';
import { type Control, useController } from 'react-hook-form';
import styles from './styles/RoleInput.module.sass';

export type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  strRole: string;
  infoRole: string;
  type: HTMLInputTypeAttribute;
  control: Control<any>;
  name: string;
};

const RoleInput: FC<Props> = function RoleInput({
  name,
  control,
  strRole,
  infoRole,
  ...props
}) {
  const { field } = useController({ name, control });
  const { value } = field;

  return (
    <label htmlFor={value}>
      <div className={styles.roleContainer}>
        <input id={value} {...field} {...props} />
        <div className={styles.infoRoleContainer}>
          <span className={styles.role}>{strRole}</span>
          <span className={styles.infoRole}>{infoRole}</span>
        </div>
      </div>
    </label>
  );
};

export default RoleInput;
