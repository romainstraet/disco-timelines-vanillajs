import Discography from "../../src/discography";
import beatlesData from "../../src/data/beatles.json";

test("instantiate class with spotify json data", () => {
  let beatlesDisco = new Discography().fromSpotifyJsonData(beatlesData);
  expect(beatlesDisco.name).toBe("The Beatles");
  expect(beatlesDisco.albumList.length).toBe(beatlesData.items.length);
  expect(beatlesDisco.earliestRelease).toBe(1963);
  expect(beatlesDisco.latestRelease).toBe(2019);
});
