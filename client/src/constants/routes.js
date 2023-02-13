import { redirect } from 'react-router-dom';

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

import {
  NAME_CONTEST,
  TAGLINE_CONTEST,
  LOGO_CONTEST,
  REFRESH_TOKEN,
} from 'constants/general';

const isUserLoaded = () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  return !!refreshToken;
};

/** @type {import('react-router-dom').LoaderFunction} */
const allowNotAuthorizedOnly = () => {
  if (isUserLoaded()) {
    return redirect('/');
  }
  return null;
};

/** @type {import('react-router-dom').LoaderFunction} */
const allowAuthorizedOnly = () => {
  if (!isUserLoaded()) {
    return redirect('/login');
  }
  return null;
};

/** @type {import('react-router-dom').RouteObject[]} */
export const routes = [
  { path: '/', element: <Home /> },

  {
    loader: allowNotAuthorizedOnly,
    children: [
      { path: '/login', element: <LoginPage /> },
      {
        path: '/registration',
        element: <RegistrationPage />,
      },
    ],
  },

  {
    loader: allowAuthorizedOnly,
    children: [
      { path: '/payment', element: <Payment /> },
      {
        path: '/startContest',
        element: <StartContestPage />,
      },
      {
        path: '/startContest/nameContest',
        element: (
          <ContestCreationPage
            contestType={NAME_CONTEST}
            title={'COMPANY NAME'}
          />
        ),
      },
      {
        path: '/startContest/taglineContest',
        element: (
          <ContestCreationPage
            contestType={TAGLINE_CONTEST}
            title={'TAGLINE'}
          />
        ),
      },
      {
        path: '/startContest/logoContest',
        element: (
          <ContestCreationPage contestType={LOGO_CONTEST} title={'LOGO'} />
        ),
      },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/contest/:id', element: <ContestPage /> },
      { path: '/account', element: <UserProfile /> },
    ],
  },

  { path: '*', element: <NotFound /> },
];
