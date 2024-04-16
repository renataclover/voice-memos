import {
  PlayIcon,
  StopIcon,
  Cross1Icon,
  Pencil2Icon,
} from '@radix-ui/react-icons';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MemoForm } from '@/components/MemoForm';
import { MemoListItem } from '@/components/MemosListItem';
import { useRecordMemo } from '@/hooks/useRecordMemo';
import { useMemos } from '@/hooks/useMemos';

export default function App() {
  const { memos, isLoading } = useMemos();
  const [showForm, setShowForm] = useState(false);
  const {
    recordNew,
    reRecord,
    stopRecording,
    cancelRecording,
    isRecording,
    microphoneState,
  } = useRecordMemo();
  const showMicrophoneError =
    !!microphoneState && microphoneState !== 'granted';

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col p-10 rounded-xl">
      <h1 className="text-3xl font-bold text-center">Your voice memos!</h1>
      {showMicrophoneError ? (
        <p className="text-center text-lg text-red-500 mt-4">
          Please allow access to the microphone to use this app
        </p>
      ) : null}
      <div className="flex flex-row items-center justify-center mt-10">
        {isRecording ? (
          <>
            <Button
              variant="default"
              onClick={stopRecording}
              disabled={!isRecording}
              className="mr-4 animate-pulse"
            >
              <StopIcon className="mr-1" /> Stop recording
            </Button>

            <Button variant="destructive" onClick={cancelRecording}>
              <Cross1Icon className="mr-1" /> Cancel
            </Button>
          </>
        ) : null}
        {!isRecording && !showForm ? (
          <>
            <Button
              variant="default"
              onClick={recordNew}
              disabled={showMicrophoneError || isLoading}
              className="mr-4"
            >
              <PlayIcon className="mr-1" /> Record new memo
            </Button>
            <Button
              variant="outline"
              onClick={toggleForm}
              disabled={isRecording || isLoading}
            >
              <Pencil2Icon className="mr-1" /> Write new memo
            </Button>
          </>
        ) : null}
        {showForm ? <MemoForm onDone={toggleForm} /> : null}
      </div>
      {isLoading ? (
        <>
          <Skeleton className="h-11 mb-1 mt-10 rounded-xl w-full" />
          <Skeleton className="h-11 mb-1 rounded-xl w-full" />
          <Skeleton className="h-11 rounded-xl w-full" />
        </>
      ) : (
        <div className="flex flex-row items-center justify-center mt-10">
          <ul className="w-full">
            {memos.map((item) => {
              return (
                <MemoListItem
                  key={`${item.id}-${item.text}`}
                  item={item}
                  reRecord={reRecord}
                />
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
