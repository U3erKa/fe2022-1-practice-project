import { lazy } from 'react';

export const ContestCreationPage = lazy(
  () => import('./ContestCreationPage/ContestCreationPage'),
);
export const ContestPage = lazy(() => import('./ContestPage/ContestPage'));
export const Dashboard = lazy(() => import('./Dashboard/Dashboard'));
export const EventsPage = lazy(() => import('./EventsPage/EventsPage'));
export const HowItWorksPage = lazy(
  () => import('./HowItWorksPage/HowItWorksPage'),
);
export const Payment = lazy(() => import('./Payment/Payment'));
export const StartContestPage = lazy(
  () => import('./StartContestPage/StartContestPage'),
);
export const UserProfile = lazy(() => import('./UserProfile/UserProfile'));
export const NotFound = lazy(() => import('./NotFound/NotFound'));
