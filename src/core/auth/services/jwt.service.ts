const TOKEN_KEY = 'jwtToken';

export const jwtService = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  saveToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  destroyToken: () => localStorage.removeItem(TOKEN_KEY),
};
