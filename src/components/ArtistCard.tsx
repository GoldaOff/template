import React from 'react';
import { Artist } from '../utils/types';

interface ArtistCardProps {
  artist: Artist;
}

/**
 * Карточка артиста
 */
export const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  return (
    <div className="artist-card">
      <a href={artist.url} target="_blank" rel="noopener noreferrer">
        <div className="artist-image">
          <img src={artist.image} alt={artist.name} />
        </div>
        <div className="artist-info">
          <h3>{artist.name}</h3>
          {artist.listeners && (
            <p className="listeners">{artist.listeners.toLocaleString()} listeners</p>
          )}
        </div>
      </a>
    </div>
  );
}; 