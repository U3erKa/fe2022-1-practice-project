import { Fragment } from 'react';
import type { FC } from 'react';
import type { TextEntry as TextEntryT } from 'types/general';

export type Props = {
  text: TextEntryT[];
};

const TextEntry: FC<Props> = ({ text }) => {
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
