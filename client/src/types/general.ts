import type { ReactNode } from 'react';
import type { LinkProps } from 'react-router-dom';

export type TextEntry = {
  id: string | number;
  text: string;
  className?: string;
  [key: string]: any;
} & (
  | { type: 'plain' | 'span' }
  | { type: 'link'; href: string }
  | ({ type: 'anchor' } & LinkProps)
);

export type QNAItems = {
  id: string,
  question: string;
  answer: string | string[] | AnswerProps | ReactNode;
}[];

export type AnswerProps = {
  description: string;
  list: (string | ReactNode)[];
};
