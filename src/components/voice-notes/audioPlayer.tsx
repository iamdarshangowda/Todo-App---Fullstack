import { DeleteIcon } from '@components/common/icons/icons';
import { useThemeContext } from '@context/ThemeContext';
import { useVoiceNotesContext } from '@context/useVoiceNotes';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';
import { IVoiceNotesList } from '@utils/types';
import React, { useEffect, useState } from 'react';

interface IAudioPlayerProps {
  note: IVoiceNotesList;
}

const AudioPlayer = (props: IAudioPlayerProps) => {
  const { note } = props;
  const [url, setURL] = useState('');
  const { mode } = useThemeContext();
  const { voiceNotesList, setVoiceNotesList } = useVoiceNotesContext();

  const handleGetBlobURL = async () => {
    const { get, createStore } = await (() => import('idb-keyval'))();
    const buffer = await get(note.id, createStore('voice-notes', 'recordings'));
    const url = URL.createObjectURL(buffer);
    setURL(url);
  };

  useEffect(() => {
    if (!url) {
      handleGetBlobURL();
    }
  }, [note]);

  const handlePlaying = () => {
    console.log('playing');
  };

  const handlePause = () => {
    console.log('paused');
  };

  const handleDelete = async () => {
    const { del, createStore } = await (() => import('idb-keyval'))();
    await del(note.id, createStore('voice-notes', 'recordings'));

    const filteredList = voiceNotesList.filter((notes) => notes.id !== note.id);
    localStorage.setItem(`voice-notes`, JSON.stringify(filteredList));
    setVoiceNotesList(filteredList);
  };

  return (
    <div
      className={`${
        mode === 'dark' ? 'hover:bg-grey-70' : 'hover:bg-grey-10'
      }  dark: m-0 sm:mx-2 sm:first:mt-2 p-2 rounded-lg hover:cursor-pointer
     sm:hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col gap-5 justify-center border-b-2 border-t-2 border-b-amber-100`}
    >
      <div className="flex justify-between gap-2 w-full">
        <h2 className="text-body-1/b2 overflow-auto">
          {capitalizeFirstLetter(note.title)}
        </h2>
        <p>Duration: {note.duration.toFixed(2)}s</p>
      </div>
      <div className="flex justify-between gap-6 items-center">
        <audio
          src={url}
          controls
          preload="none"
          onPlaying={handlePlaying}
          onPause={handlePause}
        ></audio>
        <div onClick={handleDelete} className="cursor-pointer">
          <DeleteIcon fill={mode === 'dark' ? 'default' : '#bbb'} />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
