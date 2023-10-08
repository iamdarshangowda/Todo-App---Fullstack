import { IVoiceNotesList } from '@utils/types';
import { create } from 'zustand';

type IVoiceNotes = {
  voiceNotesList: IVoiceNotesList[];
  setVoiceNotesList: (voiceNotesList: IVoiceNotesList[]) => void;
};

export const useVoiceNotesContext = create<IVoiceNotes>((set, get) => ({
  voiceNotesList: [],
  setVoiceNotesList(voiceNotesList) {
    set({ voiceNotesList });
  },
}));
