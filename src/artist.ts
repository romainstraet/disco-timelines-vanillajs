import Album, { ISpotifyAlbum } from "./album";
import { normalizeString } from "./helpers";

interface ISpotifyArtist {
  id: string;
  name: string;
  uri: string;
  images: Array<ISpotifyArtistImage>;
}

interface ISpotifyArtistImage {
  url: string;
}

export default class Artist {
  id: string;
  name: string;
  spotifyUri: string;
  imageUrl: string;
  discography: Array<Album>;
  earliestReleaseYear: number;
  latestReleaseYear: number;

  constructor(spotifyArtist: ISpotifyArtist) {
    this.id = spotifyArtist.id;
    this.name = spotifyArtist.name;
    this.spotifyUri = spotifyArtist.uri;
    this.imageUrl = spotifyArtist.images[1].url;
    this.discography = [];
    this.earliestReleaseYear = 0;
    this.latestReleaseYear = 0;
  }

  addDiscography(spotifyDiscography: Array<ISpotifyAlbum>): Artist {
    for (let i = 0; i < spotifyDiscography.length; i++) {
      let album = new Album(spotifyDiscography[i]);
      this.discography.push(album);
      this.checkIfEarlierOrLaterRelease(album);
    }
    this.sortDiscographyChronologically();
    return this;
  }

  private checkIfEarlierOrLaterRelease(album: Album) {
    if (this.earliestReleaseYear == 0) {
      this.earliestReleaseYear = album.releaseYear;
      this.latestReleaseYear = album.releaseYear;
      return;
    }
    if (album.releaseYear < this.earliestReleaseYear) {
      this.earliestReleaseYear = album.releaseYear;
    }
    if (album.releaseYear > this.latestReleaseYear) {
      this.latestReleaseYear = album.releaseYear;
    }
  }

  private sortDiscographyChronologically() {
    this.discography.sort((a: Album, b: Album): number => {
      if (a.releaseYear == b.releaseYear) {
        return a.releaseMonth - b.releaseMonth;
      }
      return a.releaseYear - b.releaseYear;
    });
  }

  render(): HTMLElement {
    let artistNode = document.createElement("div");
    artistNode.id = this.id;
    artistNode.dataset.artist = normalizeString(this.name);
    artistNode.appendChild(this.renderArtistNameNode());
    artistNode.appendChild(this.renderArtistDiscographyNode());
    return artistNode;
  }

  private renderArtistNameNode(): HTMLElement {
    let artistNameNode = document.createElement("div");
    artistNameNode.dataset.artistName = "";
    artistNameNode.textContent = this.name;
    return artistNameNode;
  }

  private renderArtistDiscographyNode(): HTMLElement {
    let artistDiscoNode = document.createElement("div");
    artistDiscoNode.dataset.artistDiscography = "";
    this.discography.forEach((album) => {
      artistDiscoNode.appendChild(album.render());
    });
    return artistDiscoNode;
  }
}
