const { default: Artist } = require("../../../src/models/artist");

/**
 * @return {Artist[]} artist
 */
export function artists() {
  return [
    new Artist({
      id: "1",
      name: "The Rolling Stones",
      external_urls: { spotify: "spotifyURL" },
      images: [{ url: "largeCoverUrl" }, { url: "mediumCoverUrl" }],
    }),
    new Artist({
      id: "0",
      name: "The Beatles",
      external_urls: { spotify: "spotifyURL" },
      images: [{ url: "largeCoverUrl" }, { url: "mediumCoverUrl" }],
    }),
  ];
}

/**
 * @return {import("../../../src/models/album").SpotifyAlbum[][]} beatlesAlbum
 */
export function albums() {
  return [
    [
      {
        id: "0",
        name: "Let it bleed",
        release_date: "1969",
        external_urls: { spotify: "spotifyURL" },
        images: [{ url: "largeCoverUrl" }, { url: "mediumCoverUrl" }],
      },
      {
        id: "1",
        name: "Voodoo Lounge",
        release_date: "1994",
        external_urls: { spotify: "spotifyURL" },
        images: [{ url: "largeCoverUrl" }, { url: "mediumCoverUrl" }],
      },
    ],
    [
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
    ],
  ];
}
