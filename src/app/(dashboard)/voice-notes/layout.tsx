'use client';

import TaskHeaderwithCount from '@components/common/ui-components/taskHeaderwithCount';
import { useVoiceNotesContext } from '@context/useVoiceNotes';
import React from 'react';

const VoiceNotesLayout = ({ children }: any) => {
  const { voiceNotesList } = useVoiceNotesContext();
  return (
    <div className={`w-full space-y-6 sm:space-y-10 overflow-y-scroll scrollbar-hide`}>
      <TaskHeaderwithCount
        title={'Voice Notes'}
        count={voiceNotesList.length}
        loading={false}
      />
      {children}
    </div>
  );
};

export default VoiceNotesLayout;
