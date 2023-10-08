import React, { useState } from 'react';

interface IAudioPlayerProps {
  url: string;
}

const AudioPlayer = (props: IAudioPlayerProps) => {
  const { url } = props;
  const [duration, setDuration] = useState(0);
  const handlePlay = (e: any) => {
    console.log('PLAY', e.target.duration);
    setDuration(e.target.duration);
  };

  return (
    <div>
      <audio src={url} controls onPlay={handlePlay}></audio>
      <p>Duration: {duration}</p>
    </div>
  );
};

export default AudioPlayer;
