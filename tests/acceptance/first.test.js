import { Selector } from "testcafe";

fixture("Website").page("../../dist/index.html");

test('On launch"', async (browser) => {
  await browser
    // A user, let's call him James, go on the website
    // He notices that it already shows 2 albums timelines
    // One with the Beatles discography and one with the Rolling Stones discography
    .expect(Selector('[data-timeline="the-beatles"]').innerText)
    .contains("The Beatles")
    .expect(Selector('[data-timeline="the-rolling-stones"]').innerText)
    .contains("The Rolling Stones")

    // He notices an horizontal axis with the years
    // Starting 1 year before the oldest albums of all album displayed
    // Until 1 year after the latests albums of all albums displayed
    .expect(Selector('[data-timeline="axis"]').innerText)
    .contains("1962")
    .expect(Selector('[data-timeline="axis"]').innerText)
    .contains("1986")
    .expect(Selector('[data-timeline="axis"]').innerText)
    .contains("2021");

  // He also notices that :
  // - Only The Beatles have released an album in 1963 (Please please me)

  // - Only The Rolling stones have released an album in 1981 (Tattoo you)

  // - The Beatles have released 2 albums in 1969 (Yellow Submarine and Abbey Road)

  // - The Rolling Stones have also released an album in 1969 (Let it bleed)
});
