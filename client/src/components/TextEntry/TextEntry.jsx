import { Fragment } from 'react';

/**
 * @typedef {TextEntry[]} TextEntryList
 * @typedef {object} TextEntry
 * @property {string | number} id
 * @property {'plain' | 'link' | 'span'} type
 * @property {string} text
 * @property {string?} [href]
 * @property {string?} [className]
 * @property {any[]} [props]
 */

/** @type {import('react').FC<{text: TextEntryList}>} */
const TextEntry = ({ text }) => {
  const entries = text.map(
    ({ id: _id, className, text, type, href, ...props }, i) => {
      const id = _id ?? i;
      switch (type) {
        case 'link': {
          return (
            <a key={id} className={className} href={href} {...props}>
              {text}
            </a>
          );
        }
        case 'span': {
          return (
            <span key={id} className={className} {...props}>
              {text}
            </span>
          );
        }
        case 'plain':
        default: {
          return (
            <Fragment key={id} {...props}>
              {text}
            </Fragment>
          );
        }
      }
    },
  );

  return <>{entries}</>;
};

export default TextEntry;
