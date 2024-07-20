export const regexConstants = {
  password: [
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/,
    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
  ],
  ageingTime: [
    /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
    "Ageing time must be in HH:MM:SS format.",
  ],
} as const;
