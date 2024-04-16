import { useState } from 'react';
import { PlayIcon, TrashIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useMemos } from '@/hooks/useMemos';
import type { Memo } from '@/services/MemosStorage';
import { useSnackbar } from 'notistack';

export const MemoListItem = ({
  item,
  reRecord,
}: {
  item: Memo;
  reRecord: (id: number) => void;
}) => {
  const { remove, save } = useMemos();
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState<string>(item.text);

  const onChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      setValue(e.target.value);
    } catch (error) {
      enqueueSnackbar('Failed to save changes.', { variant: 'error' });
    }
  };

  const onDelete = async () => {
    await remove(item.id);
  };

  const onReRecord = () => {
    reRecord(item.id);
  };

  const onBlur = async () => {
    if (value.length && value !== item.text) {
      await save(value, item.id);
    }
  };

  return (
    <li className="flex flex-row items-center group">
      <Textarea
        className="flex-1 my-1 mr-2"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={1}
      />
      <div className="invisible group-hover:visible">
        <Button size="sm" variant="outline" className="mr-2" onClick={onDelete}>
          <TrashIcon color="red" />
        </Button>
        <Button size="sm" variant="outline" onClick={onReRecord}>
          <PlayIcon color="blue" />
        </Button>
      </div>
    </li>
  );
};
