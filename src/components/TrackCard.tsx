import React from 'react';
import { Track } from '../utils/types';

interface TrackCardProps {
  track: Track;
}

/**
 * Карточка трека
 */
export const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  const formatDuration = (duration: string) => {
    const totalSeconds = parseInt(duration, 10);
    if (isNaN(totalSeconds) || totalSeconds === 0) return '—';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="track-card">
      <a href={track.url} target="_blank" rel="noopener noreferrer">
        <div className="track-image">
          <img src={track.image} alt={track.name} />
          <div className="track-play" title="Play">
            ▶
          </div>
        </div>
        <div className="track-info">
          <div className="track-title">{track.name}</div>
          <div className="track-artist">{track.artist}</div>
          <div className="track-duration">{formatDuration(track.duration)}</div>
        </div>
      </a>
    </div>
  );
}; 