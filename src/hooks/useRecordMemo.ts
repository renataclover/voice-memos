import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useMemos } from '@/hooks/useMemos';
import SpeechRecognitionService from '@/services/SpeechRecognition';

export const SpeechRecognitionContext = createContext<SpeechRecognitionService>(
  new SpeechRecognitionService()
);

export const useRecordMemo = () => {
  const { save } = useMemos();
  const recognitionService = useContext(SpeechRecognitionContext);
  const [microphoneState, setMicrophoneState] =
    useState<PermissionState | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [currentMemoId, setCurrentMemoId] = useState<number | undefined>(
    undefined
  );

  const recognitionListener = useCallback(
    async (results: SpeechRecognitionResult[]) => {
      if (isRecording) {
        return;
      }

      await save(
        results.map((result) => result[0].transcript).join(''),
        currentMemoId
      );
      setCurrentMemoId(undefined);
    },
    [isRecording, save, currentMemoId]
  );

  useEffect(() => {
    navigator.permissions
      .query({
        // using type casting due to https://github.com/microsoft/TypeScript/issues/33923
        name: 'microphone' as PermissionName,
      })
      .then((permissionStatus) => {
        setMicrophoneState(permissionStatus.state);

        if (permissionStatus.state === 'prompt') {
          navigator.mediaDevices.getUserMedia({ audio: true });
        }

        permissionStatus.onchange = () => {
          setMicrophoneState(permissionStatus.state);
        };
      });
  }, []);

  useEffect(() => {
    recognitionService.setRecognitionListener(recognitionListener);
  }, [recognitionService, recognitionListener]);

  const recordNew = () => {
    setIsRecording(true);
    recognitionService.startRecognition();
  };

  const reRecord = (id: number) => {
    setCurrentMemoId(id);
    recordNew();
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognitionService.stopRecognition();
  };

  const cancelRecording = () => {
    setIsRecording(false);
    recognitionService.cancelRecognition();
  };

  return {
    microphoneState,
    isRecording,
    recordNew,
    reRecord,
    stopRecording,
    cancelRecording,
  };
};
