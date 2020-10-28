import User from "../../../src/models/User";

describe("ALBUM CLASS", () => {
  test("Should be instantiated with required parameters", async () => {
    let accessToken = "Wh4TeVeR";
    let user = new User(accessToken);
    expect(user.accessToken).toBe(accessToken);
  });

  describe("INSTANTIATED", () => {
    let user;

    beforeEach(() => {
      let accessToken = "Wh4TeVeR";
      user = new User(accessToken);
    });

    test("Can get a state key to ensure authentification", async () => {
      // Cf. Spotify https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow
      expect(typeof user.generateStateKey()).toBe("string");
      expect(user.generateStateKey().length).toBeGreaterThanOrEqual(8);
    });

    test("The state key is stored locally", async () => {
      expect(user.generateStateKey()).toBe(localStorage.getItem("stateKey"));
    });

    test("The state key can be verified and returns true if matches", async () => {
      let key = user.generateStateKey();
      expect(user.verifyStateKey(key)).toBe(true);
    });

    test("The state key can be verified and returns false if does not match", async () => {
      user.generateStateKey();
      let key = "Wh4tHeVeR";
      expect(user.verifyStateKey(key)).toBe(false);
    });

    test("The state key can be verified and returns false if no key is stored", async () => {
      let key = "Wh4tHeVeR";
      expect(user.verifyStateKey(key)).toBe(false);
    });

    test("After verification, the state should be removed from local storage", async () => {
      let key = user.generateStateKey();
      user.verifyStateKey(key);
      expect(localStorage.getItem("stateKey")).toBeNull();
      user.generateStateKey();
      user.verifyStateKey("Wh4tHeVeR");
      expect(localStorage.getItem("stateKey")).toBeNull();
    });
  });
});
