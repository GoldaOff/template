export interface Artist {
  name: string;
  image: string;
  url: string;
  listeners?: number;
}

export interface Track {
  name: string;
  artist: string;
  duration: string;
  image: string;
  url: string;
}

export interface SearchResult {
  artists: Artist[];
  tracks: Track[];
}

export interface ApiError {
  message: string;
  code: number;
} 