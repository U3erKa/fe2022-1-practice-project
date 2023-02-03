const yup = require('yup');

module.exports.registrationSchem = yup.object().shape({
  firstName: yup.string().required().min(1),
  lastName: yup.string().required().min(1),
  displayName: yup.string().required().min(1),
  email: yup.string().email().required().min(4),
  password: yup.string().required().min(1),
  role: yup.string().matches(/(customer|creator)/).required(),
});

module.exports.loginSchem = yup.object().shape({
  email: yup.string().email().required().min(4),
  password: yup.string().required().min(1),
});

module.exports.contestSchem = yup.object().shape({
  contestType: yup.string().matches(/(name|logo|tagline)/).required(),
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


