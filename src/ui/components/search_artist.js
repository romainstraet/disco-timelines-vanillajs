import ObservableState from "../../state";
import Observer from "../../base/observer";
import { elFactory } from "../elements/_element_factory";
import { signOnSpotifyButtonEl } from "../elements/sign_on_spotify_button";
import { searchArtistInput } from "../elements/search_artist_input";
import { userEvent } from "../../base/events";

export default class SearchArtist extends Observer {
  /**
   * @param {ObservableState} observableState
   */
  constructor(observableState) {
    super();
    this._appState = observableState;
  }

  /**
   * @param {string} event
   */
  update(event) {
    if (event == userEvent) {
      this.render();
    }
  }

  /**
   * @returns {void}
   */
  render() {
    // attributes
    let attributes = {
      id: "search-artist",
    };

    // children
    let children = [];
    let el = this._appState.isAuth
      ? searchArtistInput((artistName) =>
          this._appState.searchAndAddArtist(artistName)
        )
      : signOnSpotifyButtonEl(() => this._appState.signOnSpotify());
    children.push(el);

    // create component
    let component = elFactory("div", { attributes }, children);

    // manipulate Dom
    document.getElementById("search-artist").replaceWith(component);
  }
}
