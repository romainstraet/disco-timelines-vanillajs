import AlbumCover, { ISpotifyCoverImages } from "./album_cover";

interface IAlbum {
  id: string;
  name: string;
  releaseYear: number;
  releaseMonth?: number;
  covers: AlbumCover;
}

interface ISpotifyAlbum {
  id: string;
  name: string;
  release_date: string;
  images: Array<ISpotifyCoverImages>;
}

export default class Album {
  id: string;
  name: string;
  releaseYear: number;
  releaseMonth: number | undefined;
  covers: AlbumCover;

  constructor(
    {
      id = "",
      name = "",
      releaseYear = 0,
      releaseMonth,
      covers = new AlbumCover(),
    }: IAlbum = {} as IAlbum
  ) {
    this.id = id;
    this.name = name;
    this.releaseYear = releaseYear;
    this.releaseMonth = releaseMonth;
    this.covers = covers;
  }

  addFromSpotifyData(spotifyAlbumData: ISpotifyAlbum): Album {
    this.id = spotifyAlbumData.id;
    this.name = spotifyAlbumData.name;
    this.releaseYear = parseInt(spotifyAlbumData.release_date.substr(0, 4));
    this.releaseMonth = this.getReleaseMonth(spotifyAlbumData.release_date);
    this.covers = new AlbumCover().addFromSpotifyData(spotifyAlbumData.images);
    return this;
  }

  private getReleaseMonth(releaseDate: string): number {
    return releaseDate.length <= 4 ? 0 : parseInt(releaseDate.substr(5, 2));
  }

  render(): HTMLElement {
    let albumNode = document.createElement("div");
    albumNode.id = this.id;
    albumNode.dataset.album = "";
    albumNode.appendChild(this.covers.render());
    return albumNode;
  }
}
