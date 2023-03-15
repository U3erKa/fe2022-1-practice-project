export type TextEntry = {
  id: string | number;
  text: string;
  className?: string;
  [key: string]: any;
} & ({ type: 'plain' | 'span' } | { type: 'link'; href: string });
