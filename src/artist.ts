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
      /////
      let duplIndex = this.discography.findIndex((v) => v.name == album.name);
      if (duplIndex !== -1) {
        if (album.releaseYear < this.discography[duplIndex].releaseYear) {
          this.discography.splice(duplIndex, 1);
          this.discography.push(album);
          this.checkIfEarlierOrLaterRelease(album);
        }
        if (album.releaseYear == this.discography[duplIndex].releaseYear) {
          if (album.releaseMonth < this.discography[duplIndex].releaseMonth) {
            this.discography.splice(duplIndex, 1);
            this.discography.push(album);
            this.checkIfEarlierOrLaterRelease(album);
          }
        }
      } else {
        this.discography.push(album);
        this.checkIfEarlierOrLaterRelease(album);
      }
      //////
    }
    //    this.cleanDuplicates();
    this.sortDiscographyChronologically();
    return this;
  }

  // private cleanDuplicates() {
  //   const unique = this.discography
  //     .map((e) => e.name)
  //     .map((v, i, arr) => arr.indexOf(v) == i);
  //   this.discography = this.discography.filter((_, i) => unique[i]);
  //   return this;
  // }

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
    artistNode.classList.add("flex");
    artistNode.appendChild(this.renderArtistNameNode());
    artistNode.appendChild(this.renderArtistDiscographyNode());
    return artistNode;
  }

  private renderArtistNameNode(): HTMLElement {
    let artistNameNode = document.createElement("div");
    artistNameNode.dataset.artistName = "";
    artistNameNode.classList.add("first-col");
    artistNameNode.style.backgroundImage = `url(${this.imageUrl})`;

    artistNameNode.textContent = this.name;
    return artistNameNode;
  }

  private renderArtistDiscographyNode(): HTMLElement {
    let artistDiscoNode = document.createElement("div");
    artistDiscoNode.dataset.artistDiscography = "";
    artistDiscoNode.classList.add("flex");
    this.discography.forEach((album) => {
      artistDiscoNode.appendChild(album.render());
    });
    return artistDiscoNode;
  }
}
