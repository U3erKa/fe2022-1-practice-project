import {
  ContestCreationPage,
  ContestPage,
  Dashboard,
  Home,
  LoginPage,
  NotFound,
  Payment,
  RegistrationPage,
  StartContestPage,
  UserProfile,
} from 'pages';

import { NAME_CONTEST, TAGLINE_CONTEST, LOGO_CONTEST } from 'constants/general';

export const routes = [
  { id: 0, path: '/', element: <Home /> },
  { id: 1, path: '/login', element: <LoginPage /> },
  {
    id: 2,
    path: '/registration',
    element: <RegistrationPage />,
  },
  { id: 3, path: '/payment', element: <Payment /> },
  {
    id: 4,
    path: '/startContest',
    element: <StartContestPage />,
  },
  {
    id: 5,
    path: '/startContest/nameContest',
    element: (
      <ContestCreationPage contestType={NAME_CONTEST} title={'COMPANY NAME'} />
    ),
  },
  {
    id: 6,
    path: '/startContest/taglineContest',
    element: (
      <ContestCreationPage contestType={TAGLINE_CONTEST} title={'TAGLINE'} />
    ),
  },
  {
    id: 7,
    path: '/startContest/logoContest',
    element: <ContestCreationPage contestType={LOGO_CONTEST} title={'LOGO'} />,
  },
  { id: 8, path: '/dashboard', element: <Dashboard /> },
  { id: 9, path: '/contest/:id', element: <ContestPage /> },
  { id: 10, path: '/account', element: <UserProfile /> },
  { id: 999, path: '*', element: <NotFound /> },
];
