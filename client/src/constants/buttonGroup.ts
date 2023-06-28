export const EXACT_CHOISE = 'EXACT';
export const SIMILAR_CHOISE = 'SIMILAR';
export const NAME_ONLY_CHOISE = 'NAME_ONLY';

export const BUTTONS = [
  {
    choise: EXACT_CHOISE,
    text: 'The Domain should exactly match the name',
  },
  {
    choise: SIMILAR_CHOISE,
    text: 'But minor variations are allowed (Recommended)',
  },
  {
    choise: NAME_ONLY_CHOISE,
    text: 'I am only looking for a name, not a Domain',
  },
] as const;
