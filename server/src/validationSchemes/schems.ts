import * as yup from 'yup';

export const registrationSchem = yup.object().shape({
  firstName: yup.string().required().min(1),
  lastName: yup.string().required().min(1),
  displayName: yup.string().required().min(1),
  email: yup.string().email().required().min(4),
  password: yup.string().required().min(1),
  role: yup
    .string()
    .matches(/(customer|creator)/)
    .required(),
});

export const loginSchem = yup.object().shape({
  email: yup.string().email().required().min(4),
  password: yup.string().required().min(1),
});

export const contestSchem = yup.object().shape({
  contestType: yup
    .string()
    .matches(/(name|logo|tagline)/)
    .required(),
  fileName: yup.string().min(1),
  originalFileName: yup.string().min(1),
  title: yup.string().required().min(1),
  typeOfName: yup.string().min(1),
  industry: yup.string().required().min(1),
  focusOfWork: yup.string().required().min(1),
  targetCustomer: yup.string().required().min(1),
  styleName: yup.string().min(1),
  nameVenture: yup.string().min(1),
  typeOfTagline: yup.string().min(1),
  brandStyle: yup.string().min(1),
});

export const eventSchem = yup.object().shape({
  name: yup
    .string()
    .required()
    .test('is-not-empty', 'Name cannot be empty', (name) => !!name?.trim()),
  date: yup
    .string()
    .required()
    .min(1)
    .test(
      'is-date',
      'Must be date',
      (date) => !!date?.trim() && !isNaN(Date.parse(date)),
    ),
  notify: yup
    .string()
    .required()
    .oneOf([
      'never',
      'when event starts',
      '1 hour before',
      '1 day before',
      '1 week before',
    ]),
});
