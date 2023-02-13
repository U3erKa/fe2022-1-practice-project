import { Fragment } from 'react';

import { TextEntry } from 'components';
import styles from '../styles/RegistrationArticles.module.sass';

/**
 * @typedef {object} Article
 * @property {string | import('components/TextEntry/TextEntry').TextEntryList} article
 * @property {number} id
 * @property {string} header
 */
/** @type {import('react').FC<{articles: Article[]}>} */
const RegistrationArticles = ({ articles }) => {
  return (
    <div className={styles.ColumnContainer}>
      {articles.map(({ id, header, article }) => (
        <Fragment key={id}>
          <div className={styles.headerArticle}>{header}</div>
          {Array.isArray(article) ? (
            <div className={styles.article}>
              <TextEntry text={article} />
            </div>
          ) : (
            <div className={styles.article}>{article}</div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default RegistrationArticles;
