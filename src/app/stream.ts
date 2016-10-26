export interface Stream {
  _id: string;
  channelId: string;
  name: string;
  artists: string[];
  artistsId: string;
  startTime: Date;
  songId: string;
  cover?: string;
}
