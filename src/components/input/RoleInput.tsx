import type { ComponentProps, FC, HTMLInputTypeAttribute } from 'react';
import { type Control, useController } from 'react-hook-form';
import styles from './styles/RoleInput.module.scss';

export type Props = ComponentProps<'input'> & {
  readonly strRole: string;
  readonly infoRole: string;
  readonly type: HTMLInputTypeAttribute;
  readonly control: Control<any>;
  readonly name: string;
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
