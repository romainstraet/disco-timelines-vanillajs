import Album from "../../src/album";
import AlbumCover from "../../src/album_cover";
import beatlesData from "../../src/data/beatles";

describe("Album class", () => {
  test("Instantiate with constructor", () => {
    let albumCovers = new AlbumCover({ urlSmall: 'urlSmall', urlLarge: 'urlLarge' });
    let album = new Album({ id: '1', name: 'Please Please me', releaseYear: 1963, releaseMonth: 3, covers: albumCovers });
    expect(album.id).toBe('1')
    expect(album.name).toBe('Please Please me')
    expect(album.releaseYear).toBe(1963)
    expect(album.releaseMonth).toBe(3)
    expect(album.covers).toBe(albumCovers)
  });
  
  test("Instantiate with Spotify Data", () => {
    let beatlesAlbum = beatlesData.items[0]
    let album = new Album().addFromSpotifyData(beatlesAlbum);
    expect(album.id).toBe(beatlesAlbum.id)
    expect(album.name).toBe(beatlesAlbum.name)
    expect(album.releaseYear).toBe(2019)
    expect(album.releaseMonth).toBe(9)
    expect(album.covers.urlLarge).toBe(beatlesAlbum.images[0].url)
  });
});

// 