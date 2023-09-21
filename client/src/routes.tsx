import { Suspense, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Outlet, redirect } from 'react-router-dom';
import { getEvents } from 'store/slices/eventSlice';
import { useDispatch } from 'hooks';
import {
  ContestCreationPage,
  ContestPage,
  Dashboard,
  EventsPage,
  Home,
  HowItWorksPage,
  LoginPage,
  NotFound,
  Payment,
  RegistrationPage,
  StartContestPage,
  UserProfile,
} from 'pages';
import { Spinner } from 'components/general';
import { ChatContainer } from 'components/chat';
import {
  NAME_CONTEST,
  TAGLINE_CONTEST,
  LOGO_CONTEST,
  REFRESH_TOKEN,
} from 'constants/general';
import type { LoaderFunction, RouteObject } from 'react-router-dom';

const isUserLoaded = () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  return !!refreshToken;
};

const allowNotAuthorizedOnly: LoaderFunction = () => {
  if (isUserLoaded()) {
    return redirect('/');
  }
  return null;
};

const allowAuthorizedOnly: LoaderFunction = () => {
  if (!isUserLoaded()) {
    return redirect('/login');
  }
  return null;
};

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        ),
      },

      {
        loader: allowNotAuthorizedOnly,
        children: [
          {
            path: '/login',
            element: (
              <Suspense fallback={<Spinner />}>
                <LoginPage />
              </Suspense>
            ),
          },
          {
            path: '/registration',
            element: (
              <Suspense fallback={<Spinner />}>
                <RegistrationPage />
              </Suspense>
            ),
          },
        ],
      },

      {
        loader: allowAuthorizedOnly,
        children: [
          {
            path: '/payment',
            element: (
              <Suspense fallback={<Spinner />}>
                <Payment />
              </Suspense>
            ),
          },
          {
            path: '/startContest',
            element: (
              <Suspense fallback={<Spinner />}>
                <StartContestPage />
              </Suspense>
            ),
          },
          {
            path: '/startContest/nameContest',
            element: (
              <Suspense fallback={<Spinner />}>
                <ContestCreationPage
                  contestType={NAME_CONTEST}
                  title={'COMPANY NAME'}
                />
              </Suspense>
            ),
          },
          {
            path: '/startContest/taglineContest',
            element: (
              <Suspense fallback={<Spinner />}>
                <ContestCreationPage
                  contestType={TAGLINE_CONTEST}
                  title={'TAGLINE'}
                />
              </Suspense>
            ),
          },
          {
            path: '/startContest/logoContest',
            element: (
              <Suspense fallback={<Spinner />}>
                <ContestCreationPage
                  contestType={LOGO_CONTEST}
                  title={'LOGO'}
                />
              </Suspense>
            ),
          },
          {
            path: '/dashboard',
            element: (
              <Suspense fallback={<Spinner />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: '/events',
            element: (
              <Suspense fallback={<Spinner />}>
                <EventsPage />
              </Suspense>
            ),
          },
          {
            path: '/contest/:id',
            element: (
              <Suspense fallback={<Spinner />}>
                <ContestPage />
              </Suspense>
            ),
          },
          {
            path: '/account',
            element: (
              <Suspense fallback={<Spinner />}>
                <UserProfile />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: '/how-it-works',
        element: (
          <Suspense fallback={<Spinner />}>
            <HowItWorksPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<Spinner />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
];

function RootLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        // @ts-expect-error
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Outlet />
      <ChatContainer />
    </>
  );
}
