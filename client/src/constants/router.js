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
import { Private, OnlyNotAuthorizedUser } from 'hocs';
import { NAME_CONTEST, TAGLINE_CONTEST, LOGO_CONTEST } from 'constants/general';

export const router = [
  { id: 0, path: '/', element: Home },
  { id: 1, path: '/login', element: OnlyNotAuthorizedUser(LoginPage) },
  {
    id: 2,
    path: '/registration',
    element: OnlyNotAuthorizedUser(RegistrationPage),
  },
  { id: 3, path: '/payment', element: Private(Payment) },
  { id: 4, path: '/startContest', element: Private(StartContestPage) },
  {
    id: 5,
    path: '/startContest/nameContest',
    element: Private(ContestCreationPage, {
      contestType: NAME_CONTEST,
      title: 'Company Name',
    }),
  },
  {
    id: 6,
    path: '/startContest/taglineContest',
    element: Private(ContestCreationPage, {
      contestType: TAGLINE_CONTEST,
      title: 'TAGLINE',
    }),
  },
  {
    id: 7,
    path: '/startContest/logoContest',
    element: Private(ContestCreationPage, {
      contestType: LOGO_CONTEST,
      title: 'LOGO',
    }),
  },
  { id: 8, path: '/dashboard', element: Private(Dashboard) },
  { id: 9, path: '/contest/:id', element: Private(ContestPage) },
  { id: 10, path: '/account', element: Private(UserProfile) },
  { id: 999, path: '*', element: NotFound },
];
