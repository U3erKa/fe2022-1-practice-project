import { FC, Fragment } from 'react';

import { TextEntry } from 'components/general';
import styles from '../styles/RegistrationArticles.module.sass';

import type { TextEntry as TextEntryT } from 'types/general';

export type Props = {
  articles: Article[];
};

export type Article = {
  id: number;
  header: string;
  article: string | TextEntryT;
};

const RegistrationArticles: FC<Props> = ({ articles }) => {
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
