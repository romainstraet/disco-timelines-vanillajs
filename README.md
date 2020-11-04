# 💿 Discography Timelines

[Live version here](https://disco-timelines.web.app/)

**Discography Timelines** is a personal project aiming to
present every album released by an artist on a timeline (based on the
release date of the album).

The app allows users to add the discography of different artists of
their choice by consuming the [Spotify Web API](https://developer.spotify.com/documentation/web-api/).

From a technical point of view, the goal was to build a front-end only
website based on **TDD** and on a **frameworkless** philosophy. This project has therefore been built with HTML, CSS and **Vanilla Javascript** only (no vue/react, no bootstrap, or whatever).

## To Do

- [x] Make design responsive and enhance some styling (v0.2)
- [x] Fetch more than 50 albums when appropriate (e.g. Bob Dylan)
  - _Spotify returns max 50 album objects on each request. Hence, If an artist has released more than 50 albums, the artist's timeline is incomplete._
- [ ] Add a "did you mean...?" functionnality
  - _When searching for an artist, the app only consider the first result of the array of artists returns by the Spotify API. However, there are some cases where the first result is not the actual searched artist. Hence, the app could show the other results to let the user verify its research._
- [x] Handle errors and mis-use
  - _Currently, the app does not handle error at all (e.g. network, authentification, artist not found, etc.), nor mis-use (e.g. adding same artist multiple times)_
- [ ] Increase performance
  - _Until now, the focus has been put on make the app works without any performance consideration (e.g. no focus on lazy-loading, page events, etc.)_
- [ ] Increase test coverage and acceptance tests
  - _Test coverage is already high since the app has been based on a TDD approach. It could however be improved._

## Things I've learned (so far)

- It's not (that) complicated to build a frameworkless app.
- JSDOC is a good compromise between pure javascript and typescript.
- The Observer pattern.
- A bit of sass, babel and webpack.
- [This github workflow](https://nvie.com/posts/a-successful-git-branching-model/)
- Modeling the data is big part of the job (cleaning names, avoid duplicates, etc.).
- Create abstract classes in pure javascript.
- [This simple but useful pattern](https://kyleshevlin.com/how-to-write-your-own-javascript-dom-element-factory).
- TDD forces you to build testable app (_de facto_...).
