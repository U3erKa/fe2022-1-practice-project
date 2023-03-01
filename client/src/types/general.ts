export type TextEntry = {
  id: string | number;
  text: string;
  className?: string;
  [key: string]: any;
} & ({ type: 'plain' | 'link' | 'span' } | { type: 'link'; href: string });
