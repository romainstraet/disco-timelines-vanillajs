interface IAlbumCoverUrls {
  urlSmall?: string;
  urlLarge?: string;
}

export interface ISpotifyCoverImages {
  url: string;
}

export default class AlbumCover {
  urlSmall: string;
  urlLarge: string;

  constructor({ urlSmall = "", urlLarge = "" }: IAlbumCoverUrls = {}) {
    this.urlSmall = urlSmall;
    this.urlLarge = urlLarge;
  }

  addFromSpotifyData(spotifyCoversData: Array<ISpotifyCoverImages>) {
    this.urlSmall = spotifyCoversData[spotifyCoversData.length - 1].url;
    this.urlLarge = spotifyCoversData[0].url;
    return this;
  }

  render() {
    let albumCoverNode = document.createElement("img");
    albumCoverNode.src = this.urlSmall;
    return albumCoverNode;
  }
}
