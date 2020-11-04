import { elFactory } from "./_element_factory";
//@ts-ignore
import spotifyIconSVG from "../../assets/images/spotify.svg";

/**
 * @param {function} onClick
 *@returns {HTMLElement}
 */
export function signOnSpotifyButtonEl(onClick) {
  let attributes = {
    class: "button-sign-on-spotify",
  };

  let iconEl = elFactory("img", {
    attributes: { class: "spotify-icon", src: spotifyIconSVG },
  });

  let el = elFactory("button", { attributes }, [
    iconEl,
    "Sign on Spotify to add an artist",
  ]);
  el.onclick = () => onClick();
  return el;
}
