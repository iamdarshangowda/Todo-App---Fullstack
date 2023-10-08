'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useMediaRecorder from '../../../hooks/useMediaRecorder';
import { useVoiceNotesContext } from '@context/useVoiceNotes';
import { IVoiceNotesList } from '@utils/types';
import { decodeAudioData } from '@utils/voice';
import AudioPlayer from '@components/voice-notes/audioPlayer';

const VoiceNotes = () => {
  const [audioURL, setAudioURL] = useState<any>([]);
  const { voiceNotesList, setVoiceNotesList } = useVoiceNotesContext();

  const onStop = async (url: string, blob: Blob) => {
    const buffer = await blob.arrayBuffer();
    setAudioURL((prev: any) => [...prev, url]);
    const id = `blob-${Date.now()}`;
    if (typeof window !== 'undefined') {
      // Save Blob to IndexDB
      const { set, createStore } = await (() => import('idb-keyval'))();
      await set(id, blob, createStore('voice-notes', 'recordings'));

      const decodeBuffer = await decodeAudioData(buffer);
      const newNote: IVoiceNotesList = {
        id: id,
        duration: decodeBuffer.duration,
        createdAt: new Date(),
      };

      // Update Local storage
      saveToLocal(newNote);
    }
  };

  const { startRecording, stopRecording } = useMediaRecorder({ onStop });

  useEffect(() => {
    let voiceNotes = localStorage.getItem('voice-notes');
    if (voiceNotes) {
      setVoiceNotesList(JSON.parse(voiceNotes));
    }
  }, []);

  const handleGetBlobURL = async () => {
    const blobIds = voiceNotesList.map((notes) => notes.id);
    const { getMany, createStore } = await (() => import('idb-keyval'))();
    const buffer = await getMany(blobIds, createStore('voice-notes', 'recordings'));

    let audioURL: string[] = [];
    buffer.forEach((buffer) => {
      const url = URL.createObjectURL(buffer);
      audioURL.push(url);
    });
    setAudioURL(audioURL);
  };

  useEffect(() => {
    if (!voiceNotesList.length || audioURL.length >= voiceNotesList.length) return;
    handleGetBlobURL();
  }, [voiceNotesList]);

  const saveToLocal = useCallback(
    (voiceNote: IVoiceNotesList) => {
      let updatedVoiceNotes = [...voiceNotesList, voiceNote];
      localStorage.setItem(`voice-notes`, JSON.stringify(updatedVoiceNotes));
      setVoiceNotesList(updatedVoiceNotes);
    },
    [voiceNotesList]
  );

  return (
    <div>
      <h1>VoiceNotes</h1>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      {/* <a onClick={handleDownload}>Download</a> */}

      {audioURL.map((url: string) => (
        <AudioPlayer url={url} key={url} />
      ))}
    </div>
  );
};

export default VoiceNotes;
