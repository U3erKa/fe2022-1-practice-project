import styles from './styles/RoleInput.module.sass';

const RoleInput = ({ id, strRole, infoRole, field, type }) => (
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
