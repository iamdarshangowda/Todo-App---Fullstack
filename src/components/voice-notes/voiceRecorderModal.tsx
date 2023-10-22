import { CloseIcon } from "@components/common/icons/icons";
import TasksInput from "@components/common/inputs/tasksInput";
import Modal from "@components/common/modal/modal";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import useMediaRecorder from "../../hooks/useMediaRecorder";
import { IVoiceNotesList } from "@utils/types";
import { decodeAudioData } from "@utils/voice";
import { useVoiceNotesContext } from "@context/useVoiceNotes";
import Timer from "./timer";

interface IVoiceRecorderModal {
  setShowVoiceRecorder: Dispatch<SetStateAction<boolean>>;
  showVoiceRecorder: boolean;
  callback?: () => void;
}

const VoiceRecorderModal = (props: IVoiceRecorderModal) => {
  const { voiceNotesList, setVoiceNotesList } = useVoiceNotesContext();
  const { setShowVoiceRecorder, showVoiceRecorder, callback } = props;
  const [isRecording, setIsRecording] = useState(false);
  let durationTimerRef = useRef<NodeJS.Timer>();
  const [duration, setDuration] = useState<number>(0);
  const [recordedBlob, setRecordedBlob] = useState<{
    title: string;
    url: string;
    blob: Blob | undefined;
  }>({
    title: `Note ${voiceNotesList.length ? voiceNotesList.length + 1 : 1}`,
    url: "",
    blob: undefined,
  });

  const handleCloseModal = () => {
    if (isRecording) {
      stopRecording();
    }
    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current);
    }

    setRecordedBlob((prev) => ({
      ...prev,
      title: "",
      url: "",
      blob: undefined,
    }));
    setDuration(0);

    setShowVoiceRecorder((prev) => !prev);
  };

  const onStop = async (url: string, blob: Blob) => {
    setIsRecording(false);
    setRecordedBlob((prev) => ({ ...prev, url: url, blob: blob }));
    clearInterval(durationTimerRef.current);
  };

  const handleSave = async () => {
    if (!recordedBlob.blob) return;
    const buffer = await recordedBlob.blob.arrayBuffer();

    const id = `blob-${Date.now()}`;
    if (typeof window !== "undefined") {
      // Save Blob to IndexDB
      const { set, createStore } = await (() => import("idb-keyval"))();
      await set(
        id,
        recordedBlob.blob,
        createStore("voice-notes", "recordings")
      );

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
    durationTimerRef.current = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
  };

  const { startRecording, stopRecording } = useMediaRecorder({
    onStop,
    onStart,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRecordedBlob((prev) => ({ ...prev, title: value }));
  };

  const handleRestart = () => {
    if (isRecording) {
      stopRecording();
    }
    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current);
    }

    setRecordedBlob({ title: "", url: "", blob: undefined });
    setDuration(0);
    startRecording();
  };

  return (
    <Modal setShow={() => {}} show={showVoiceRecorder}>
      <div className="bg-cream_light p-6 relative">
        <div className="flex justify-between items-center">
          {recordedBlob.blob ? (
            <div>
              <input
                value={recordedBlob.title}
                name="title"
                type="text"
                placeholder="Add title"
                onChange={handleInputChange}
                className="bg-transparent p-2 text-body-1/b1"
              />
            </div>
          ) : (
            <p className="text-body-1/b1">
              Note {voiceNotesList.length ? voiceNotesList.length + 1 : 1}
            </p>
          )}
          <div
            onClick={handleCloseModal}
            className="hover:cursor-pointer absolute top-3 right-3 p-2"
          >
            <CloseIcon />
          </div>
        </div>

        {recordedBlob.blob ? (
          <div className="flex flex-col items-center mt-4">
            <audio src={recordedBlob.url} controls preload="metadata"></audio>
          </div>
        ) : null}

        <div className="flex flex-col items-center">
          <Timer
            duration={duration}
            onStart={startRecording}
            onStop={stopRecording}
            isRecording={isRecording}
            isRecordDataExists={recordedBlob.blob}
            handleSave={handleSave}
            handleRestart={handleRestart}
          />
        </div>
      </div>
    </Modal>
  );
};

export default VoiceRecorderModal;
