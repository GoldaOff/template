import { Artist, Track, SearchResult, ApiError } from '../utils/types';
import { getImageUrl } from '../utils/getImageUrl';

const API_KEY = 'f90978621274b6cf7d5f89939f864c6b';
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

/**
 * Обрабатывает ошибки API и выбрасывает их в формате ApiError
 */
function handleApiError(error: any): never {
  const apiError: ApiError = {
    message: error.message || 'An unexpected error occurred',
    code: error.code || 500
  };
  throw apiError;
}

/**
 * Выполняет запрос к API Last.fm
 * @param method - метод API
 * @param params - параметры запроса
 */
async function fetchLastFm(method: string, params: Record<string, string>): Promise<any> {
  const queryParams = new URLSearchParams({
    method,
    api_key: API_KEY,
    format: 'json',
    ...params
  });

  try {
    const response = await fetch(`${BASE_URL}?${queryParams}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error);
  }
}

/**
 * Получить список топ-артистов
 * @param limit - количество записей
 */
export async function getTopArtists(limit: number): Promise<Artist[]> {
  try {
    const data = await fetchLastFm('chart.gettopartists', { limit: limit.toString() });
    const artists = data.artists.artist;
    const detailedArtists = await Promise.all(
      artists.map(async (artist: any) => {
        try {
          const info = await fetchLastFm('artist.getInfo', { artist: artist.name });
          let image = getImageUrl(info.artist.image);
          if (!image) {
            const search = await fetchLastFm('artist.search', { artist: artist.name });
            image = getImageUrl(search.results.artistmatches.artist[0]?.image);
          }
          return {
            name: artist.name,
            image,
            url: artist.url,
            listeners: parseInt(artist.listeners)
          };
        } catch {
          return {
            name: artist.name,
            image: getImageUrl(artist.image),
            url: artist.url,
            listeners: parseInt(artist.listeners)
          };
        }
      })
    );
    return detailedArtists;
  } catch (error) {
    handleApiError(error);
  }
}

/**
 * Получить список топ-треков
 * @param limit - количество записей
 */
export async function getTopTracks(limit: number): Promise<Track[]> {
  try {
    const data = await fetchLastFm('chart.gettoptracks', { limit: limit.toString() });
    const tracks = data.tracks.track;
    const detailedTracks = await Promise.all(
      tracks.map(async (track: any) => {
        try {
          const info = await fetchLastFm('track.getInfo', { artist: track.artist.name, track: track.name });
          let image = getImageUrl(info.track.album?.image);
          if (!image) {
            const search = await fetchLastFm('track.search', { track: track.name, artist: track.artist.name });
            image = getImageUrl(search.results.trackmatches.track[0]?.image);
          }
          let duration = info.track.duration || track.duration;
          if (duration && duration.length > 3) {
            duration = Math.floor(Number(duration) / 1000).toString();
          }
          return {
            name: track.name,
            artist: track.artist.name,
            duration,
            image,
            url: track.url
          };
        } catch {
          return {
            name: track.name,
            artist: track.artist.name,
            duration: track.duration,
            image: getImageUrl(track.image),
            url: track.url
          };
        }
      })
    );
    return detailedTracks;
  } catch (error) {
    handleApiError(error);
  }
}

/**
 * Поиск артистов и треков по строке
 * @param query - поисковый запрос
 */
export async function search(query: string): Promise<SearchResult> {
  try {
    const [artistsData, tracksData] = await Promise.all([
      fetchLastFm('artist.search', { artist: query }),
      fetchLastFm('track.search', { track: query })
    ]);

    return {
      artists: artistsData.results.artistmatches.artist.map((artist: any) => ({
        name: artist.name,
        image: getImageUrl(artist.image),
        url: artist.url
      })),
      tracks: tracksData.results.trackmatches.track.map((track: any) => ({
        name: track.name,
        artist: track.artist,
        duration: track.duration,
        image: getImageUrl(track.image),
        url: track.url
      }))
    };
  } catch (error) {
    handleApiError(error);
  }
} 