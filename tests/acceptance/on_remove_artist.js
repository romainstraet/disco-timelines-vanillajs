import { Selector } from "testcafe";

fixture("Website").page("../../dist/index.html");

test('On remove artist"', async (browser) => {
  // James has familiarized with the site which shows
  // prepopulated data (The Beatles and The Rolling Stones)
  let timelines = Selector("#timelines");
  await browser.expect(timelines.innerText).contains("THE BEATLES");
  await browser.expect(timelines.innerText).contains("THE ROLLING STONES");

  // He now wants to compare the timelines of his favorite artists
  // He tries first to remove The Beatles and sees the little "X"
  // Button next to the artist name and click on it
  let beatlesTimeline = Selector('[data-artist="The Beatles"]');
  let beatlesRemoveButton = beatlesTimeline.child(0).child("[data-artist-id]");
  await browser.click(beatlesRemoveButton);

  // The Beatles timeline has now disappeard
  // and the timeline axis starts as of 1964 (year of the first Rolling Stones album)
  timelines = Selector("#timelines");
  let axisTimeline = Selector("[data-timeline-axis]");
  await browser.expect(timelines.innerText).notContains("THE BEATLES");
  await browser.expect(timelines.innerText).contains("THE ROLLING STONES");
  await browser.expect(axisTimeline.innerText).notContains("1963");

  // He does the same with The Rolling Stones
  let rStonesTimeline = Selector('[data-artist="The Rolling Stones"]');
  let rStonesRemoveButton = rStonesTimeline.child(0).child("[data-artist-id]");
  await browser.click(rStonesRemoveButton);

  // The Rolling Stones timeline has also disappeard
  timelines = Selector("#timelines");
  await browser.expect(timelines.innerText).notContains("THE ROLLING STONES");

  // The Timeline axis is now a default timelines going
  // to current year from 11 years earlier
  let currentYear = new Date(Date.now()).getFullYear();
  axisTimeline = Selector("[data-timeline-axis]");
  await browser.expect(axisTimeline.innerText).contains(currentYear.toString());
  await browser
    .expect(axisTimeline.innerText)
    .contains((currentYear - 10).toString());
  await browser
    .expect(axisTimeline.innerText)
    .notContains((currentYear + 1).toString());
  await browser
    .expect(axisTimeline.innerText)
    .notContains((currentYear - 11).toString());
});
