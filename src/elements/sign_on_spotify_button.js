import { elFactory } from "./@element_factory";
//@ts-ignore
import spotifyIcon from "../spotify_icon.png";

/**
 * @param {function} onClick
 *@returns {HTMLElement}
 */
export function signOnSpotifyButtonEl(onClick) {
  let attributes = {
    class: "button-sign-on-spotify",
  };

  let iconEl = elFactory("img", {
    attributes: { class: "spotify-icon", src: spotifyIcon },
  });

  let el = elFactory("button", { attributes }, [
    iconEl,
    "Sign on Spotify to add an artist",
  ]);
  el.onclick = () => onClick();
  return el;
}
