import User from "../../../src/models/User";

describe("ALBUM CLASS", () => {
  test("Can be instantiated without parameters", async () => {
    let user = new User();
    expect(user.accessToken).toBe("");
  });

  describe("INSTANTIATED", () => {
    let user;

    beforeEach(() => {
      let accessToken = "Wh4TeVeR";
      user = new User(accessToken);
    });

    test("Can get a state key to ensure authentification", async () => {
      // Cf. Spotify https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow
      expect(typeof user.getAndStoreStateKey()).toBe("string");
      expect(user.getAndStoreStateKey().length).toBeGreaterThanOrEqual(8);
    });

    test("The state key is stored locally", async () => {
      expect(user.getAndStoreStateKey()).toBe(localStorage.getItem("stateKey"));
    });

    test("The state key can be verified and returns true if matches", async () => {
      let key = user.getAndStoreStateKey();
      expect(user.isValidKey(key)).toBe(true);
    });

    test("The state key can be verified and returns false if does not match", async () => {
      user.getAndStoreStateKey();
      let key = "Wh4tHeVeR";
      expect(user.isValidKey(key)).toBe(false);
    });

    test("The state key can be verified and returns false if no key is stored", async () => {
      let key = "Wh4tHeVeR";
      expect(user.isValidKey(key)).toBe(false);
    });
  });
});
