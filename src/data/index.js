import beatlesArtists from "./beatles_artists";
import rollingStonesArtists from "./rolling_stones_artists";
import beatlesAlbums from "./beatles_albums";
import rollingStonesAlbums from "./rolling_stones_albums";
import Artist from "../models/artist";

/**
 * @returns {Artist[]}
 */
export function initPrepopulatedData() {
  let beatles = new Artist(beatlesArtists.items[0]);
  let rollingStones = new Artist(rollingStonesArtists.items[0]);
  beatles.addDiscography(beatlesAlbums.items);
  rollingStones.addDiscography(rollingStonesAlbums.items);
  return [beatles, rollingStones];
}
