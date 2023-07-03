import { type initialValues } from './CreateEvent';

export const events: (typeof initialValues & {
  id: number;
  createdAt: string;
})[] = [
  {
    id: 1,
    name: 'test event 1',
    date: '2023-07-03',
    notify: 'never',
    createdAt: '2023-07-01',
  },
  {
    id: 2,
    name: 'test event 2',
    date: '2023-07-04',
    notify: '1 day before',
    createdAt: '2023-07-01',
  },
  {
    id: 3,
    name: 'test event 3',
    date: '2023-07-05',
    notify: '1 hour before',
    createdAt: '2023-07-01',
  },
  {
    id: 4,
    name: 'test event 4',
    date: '2023-07-02',
    notify: 'never',
    createdAt: '2023-07-01',
  },
];

