import type { LinkProps } from 'next/link';
import type { ReactNode } from 'react';

export type TextEntry = {
  id: number | string;
  text: string;
  className?: string;
  [key: string]: any;
} & (
  | { type: 'link'; href: string }
  | { type: 'plain' | 'span' }
  | (LinkProps & { type: 'anchor' })
);

export type QNAItems = {
  id: string;
  question: string;
  answer: AnswerProps | ReactNode | string[] | string;
}[];

export type AnswerProps = {
  description: string;
  list: (ReactNode | string)[];
};
