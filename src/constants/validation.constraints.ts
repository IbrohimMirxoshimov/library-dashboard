export const validationConstraints = {
  login: {
    email: {
      min: 3,
    },
    password: {
      min: 4,
      specialChars: /[!@#$%^&*(),.?":{}|<>]/,
      numbers: /\d/,
      uppercase: /[A-Z]/,
    },
  },
};
