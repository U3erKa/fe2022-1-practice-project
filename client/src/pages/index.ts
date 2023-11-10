import { lazy } from 'react';

export const ContestPage = lazy(() => import('./ContestPage/ContestPage'));
export const EventsPage = lazy(() => import('./EventsPage/EventsPage'));
export const HowItWorksPage = lazy(
  () => import('./HowItWorksPage/HowItWorksPage'),
);
export const UserProfile = lazy(() => import('./UserProfile/UserProfile'));
export const NotFound = lazy(() => import('./NotFound/NotFound'));
