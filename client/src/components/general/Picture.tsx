import { ImgHTMLAttributes } from 'react';
import { MIME_TYPE } from 'constants/general';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'srcSet'> & {
  srcSet?: string[];
};

export default function Picture({ srcSet, ...restProps }: Props) {
  const sources = srcSet?.map((source) => {
    const extension = source
      .substring(source.lastIndexOf('.') + 1)
      .toUpperCase();

    return <source key={source} srcSet={source} type={MIME_TYPE[extension]} />;
  });

  return (
    <picture>
      {sources}
      <img {...restProps} />
    </picture>
  );
}
