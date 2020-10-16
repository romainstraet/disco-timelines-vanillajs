// import { normalizedString } from "./helpers";

// export default class Discography {
//   name: string;
//   earliestRelease: number;
//   latestRelease: number;
//   albumList: never[];
//   constructor() {
//     this.name = "";
//     this.earliestRelease = 3000;
//     this.latestRelease = 0;
//     this.albumList = [];
//   }

//   fromSpotifyJsonData(spotifyJsonData) {
//     this.name = spotifyJsonData.items[0].artists[0].name;
//     this.albumList = spotifyJsonData.items;
//     this.albumList.sort((a, b) => {
//       const aYear = parseInt(a.release_date.substring(0, 4));
//       const bYear = parseInt(b.release_date.substring(0, 4));
//       return aYear - bYear;
//     });
//     this.setEarliestandLatestReleaseYear();
//     return this;
//   }

//   setEarliestandLatestReleaseYear() {
//     this.albumList.forEach((album) => {
//       const releaseYear = parseInt(album.release_date.substring(0, 4));
//       this.earliestRelease =
//         releaseYear < this.earliestRelease ? releaseYear : this.earliestRelease;
//       this.latestRelease =
//         releaseYear > this.latestRelease ? releaseYear : this.latestRelease;
//     });
//   }

//   renderAlbum(album) {
//     const releaseYear = parseInt(album.release_date.substring(0, 4));

//     const albumNode = document.createElement("div");
//     albumNode.dataset.discographyAlbum = album.id;
//     albumNode.className = "album";
//     albumNode.style += `position: absolute; left: ${
//       (releaseYear - this.earliestRelease) * 64 + 200
//     }px;`;

//     albumNode.innerHTML = `<img src="${album.images[2].url}">`;
//     return albumNode;
//   }

//   render() {
//     const discographyEl = document.createElement("div");
//     discographyEl.dataset.discography = normalizedString(this.name);
//     discographyEl.className = "timeline";
//     const nameEl = document.createElement("div");
//     nameEl.textContent = this.name;
//     nameEl.className = "first-col";
//     discographyEl.appendChild(nameEl);
//     this.albumList.forEach((album) => {
//       discographyEl.appendChild(this.renderAlbum(album));
//     });
//     return discographyEl;
//   }
// }
