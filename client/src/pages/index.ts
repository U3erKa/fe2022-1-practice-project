import { lazy } from 'react';

export const ContestCreationPage = lazy(
  () => import('./ContestCreationPage/ContestCreationPage'),
);
export const ContestPage = lazy(() => import('./ContestPage/ContestPage'));
export const Dashboard = lazy(() => import('./Dashboard/Dashboard'));
export const EventsPage = lazy(() => import('./EventsPage/EventsPage'));
export const Home = lazy(() => import('./Home/Home'));
export const HowItWorksPage = lazy(
  () => import('./HowItWorksPage/HowItWorksPage'),
);
export const LoginPage = lazy(() => import('./LoginPage/LoginPage'));
export const Payment = lazy(() => import('./Payment/Payment'));
export const RegistrationPage = lazy(
  () => import('./RegistrationPage/RegistrationPage'),
);
export const StartContestPage = lazy(
  () => import('./StartContestPage/StartContestPage'),
);
export const UserProfile = lazy(() => import('./UserProfile/UserProfile'));
export const NotFound = lazy(() => import('./NotFound/NotFound'));
