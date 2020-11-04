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
    src: album.coverUrl,
    loading: "lazy",
  };

  let style = {
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

  let el = elFactory("img", { attributes, style });

  el.onclick = () => window.open(album.spotifyUrl);

  return el;
}
