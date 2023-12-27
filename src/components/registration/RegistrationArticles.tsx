import { type FC, Fragment } from 'react';
import { TextEntry } from 'components/general';
import type { TextEntry as TextEntryT } from 'types/general';
import styles from './styles/RegistrationArticles.module.scss';

export type Props = {
  readonly articles: Article[];
};

export type Article = {
  id: number;
  header: string;
  article: string | TextEntryT;
};

const RegistrationArticles: FC<Props> = ({ articles }) => {
  return (
    <div className={styles.columnContainer}>
      {articles.map(({ id, header, article }) => (
        <Fragment key={id}>
          <div className={styles.headerArticle}>{header}</div>
          {Array.isArray(article) ? (
            <div className={styles.article}>
              <TextEntry text={article} />
            </div>
          ) : (
            <div className={styles.article}>{article as string}</div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default RegistrationArticles;
