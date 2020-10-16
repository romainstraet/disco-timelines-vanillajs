export interface ISpotifyCoverImage {
  url: string;
}
export default class AlbumCover {
  urlSmall: string;
  urlMedium: string;
  urlLarge: string;

  constructor(spotifyCoversImages: Array<ISpotifyCoverImage>) {
    this.urlSmall = spotifyCoversImages[spotifyCoversImages.length - 1].url;
    this.urlLarge = spotifyCoversImages[0].url;
    this.urlMedium =
      spotifyCoversImages.length > 2
        ? (this.urlMedium = spotifyCoversImages[1].url)
        : (this.urlMedium = spotifyCoversImages[0].url);
  }

  render() {
    let albumCoverNode = document.createElement("img");
    albumCoverNode.src = this.urlSmall;
    return albumCoverNode;
  }
}
