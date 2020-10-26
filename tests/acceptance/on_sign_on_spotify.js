import { Selector } from "testcafe";
import { ClientFunction } from "testcafe";

const getWindowLocation = ClientFunction(() => window.location);

fixture("Website").page("http://localhost:8080/");

test('On sign on Spotify"', async (browser) => {
  // James now want to add another artist on the timeline
  // He understand he needs to log on Spotify to do this
  let signOnSpotify = Selector("#sign-on-spotify");
  let searchArtist = Selector("#search-artist");
  await browser
    .expect(signOnSpotify.innerText)
    .contains("Log on Spotify to add an artist")
    .expect(searchArtist.innerText)
    .notContains("Add Artist");

  // He clicks on the login button and is redirected to a Spotify form
  let signInButton = signOnSpotify.child(".button-sign-on-spotify");
  await browser.click(signInButton);
  let location = await getWindowLocation();
  await browser.expect(location.href).contains("https://accounts.spotify.com/");

  // He put the wrong password and is invited to retry to login
  /* Note that I don't test here an actual login on Spotify */
  await browser.navigateTo("https://example.com/callback?error=access_denied");
  let errorMessage = Selector("#error-message");
  signOnSpotify = Selector("#sign-on-spotify");
  searchArtist = Selector("#search-artist");
  await browser
    .expect(errorMessage.innerText)
    .contains("Something went wrong, please retry to sign on Spotify")
    .expect(searchArtist.innerText)
    .contains("Log on Spotify to add an artist");

  // He retries and now he can search for an artist
  await browser.navigateTo("https://example.com/callback?error=access_denied");
  errorMessage = Selector("#error-message");
  signOnSpotify = Selector("#sign-on-spotify");
  searchArtist = Selector("#search-artist");
  await browser
    .expect(errorMessage.innerText)
    .contains("")
    .expect(signOnSpotify.innerText)
    .contains("")
    .expect(searchArtist.innerText)
    .contains("Add Artist");
});
