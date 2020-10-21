import { Selector } from "testcafe";

fixture("Website").page("../../dist/index.html");

test('On erase timeline"', async (browser) => {
  let beatlesTimeline = Selector('[data-artist="the-beatles"]');

  // James has familiarized with the site
  // He now wants to compare the timelines of his favorite artists
  // He tries first to remove the prepopulated data (Beatles and Rolling Stones)

  // He sees the little "X" button next to the artist name and click on it
  let beatlesRemoveButton = beatlesTimeline
    .child("[data-artist-name]")
    .child("[data-artist-remove]");
  await browser.click(beatlesRemoveButton);

  // The Beatles timeline has now disappeard
  // and the timeline axis starts as of 1964 (year of the first Rolling Stones album)
  let timelines = Selector("#timelines");

  let axisTimeline = Selector("[data-timelines-axis]");

  await browser.expect(timelines.innerText).notContains("THE BEATLES");
  await browser.expect(timelines.innerText).contains("THE ROLLING STONES");
  await Browser.expect(axisTimeline.innerText).notContains(1963);
});
