import Artist from "../../../src/models/artist";

/**
 * @type {import("../../../src/models/artist").SpotifyArtist} artist
 */
let beatlesArtist = {
  id: "whatever",
  name: "The Beatles",
  external_urls: { spotify: "spotifyURL" },
  images: [
    { url: "largeCoverUrl" },
    { url: "mediumCoverUrl" },
    { url: "smallCoverUrl" },
  ],
};

/**
 * @return {import("../../../src/models/album").SpotifyAlbum[]} beatlesAlbum
 */
let generateBeatlesAlbums = () => [
  {
    id: "0",
    name: "Abbey Road",
    release_date: "1969-12-30",
    external_urls: { spotify: "spotifyURL" },
    images: [{ url: "largeCoverUrl" }, { url: "mediumCoverUrl" }],
  },
  {
    id: "1",
    name: "Revolver",
    release_date: "1966-10-02",
    external_urls: { spotify: "spotifyURL" },
    images: [{ url: "largeCoverUrl" }, { url: "mediumCoverUrl" }],
  },
  {
    id: "2",
    name: "Help",
    release_date: "1966-09-01",
    external_urls: { spotify: "spotifyURL" },
    images: [{ url: "largeCoverUrl" }, { url: "mediumCoverUrl" }],
  },
  {
    id: "3",
    name: "Hard day's night",
    release_date: "1964-08-10",
    external_urls: { spotify: "spotifyURL" },
    images: [{ url: "largeCoverUrl" }, { url: "mediumCoverUrl" }],
  },
];

describe("ARTIST CLASS", () => {
  test("Should be instantiated with Spotify Data", async () => {
    let beatles = new Artist(beatlesArtist);
    expect(beatles.id).toBe(beatlesArtist.id);
    expect(beatles.name).toBe(beatlesArtist.name);
    expect(beatles.imageUrl).toBe(beatlesArtist.images[1].url);
    expect(beatles.spotifyUrl).toBe(beatlesArtist.external_urls.spotify);
  });

  describe("Instantiated", () => {
    let beatlesAlbums;

    beforeEach(() => {
      beatlesAlbums = generateBeatlesAlbums();
    });

    test("Can add the artist discography", async () => {
      let beatles = new Artist(beatlesArtist);
      beatles.addDiscography(beatlesAlbums);
      expect(beatles.discography.length).toBe(beatlesAlbums.length);
    });

    test("Discography should not have duplicates (based on name) and should only keep the earliest release of the duplicates", async () => {
      let beatles = new Artist(beatlesArtist);
      beatlesAlbums[0].name = "Abbey Road";
      beatlesAlbums[0].release_date = "2020"; // Should not be added (there is an earliest release)
      beatlesAlbums[1].name = "Abbey Road";
      beatlesAlbums[1].release_date = "1966";
      beatlesAlbums[2].name = "Abbey Road";
      beatlesAlbums[2].release_date = "1966"; // Should not be added (there is already an album saved for the same year)
      beatlesAlbums[3].name = "Help";
      beatlesAlbums[3].release_date = "1967";

      beatles.addDiscography(beatlesAlbums);
      expect(beatles.discography.length).toBe(2);
      expect(beatles.discography[0].id).toBe(beatlesAlbums[1].id);
      expect(beatles.discography[1].id).toBe(beatlesAlbums[3].id);
    });

    test("Discography should be ordered chronologically", async () => {
      let beatles = new Artist(beatlesArtist);
      beatlesAlbums[0].release_date = "1966-02"; // 1
      beatlesAlbums[1].release_date = "1970"; // 3
      beatlesAlbums[2].release_date = "1966-01"; // 0
      beatlesAlbums[3].release_date = "1966-03"; // 2
      beatles.addDiscography(beatlesAlbums);
      expect(beatles.discography[0].id).toBe(beatlesAlbums[2].id);
      expect(beatles.discography[1].id).toBe(beatlesAlbums[0].id);
      expect(beatles.discography[2].id).toBe(beatlesAlbums[3].id);
      expect(beatles.discography[3].id).toBe(beatlesAlbums[1].id);
    });

    test("Adding discography set the year earliest and latest release between all albums", async () => {
      let beatles = new Artist(beatlesArtist);
      beatles.addDiscography(beatlesAlbums);
      expect(beatles.earliestReleaseYear).toBe(1964);
      expect(beatles.latestReleaseYear).toBe(1969);
    });
  });
});
