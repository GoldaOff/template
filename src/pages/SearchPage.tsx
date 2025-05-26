import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArtistCard } from '../components/ArtistCard';
import { TrackCard } from '../components/TrackCard';
import { SearchForm } from '../components/SearchForm';
import { search } from '../api/lastfm';
import { Artist, Track } from '../utils/types';
import { handleError } from '../utils/errorHandler';

/**
 * Страница поиска: отображает результаты поиска артистов и треков
 */
export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      try {
        const results = await search(query);
        setArtists(results.artists);
        setTracks(results.tracks);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="search-page">
      <SearchForm initialQuery={query} />
      
      {loading ? (
        <div className="loading">Searching...</div>
      ) : (
        <>
          {artists.length > 0 && (
            <section className="search-artists">
              <h2>Artists</h2>
              <div className="artists-grid">
                {artists.map((artist) => (
                  <ArtistCard key={artist.name} artist={artist} />
                ))}
              </div>
            </section>
          )}

          {tracks.length > 0 && (
            <section className="search-tracks">
              <h2>Tracks</h2>
              <div className="tracks-grid">
                {tracks.map((track) => (
                  <TrackCard key={`${track.name}-${track.artist}`} track={track} />
                ))}
              </div>
            </section>
          )}

          {!loading && artists.length === 0 && tracks.length === 0 && query && (
            <div className="no-results">
              No results found for "{query}"
            </div>
          )}
        </>
      )}
    </div>
  );
}; 