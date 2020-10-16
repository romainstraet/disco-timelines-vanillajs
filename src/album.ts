import AlbumCover, { ISpotifyCoverImage } from "./album_cover";

export interface ISpotifyAlbum {
  id: string;
  name: string;
  release_date: string;
  uri: string;
  images: Array<ISpotifyCoverImage>;
}

export default class Album {
  id: string;
  name: string;
  releaseYear: number;
  releaseMonth: number;
  spotifyUri: string;
  covers: AlbumCover;

  constructor(spotifyAlbum: ISpotifyAlbum) {
    this.id = spotifyAlbum.id;
    this.name = this.cleanName(spotifyAlbum.name);
    this.releaseYear = parseInt(spotifyAlbum.release_date.substr(0, 4));
    this.releaseMonth = this.getReleaseMonth(spotifyAlbum.release_date);
    this.spotifyUri = spotifyAlbum.uri;
    this.covers = new AlbumCover(spotifyAlbum.images);
    return this;
  }

  private cleanName(name: string) {
    let arr = name.split(/[()]+/).filter((e) => e);
    if (
      arr[arr.length - 1].toLowerCase().includes("deluxe") ||
      arr[arr.length - 1].toLowerCase().includes("remaster") ||
      arr[arr.length - 1].toLowerCase().includes("re-master")
    ) {
      arr.pop();
      return arr.join().trim();
    } else {
      return name;
    }
  }

  private getReleaseMonth(releaseDate: string): number {
    return releaseDate.length <= 4 ? 0 : parseInt(releaseDate.substr(5, 2));
  }

  render(): HTMLElement {
    let albumNode = document.createElement("div");
    albumNode.id = this.id;
    albumNode.dataset.album = "";
    albumNode.classList.add("flex");
    albumNode.appendChild(this.covers.render());
    return albumNode;
  }
}
