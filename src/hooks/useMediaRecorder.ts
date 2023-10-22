import { useCallback, useEffect, useRef } from "react";

export type ReactMediaRecorderHookProps = {
  onStop: (blobUrl: string, blob: Blob) => void;
  onStart: () => void;
};

const useMediaRecorder = ({
  onStop = (url: string, blob: Blob) => null,
  onStart,
}: ReactMediaRecorderHookProps) => {
  const options = { mimeType: "audio/webm;codecs=opus" };
  const mediaRecorder = useRef<any | null>(null);
  const mediaChunks = useRef<Blob[]>([]);
  const mediaStream = useRef<MediaStream | null>(null);

  const getMediaStream = useCallback(async () => {
    try {
      let stream: MediaStream | null = await window.navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then((mediaStream) => mediaStream)
        .catch(() => {
          return null;
        });
      mediaStream.current = stream;
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!window.MediaRecorder) {
      throw new Error("Unsupported Browser");
    }

    if (!mediaStream.current) {
      getMediaStream();
    }

    return () => {
      if (mediaStream.current) {
        const tracks = mediaStream.current.getTracks();
        tracks.forEach((track) => track.clone().stop());
      }
    };
  }, [getMediaStream]);

  const startRecording = async () => {
    if (!mediaStream.current) {
      await getMediaStream();
    }
    if (mediaStream.current) {
      const isStreamEnded = mediaStream.current
        .getTracks()
        .some((track: any) => track.readyState === "ended");
      if (isStreamEnded) {
        await getMediaStream();
      }

      if (!mediaStream.current.active) {
        return;
      }

      try {
        mediaRecorder.current = new MediaRecorder(mediaStream.current, options);
      } catch (error) {
        mediaRecorder.current = new MediaRecorder(mediaStream.current, {
          mimeType: "audio/mp4",
        });
      }

      mediaRecorder.current.ondataavailable = onRecordingActive;
      mediaRecorder.current.onstop = onRecordingStop;
      mediaRecorder.current.onstart = onRecordingStart;

      mediaRecorder.current.start();
      console.log("REC STARTED");
    }
  };

  const onRecordingActive = async ({ data }: BlobEvent) => {
    mediaChunks.current.push(data);
  };

  function onRecordingStart() {
    onStart();
  }

  const onRecordingStop = async () => {
    const [chunk] = mediaChunks.current;
    let format =
      chunk.type === "audio/mp4"
        ? { type: "audio/mp4" }
        : { type: "audio/wav" };
    const blobProperty: BlobPropertyBag = Object.assign(
      { type: chunk.type },
      format
    );

    let blob: any;
    let url: string = "";
    blob = new Blob(mediaChunks.current, blobProperty);
    url = URL.createObjectURL(blob);
    onStop(url, blob);
  };

  const stopRecording = async () => {
    if (mediaRecorder.current) {
      if (mediaRecorder.current.state !== "inactive") {
        mediaRecorder.current.stop();
        console.log("REC STOPPED");
        try {
          mediaStream.current &&
            mediaStream.current.getTracks().forEach((track) => track.stop());
        } catch (err: any) {
          console.log("Couldn't stop media stream", err);
        }

        mediaChunks.current = [];
      }
    }
  };

  return {
    startRecording,
    stopRecording,
  };
};

export default useMediaRecorder;
