import { type ImgHTMLAttributes } from 'react';
import { MIME_TYPE } from 'constants/general';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'srcSet'> & {
  srcSet?: string[];
};

export default function Picture({ srcSet, className, ...restProps }: Props) {
  const sources = srcSet?.map((source) => {
    const extension = source
      .substring(source.lastIndexOf('.') + 1)
      .toUpperCase() as keyof typeof MIME_TYPE;

    return (
      <source
        key={source}
        srcSet={encodeURI(source)}
        type={MIME_TYPE[extension]}
      />
    );
  });

  return (
    <picture className={className}>
      {sources}
      <img {...restProps} />
    </picture>
  );
}
