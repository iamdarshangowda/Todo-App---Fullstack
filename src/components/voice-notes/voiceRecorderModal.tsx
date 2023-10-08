import PrimaryButton from '@components/common/buttons/primaryButton';
import { CloseIcon } from '@components/common/icons/icons';
import TasksInput from '@components/common/inputs/tasksInput';
import Modal from '@components/common/modal/modal';
import { useUIHelperContext } from '@context/useUIHelperContext';
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';
import useMediaRecorder from '../../hooks/useMediaRecorder';
import { IVoiceNotesList } from '@utils/types';
import { decodeAudioData } from '@utils/voice';
import { useVoiceNotesContext } from '@context/useVoiceNotes';
import StartRecordButton from './startRecordButton';
import StopRecordButton from './stopRecordButton';

interface IVoiceRecorderModal {
  setShowVoiceRecorder: Dispatch<SetStateAction<boolean>>;
  showVoiceRecorder: boolean;
  callback?: () => void;
}

const VoiceRecorderModal = (props: IVoiceRecorderModal) => {
  const { voiceNotesList, setVoiceNotesList } = useVoiceNotesContext();
  const { setShowVoiceRecorder, showVoiceRecorder, callback } = props;
  const [recStatus, setRecStatus] = useState('Record');
  const [isRecording, setIsRecording] = useState(false);
  let durationTimerRef = useRef<NodeJS.Timer>();
  const [duration, setDuration] = useState<number>(0);
  const [recordedBlob, setRecordedBlob] = useState<{
    title: string;
    url: string;
    blob: Blob | undefined;
  }>({ title: '', url: '', blob: undefined });
  const { loading, setLoading } = useUIHelperContext();

  const handleCloseModal = () => {
    if (isRecording) {
      stopRecording();
    }
    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current);
    }

    setRecStatus('Record');
    setRecordedBlob({ title: '', url: '', blob: undefined });
    setDuration(0);
    setShowVoiceRecorder((prev) => !prev);
  };

  const onStop = async (url: string, blob: Blob) => {
    setIsRecording(false);
    setRecStatus('Record');
    setRecordedBlob((prev) => ({ ...prev, url: url, blob: blob }));
    clearInterval(durationTimerRef.current);
  };

  const handleSave = async () => {
    if (!recordedBlob.blob) return;
    const buffer = await recordedBlob.blob.arrayBuffer();

    const id = `blob-${Date.now()}`;
    if (typeof window !== 'undefined') {
      // Save Blob to IndexDB
      const { set, createStore } = await (() => import('idb-keyval'))();
      await set(id, recordedBlob.blob, createStore('voice-notes', 'recordings'));

      const decodeBuffer = await decodeAudioData(buffer);
      const newNote: IVoiceNotesList = {
        id: id,
        duration: decodeBuffer.duration,
        createdAt: new Date(),
        title: recordedBlob.title,
      };

      // Update Local storage
      saveToLocal(newNote);
      handleCloseModal();
    }
  };

  const saveToLocal = useCallback(
    (voiceNote: IVoiceNotesList) => {
      let updatedVoiceNotes = [...voiceNotesList];
      if (voiceNote) {
        updatedVoiceNotes = [...voiceNotesList, voiceNote];
      }
      localStorage.setItem(`voice-notes`, JSON.stringify(updatedVoiceNotes));
      setVoiceNotesList(updatedVoiceNotes);
    },
    [voiceNotesList]
  );

  const onStart = () => {
    setIsRecording(true);
    setRecStatus('Stop');
    durationTimerRef.current = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
  };

  const { startRecording, stopRecording } = useMediaRecorder({ onStop, onStart });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRecordedBlob((prev) => ({ ...prev, title: value }));
  };

  return (
    <Modal setShow={() => {}} show={showVoiceRecorder}>
      <div className="bg-cream_light p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-heading-2/h1 hover:cursor-pointer">Add Voice Note:</h2>
          <div onClick={handleCloseModal} className="hover:cursor-pointer p-2">
            <CloseIcon />
          </div>
        </div>
        <div className="flex flex-col space-y-4 mt-6">
          {recordedBlob.blob && (
            <div className="flex flex-col gap-5 items-center ">
              <TasksInput
                value={recordedBlob.title}
                type={'text'}
                placeholder={'Add title'}
                name={'title'}
                onChange={handleInputChange}
              />
              <audio src={recordedBlob.url} controls preload="metadata"></audio>
            </div>
          )}

          <p className="text-heading-1/h2 text-center">{duration}s</p>
          {isRecording ? (
            <p className="text-body-1/b1 text-center">Recording...</p>
          ) : null}

          <div className="flex flex-col justify-center items-center">
            {isRecording ? (
              <>
                <StopRecordButton handleRecord={stopRecording} />
              </>
            ) : (
              <StartRecordButton handleRecord={startRecording} />
            )}

            <p className="text-body-1/b1">{recStatus}</p>
          </div>

          {recordedBlob.blob && (
            <div className="flex gap-4">
              <PrimaryButton
                text={`Save Note`}
                type="button"
                disable={loading}
                onClick={handleSave}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default VoiceRecorderModal;
