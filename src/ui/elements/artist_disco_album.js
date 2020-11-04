import Album from "../../models/album";
import { kTimelineAxisYearWidth } from "../../assets/constants";
import { elFactory } from "./_element_factory";

/**
 * @param {Album} album
 * @param {number} startYear
 * @param {boolean} isEven
 * @returns {HTMLElement}
 */
export function artistDiscoAlbumEl(album, startYear, isEven) {
  let attributes = {
    class: "timeline-artist-disco-album",
    href: album.spotifyUrl,
    target: "_blanck",
  };

  let style = {
    backgroundImage: `url(${album.coverUrl})`,
    position: "absolute",
    left:
      (album.releaseYear -
        startYear + // Year position
        album.releaseMonth / 12) * // Month position
        kTimelineAxisYearWidth + // Scale
      (isEven ? 0 : 10) + // Offset in case 2 albums released same year same month
      "px",
    marginTop: isEven ? "10px" : "",
    marginBottom: isEven ? "" : "10px",
  };

  return elFactory("a", { attributes, style });
}
