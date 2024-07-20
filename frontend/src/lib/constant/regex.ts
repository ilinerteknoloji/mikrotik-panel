export const regexConstants: Record<string, [RegExp, string]> = {
  password: [
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/,
    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
  ],
};
