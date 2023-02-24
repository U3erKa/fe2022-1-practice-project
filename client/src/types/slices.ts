
export type AuthState = {
  isFetching: boolean;
  error: Error | null;
};

export type BundleState = {
  bundle: Bundle | null;
};

export type Bundle = {
  first: Omit<ContestsOrder, 'payment'>;
  name: Omit<ContestsOrder, 'name'>;
  logo: Omit<ContestsOrder, 'name' | 'logo'>;
  tagline: Omit<ContestsOrder, 'name' | 'logo' | 'payment'>;
};

export type ContestsOrder = 'name' | 'logo' | 'tagline' | 'payment';
