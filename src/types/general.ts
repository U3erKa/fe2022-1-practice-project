import type { LinkProps } from 'next/link';
import type { ReactNode } from 'react';

export type TextEntry = (
  | (LinkProps & { type: 'anchor' })
  | { type: 'link'; href: string }
  | { type: 'plain' | 'span' }
) & {
  id: number | string;
  text: string;
  className?: string;
  [key: string]: any;
};

export type QNAItems = {
  id: string;
  question: string;
  answer: string | AnswerProps | ReactNode | string[];
}[];

export type AnswerProps = {
  description: string;
  list: (string | ReactNode)[];
};
