import React, { useEffect, useState } from 'react';
import { ArtistCard } from '../components/ArtistCard';
import { TrackCard } from '../components/TrackCard';
import { SearchForm } from '../components/SearchForm';
import { getTopArtists, getTopTracks } from '../api/lastfm';
import { Artist, Track } from '../utils/types';
import { handleError } from '../utils/errorHandler';

/**
 * Главная страница: отображает топ артистов и треков
 */
export const HomePage: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistsData, tracksData] = await Promise.all([
          getTopArtists(10),
          getTopTracks(10)
        ]);
        setArtists(artistsData);
        setTracks(tracksData);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-page">
      <SearchForm />
      <section className="top-artists">
        <h2>Top Artists</h2>
        <div className="artists-grid">
          {artists.map((artist) => (
            <ArtistCard key={artist.name} artist={artist} />
          ))}
        </div>
      </section>
      <section className="top-tracks">
        <h2>Top Tracks</h2>
        <div className="tracks-grid">
          {tracks.map((track) => (
            <TrackCard key={`${track.name}-${track.artist}`} track={track} />
          ))}
        </div>
      </section>
    </div>
  );
}; 