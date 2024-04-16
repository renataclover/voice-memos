import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import MemosStorage, { Memo } from '@/services/MemosStorage';
import { useSnackbar } from 'notistack';

type MemosStorageContextType = {
  memos: Memo[];
  isLoading: boolean;
  save: (value: string, id?: number) => Promise<number | void>;
  remove: (id: number) => Promise<void>;
};

export const MemosStorageContext = createContext<MemosStorageContextType>({
  memos: [],
  isLoading: true,
  save: async () => {},
  remove: async () => {},
});

export default function MemosProvider({
  storage,
  children,
}: {
  storage: MemosStorage;
  children: ReactNode;
}) {
  const [memos, setMemos] = useState<Memo[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    storage
      .getAll()
      .then((memos) => {
        setMemos(memos.sort((a, b) => b.id - a.id));
        setIsLoading(false);
      })
      .catch(() => {
        enqueueSnackbar('Failed to load memos', { variant: 'error' });
      });
  }, [enqueueSnackbar, storage]);

  const save = useCallback(
    async (value: string, id?: number) => {
      try {
        const savedId = await storage.saveOne(value, id);

        setMemos((prev) => {
          if (!id) {
            return [{ id: savedId, text: value }, ...prev];
          }

          return prev.map((memo) => {
            if (memo.id === id) {
              return { ...memo, text: value };
            }
            return memo;
          });
        });
        enqueueSnackbar('Item saved.', { variant: 'success' });
        return savedId;
      } catch (error) {
        enqueueSnackbar('Failed to save item.', { variant: 'error' });
      }
    },
    [storage, enqueueSnackbar]
  );

  const remove = useCallback(
    async (id: number) => {
      try {
        await storage.delete(id);
        setMemos((prev) => prev.filter((memo) => memo.id !== id));
        enqueueSnackbar('Item deleted.', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar('Failed to delete item.', { variant: 'error' });
      }
    },
    [storage, enqueueSnackbar]
  );

  return (
    <MemosStorageContext.Provider value={{ memos, isLoading, save, remove }}>
      {children}
    </MemosStorageContext.Provider>
  );
}
