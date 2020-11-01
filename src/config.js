import config from "../config";

let spotifyCommon = config.common.spotify;
let spotifyEnv = config[process.env.NODE_ENV].spotify;

export default {
  Spotify: {
    ...spotifyCommon,
    ...spotifyEnv,
  },
};
