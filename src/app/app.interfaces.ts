export interface Play {
  id: number;
  trackId: string;
  startTime?: Date;
  channel?: number;
  track: Track;
}

export interface Spotify {
  id: number;
  trackId?: number;
  cover?: string;
  url?: string;
  spotifyId?: string;
  spotifyName?: string;
  durationMs?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PlaysByDay {
  day: string;
  count: string;
}

export interface Track {
  id: number;
  songId: string;
  name: string;
  plays?: number;
  artists?: Artist[];
  createdAt?: Date;
  updatedAt?: Date;
  playsByDay?: PlaysByDay[];
  spotify: Spotify;
}

export interface Artist {
  id?: number;
  name?: string;
  artist_track: ArtistTrack;
}

export interface ArtistTrack {
  trackId: string;
  artistId: number;
}
