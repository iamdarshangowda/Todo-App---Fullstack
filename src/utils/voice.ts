export function decodeAudioData(buffer: ArrayBuffer) {
  let audioCtx = new AudioContext();
  let audioBuffer = audioCtx.decodeAudioData(buffer);
  audioCtx.close();
  return audioBuffer;
}
