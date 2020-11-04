import ObservableState from "../../state";
import Observer from "../../base/observer";
import { elFactory } from "../elements/_element_factory";
import { signOnSpotifyButtonEl } from "../elements/sign_on_spotify_button";
import { searchArtistInput } from "../elements/search_artist_input";

export default class ErrorMessage extends Observer {
  /**
   * @param {ObservableState} observableState
   */
  constructor(observableState) {
    super();
    this._appState = observableState;
  }

  /**
   *
   */
  update() {
    this.render();
  }

  /**
   * @returns {void}
   */
  render() {
    // attributes
    let attributes = {
      id: "error-message",
    };

    let style = {
      marginTop: this._appState.errorMessage == "" ? "" : "-15px",
    };

    // create component
    let component = elFactory("div", { attributes, style }, [
      this._appState.errorMessage,
    ]);

    // manipulate Dom
    document.getElementById("error-message").replaceWith(component);
  }
}
