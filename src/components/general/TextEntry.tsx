import { Fragment, type FC } from 'react';
import type { TextEntry as TextEntryT } from 'types/general';

export type Props = {
  readonly text: TextEntryT[];
};

const TextEntry: FC<Props> = ({ text }) =>
  text.map(({ id: _id, className, text, type, href, ...props }, i) => {
    const id = _id ?? i;
    switch (type) {
      case 'link': {
        return (
          <a className={className} href={href} key={id} {...props}>
            {text}
          </a>
        );
      }
      case 'span': {
        return (
          <span className={className} key={id} {...props}>
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
  });

export default TextEntry;
