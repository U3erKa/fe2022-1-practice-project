'use client';

import { useEffect, useState } from 'react';
import { HEADER_ANIMATION_TEXT } from 'constants/general';
import styles from '../../app/styles/page.module.scss';

export default function Headline() {
  const [index, setIndex] = useState(0);
  const [styleName, setStyle] = useState(styles.headlineStatic);

  const text = HEADER_ANIMATION_TEXT[index % HEADER_ANIMATION_TEXT.length];

  useEffect(() => {
    const timeout = setInterval(() => {
      setIndex(index + 1);
      setStyle('');
    }, 3000);

    return () => {
      setStyle(styles.headlineStatic);
      clearInterval(timeout);
    };
  });

  return (
    <div className={styles.headline}>
      <span>Find the Perfect Name for</span>
      <span className={styleName}>{text}</span>
    </div>
  );
}
