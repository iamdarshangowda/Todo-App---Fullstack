'use client';
import React, { useEffect, useState } from 'react';
import { useVoiceNotesContext } from '@context/useVoiceNotes';
import AudioPlayer from '@components/voice-notes/audioPlayer';
import SecondaryButton from '@components/common/buttons/secondaryButton';
import { RecMicIcon } from '@components/common/icons/icons';
import SingleTaskSkeleton from '@components/common/skeletons/singleTaskSkeleton';
import { useUIHelperContext } from '@context/useUIHelperContext';
import VoiceRecorderModal from '@components/voice-notes/voiceRecorderModal';

const VoiceNotes = () => {
  const { voiceNotesList, setVoiceNotesList } = useVoiceNotesContext();
  const { loading, setLoading } = useUIHelperContext();
  const [searchText, setSearchText] = useState<string>('');
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);

  useEffect(() => {
    let voiceNotes = localStorage.getItem('voice-notes');
    if (voiceNotes) {
      setVoiceNotesList(JSON.parse(voiceNotes));
    } else {
      setVoiceNotesList([]);
    }
    setLoading(false);
  }, []);

  const handleVoiceNote = () => {
    setShowVoiceRecorder(true);
  };

  return (
    <div>
      <div className="flex gap-2 sm:gap-4 w-full justify-between sm:justify-start">
        <SecondaryButton
          text="Add Voice Note"
          onClick={handleVoiceNote}
          icon={<RecMicIcon />}
        />
      </div>

      <VoiceRecorderModal
        setShowVoiceRecorder={setShowVoiceRecorder}
        showVoiceRecorder={showVoiceRecorder}
      />

      <div className="flex flex-col space-y-2 overflow-y-scroll h-[calc(95vh-200px)] last:pb-5 scrollbar-hide mt-5">
        {loading ? (
          Array(3)
            .fill('')
            .map((data, index) => <SingleTaskSkeleton key={index} />)
        ) : (
          <>
            {voiceNotesList.length > 0 ? (
              voiceNotesList.map((note) => <AudioPlayer note={note} key={note.id} />)
            ) : (
              <h2 className="text-grey-40 text-body-1/b2 text-center mt-5">
                {searchText.length ? 'No tasks found' : `No Voice Notes Added!`}
              </h2>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VoiceNotes;
