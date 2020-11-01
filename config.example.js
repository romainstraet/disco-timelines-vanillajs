export default {
  common: {
    spotify: {
      authUrl: "https://accounts.spotify.com/authorize",
      apiUrl: "https://api.spotify.com/v1/",
      clientId: "",
    },
  },
  production: {
    spotify: {
      redirectUri: "",
    },
  },
  development: {
    spotify: {
      redirectUri: "",
    },
  },
  test: {
    spotify: {
      redirectUri: "",
    },
  },
};
