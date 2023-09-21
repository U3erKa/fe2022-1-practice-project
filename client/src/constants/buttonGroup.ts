import { uniqueId } from "utils/functions";

export const EXACT_CHOISE = 'EXACT';
export const SIMILAR_CHOISE = 'SIMILAR';
export const NAME_ONLY_CHOISE = 'NAME_ONLY';

export const BUTTONS = [
  {
    id: uniqueId('button'),
    choise: EXACT_CHOISE,
    text: 'The Domain should exactly match the name',
  },
  {
    id: uniqueId('button'),
    choise: SIMILAR_CHOISE,
    text: 'But minor variations are allowed (Recommended)',
  },
  {
    id: uniqueId('button'),
    choise: NAME_ONLY_CHOISE,
    text: 'I am only looking for a name, not a Domain',
  },
] as const;
