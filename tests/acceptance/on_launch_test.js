import { Selector } from "testcafe";

fixture("Website").page("../../dist/index.html");

test('On launch"', async (browser) => {
  let beatlesTimeline = Selector('[data-artist="The Beatles"]');
  let beatlesDisco = beatlesTimeline.child("[data-artist-discography]");
  let beatlesFirstAlbumPosition = beatlesDisco.child(0).offsetLeft;
  let beatlesLastAlbumPosition = beatlesDisco.child(-1).offsetLeft;
  let beatlesAlbumsCount = beatlesDisco.childElementCount;

  let rStonesTimeline = Selector('[data-artist="The Rolling Stones"]');
  let rStonesDisco = rStonesTimeline.child("[data-artist-discography]");
  let rStonesFirstAlbumPosition = await rStonesDisco.child(0).offsetLeft;
  let rStonesLastAlbumPosition = await rStonesDisco.child(-1).offsetLeft;
  let rStonesAlbumsCount = await rStonesDisco.childElementCount;
  let axisTimeline = Selector("[data-timeline-axis]");

  // James goes on the website
  // He notices that it already shows 2 albums timelines
  // One with the Beatles discography and one with the Rolling Stones discography
  await browser
    .expect(beatlesTimeline.innerText)
    .contains("THE BEATLES")
    .expect(rStonesTimeline.innerText)
    .contains("THE ROLLING STONES")

    // He notices an horizontal axis with the years
    // Starting the year of the oldest albums of all album displayed
    // Until 1 year after the latests albums of all albums displayed
    .expect(axisTimeline.innerText)
    .contains("1963")
    .expect(axisTimeline.innerText)
    .contains("1986")
    .expect(axisTimeline.innerText)
    .contains("2021")

    // He also notices that based on their position on the timeline :
    // - the Beatles have released a first album before the Rolling Stones
    .expect(beatlesFirstAlbumPosition)
    .lt(rStonesFirstAlbumPosition)
    // - the Rolling Stones have released an album after the last one of the Beatles
    .expect(beatlesLastAlbumPosition)
    .lt(rStonesLastAlbumPosition)
    // - the Rolling Stones have release more albums than the Beatles
    .expect(beatlesAlbumsCount)
    .lt(rStonesAlbumsCount);
});
