import Album from "../../../src/base/album";

/**
 * @type {import("../../../src/base/album").SpotifyAlbum} beatlesAlbum
 */
let beatlesAlbum = {
  id: "whatever",
  name: "Abbey Road",
  release_date: "2019-09-01",
  external_urls: { spotify: "spotifyURL" },
  images: [
    { url: "largeCoverUrl" },
    { url: "mediumCoverUrl" },
    { url: "smallCoverUrl" },
  ],
};

describe("ALBUM CLASS", () => {
  test("Should be instantiated with Spotify Data", async () => {
    let album = new Album(beatlesAlbum);
    expect(album.id).toBe(beatlesAlbum.id);
    expect(album.name).toBe(beatlesAlbum.name);
    expect(album.releaseYear).toBe(2019);
    expect(album.releaseMonth).toBe(9);
    expect(album.coverUrl).toBe(beatlesAlbum.images[1].url);
    expect(album.spotifyUrl).toBe(beatlesAlbum.external_urls.spotify);
  });

  test("Should clean the name of the album", async () => {
    let names = [
      "Abbey Road (Deluxe edition)",
      "Abbey Road (Super Deluxe)",
      "Abbey Road (Remastered)",
      "Abbey Road (Re-mastered 2019)",
      "Abbey Road (Awesome version",
    ];
    names.forEach((name) => {
      beatlesAlbum.name = name;
      let album = new Album(beatlesAlbum);
      expect(album.name).toBe("Abbey Road");
      expect(album.name).not.toBe(name);
    });
  });

  test("Should extract release year and month", async () => {
    let releaseDates = [
      ["2020-01-09", 2020, 1],
      ["1999-12-18", 1999, 12],
      ["1954-03-21", 1954, 3],
    ];
    releaseDates.forEach((releaseDate) => {
      beatlesAlbum.release_date = releaseDate[0].toString();
      let album = new Album(beatlesAlbum);
      expect(album.releaseYear).toBe(releaseDate[1]);
      expect(album.releaseMonth).toBe(releaseDate[2]);
    });
  });

  test("Should select the medium size album cover", async () => {
    let imagesData = [
      {
        images: [
          { url: "largeAvailable" },
          { url: "mediumAvailable" },
          { url: "smallAvailable" },
        ],
        selectedIndex: 1,
      },
      {
        images: [
          { url: "largeAvailable" },
          { url: "" },
          { url: "smallAvailable" },
        ],
        selectedIndex: 0,
      },
      {
        images: [{ url: "" }, { url: "" }, { url: "smallAvailable" }],
        selectedIndex: 2,
      },
    ];
    imagesData.forEach((imageData) => {
      beatlesAlbum.images = imageData.images;
      let album = new Album(beatlesAlbum);
      expect(album.coverUrl).toBe(
        imageData.images[imageData.selectedIndex].url
      );
    });
  });
});
