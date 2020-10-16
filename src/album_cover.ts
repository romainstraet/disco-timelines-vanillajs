export interface ISpotifyCoverImage {
  url: string;
}
export default class AlbumCover {
  urlSmall: string;
  urlMedium: string;
  urlLarge: string;

  constructor(spotifyCoversImages: Array<ISpotifyCoverImage>) {
    this.urlLarge = spotifyCoversImages[0].url;
    this.urlMedium =
      spotifyCoversImages[1].url == ""
        ? this.urlLarge
        : spotifyCoversImages[1].url;
    this.urlSmall =
      spotifyCoversImages[2].url == ""
        ? this.urlMedium
        : spotifyCoversImages[2].url;
  }

  render() {
    let albumCoverNode = document.createElement("img");
    albumCoverNode.src = this.urlSmall;
    return albumCoverNode;
  }
}
