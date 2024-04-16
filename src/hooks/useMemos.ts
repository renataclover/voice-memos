import { useContext } from 'react';
import { MemosStorageContext } from '@/components/providers/MemosProvider';

export const useMemos = () => {
  return useContext(MemosStorageContext);
};
