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
  ROUTE,
} from 'constants/general';
import type { LoaderFunction, RouteObject } from 'react-router-dom';

const isUserLoaded = () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  return !!refreshToken;
};

const allowNotAuthorizedOnly: LoaderFunction = () => {
  if (isUserLoaded()) {
    return redirect(ROUTE.HOME);
  }
  return null;
};

const allowAuthorizedOnly: LoaderFunction = () => {
  if (!isUserLoaded()) {
    return redirect(ROUTE.LOGIN);
  }
  return null;
};

export const routes: RouteObject[] = [
  {
    path: ROUTE.HOME,
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
            path: ROUTE.LOGIN,
            element: (
              <Suspense fallback={<Spinner />}>
                <LoginPage />
              </Suspense>
            ),
          },
          {
            path: ROUTE.REGISTER,
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
            path: ROUTE.PAYMENT,
            element: (
              <Suspense fallback={<Spinner />}>
                <Payment />
              </Suspense>
            ),
          },
          {
            path: ROUTE.START_CONTEST,
            element: (
              <Suspense fallback={<Spinner />}>
                <StartContestPage />
              </Suspense>
            ),
          },
          {
            path: ROUTE.START_NAME_CONTEST,
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
            path: ROUTE.START_TAGLINE_CONTEST,
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
            path: ROUTE.START_LOGO_CONTEST,
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
            path: ROUTE.DASHBOARD,
            element: (
              <Suspense fallback={<Spinner />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: ROUTE.EVENTS,
            element: (
              <Suspense fallback={<Spinner />}>
                <EventsPage />
              </Suspense>
            ),
          },
          {
            path: ROUTE.CONTEST_BY_ID,
            element: (
              <Suspense fallback={<Spinner />}>
                <ContestPage />
              </Suspense>
            ),
          },
          {
            path: ROUTE.ACCOUNT,
            element: (
              <Suspense fallback={<Spinner />}>
                <UserProfile />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: ROUTE.HOW_IT_WORKS,
        element: (
          <Suspense fallback={<Spinner />}>
            <HowItWorksPage />
          </Suspense>
        ),
      },
      {
        path: ROUTE.NOT_FOUND,
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
