## 💿 Discography Timelines

[Live version here](https://disco-timelines.web.app/)

**Discography Timelines** is a personal project aiming to
present every album released by an artist on a timeline (based on the
release date of the album).

The app allows users to add the discography of different artists of
their choice by consuming the [Spotify Web API](https://developer.spotify.com/documentation/web-api/).

From a technical point of view, the goal was to build a front-end only
website based on **TDD** and on a **frameworkless** philosophy. This project has therefore been built with HTML, CSS and **Vanilla Javascript** only.

### To Do

- [x] Make design responsive and enhance some styling (v0.2)
- [ ] Fetch more than 50 albums when appropriate (e.g. Bob Dylan)
    - *Spotify returns max 50 album objects on each request. Currently, the app only fetches those 50 albums. Hence, If an artist has released more than 50 albums, the artist's timeline is incomplete.*
- [ ] Add a "did you mean...?" functionnality
    - *When searching for an artist, the app only consider the first result of the array of artists returns by the Spotify API. However, there are some cases where the first result is not the actual searched artist. Hence, the app could show the other results to let the user verify its research.*
- [ ] Handle errors and mis-use
    - *Currently, the app does not handle error at all (e.g. network, authentification, artist not found, etc.), nor mis-use (e.g. adding same artist multiple times)*
- [ ] Increase performance
    - *Until now, the focus has been put on make the app works without any performance consideration (e.g. no focus on lazy-loading, page events, etc.)*
- [ ] Increase test coverage and acceptance tests
    - *Test coverage is already high since the app has been based on a TDD approach. It could however be improved.*
