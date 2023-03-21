import { uniqueId } from 'lodash';
import { HOW_IT_WORKS_PATH } from 'constants/general';
import { HOW_CONTESTS_WORK } from 'constants/howItWorks';
import type { FC } from 'react';

export const HowContestsWork: FC = () => {
  const howContestsWork = HOW_CONTESTS_WORK.map((listEntry) => (
    <li key={uniqueId()}>
      <p>{listEntry}</p>
    </li>
  ));

  return (
    <article>
      <section>
        <figure>
          <img src={`${HOW_IT_WORKS_PATH}howContestsWork1.svg`} alt="icon" />
        </figure>
        <h2>How Do Naming Contests Work?</h2>
      </section>
      <figure>
        <img
          src={`${HOW_IT_WORKS_PATH}howContestsWork2.svg`}
          alt="how contests work icon"
        />
      </figure>
      <section>
        <ol>{howContestsWork}</ol>
      </section>
    </article>
  );
};

export default HowContestsWork;
