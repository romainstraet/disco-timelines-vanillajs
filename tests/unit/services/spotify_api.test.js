import SpotifyApi from "../../../src/services/spotify_api";
import {
  mockWindowLocation,
  resetWindowlocation,
} from "../_helpers/mock_location_assign";

describe("SPOTIFY API SERVICE CLASS", () => {
  test("Should be instantiated with a Config parameters", async () => {
    let config = {
      authUrl: "http://auth.spotify",
      apiUrl: "http://spotify",
      clientId: "sjkbT6ybscksjb7655",
      redirectUri: "http://localhost",
    };
    let api = new SpotifyApi(config);
    //@ts-ignore
    expect(api._config).toBe(config);
  });

  describe("INSTANTIATED", () => {
    let config = {
      authUrl: "https://accounts.spotify.com/authorize",
      apiUrl: "http://spotify",
      clientId: "sjkbT6ybscksjb7655",
      redirectUri: "localhost",
    };
    let api;

    beforeEach(() => {
      api = new SpotifyApi(config);
    });

    test("Sign On Spotify method should redirect to Spotify auth url", async () => {
      mockWindowLocation();
      let spy = jest.spyOn(window.location, "assign");
      let userState = "Wh4teVeR";
      let location = `${config.authUrl}?response_type=token&client_id=${config.clientId}&redirect_uri=${config.redirectUri}&state=${userState}`;
      api.signOn(userState, window.location);
      expect(spy).toHaveBeenCalledWith(location);
      resetWindowlocation();
    });

    test("Get Hash Param should return an object with access token and user state", async () => {
      let hashUrl =
        "#access_token=NwAExzBV3O2Tk&token_type=Bearer&expires_in=3600&state=123";
      let response = api.getHashParamsFromCallbackUrl(hashUrl);
      expect(response.accessToken).toBe("NwAExzBV3O2Tk");
      expect(response.state).toBe("123");
    });
  });
});
