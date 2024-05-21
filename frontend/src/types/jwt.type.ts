export type JWT = {
  user: {
    username: string;
    role: string;
  };
  tokens: {
    accessToken: {
      token: string;
      expiresAt: number;
    };
    refreshToken: {
      token: string;
      expiresAt: number;
    };
  };
};
