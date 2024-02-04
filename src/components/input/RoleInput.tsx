import type {
  ComponentPropsWithoutRef,
  FC,
  HTMLInputTypeAttribute,
} from 'react';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';
import styles from './styles/RoleInput.module.scss';

export type Props<T extends FieldValues> = ComponentPropsWithoutRef<'input'> &
  Pick<UseControllerProps<T>, 'control' | 'name'> & {
    readonly strRole: string;
    readonly infoRole: string;
    readonly type: HTMLInputTypeAttribute;
  };

const RoleInput = <T extends FieldValues>({
  name,
  control,
  strRole,
  infoRole,
  ...props
}: Props<T>) => {
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
