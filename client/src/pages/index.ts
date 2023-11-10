import { lazy } from 'react';

export const HowItWorksPage = lazy(
  () => import('./HowItWorksPage/HowItWorksPage'),
);
export const UserProfile = lazy(() => import('./UserProfile/UserProfile'));
export const NotFound = lazy(() => import('./NotFound/NotFound'));
