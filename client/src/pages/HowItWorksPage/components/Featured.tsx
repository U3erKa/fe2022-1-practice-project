import { FEATURED } from 'constants/howItWorks';
import type { FC } from 'react';

export const Featured: FC = () => {
  const featuredLinks = FEATURED.map(({ src, alt, href }) => (
    <a key={alt} href={href}>
      <img src={src} alt={alt} />
    </a>
  ));

  return (
    <article>
      <h2>Featured In</h2>
      {featuredLinks}
    </article>
  );
};

export default Featured;
