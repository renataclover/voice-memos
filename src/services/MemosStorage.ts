import { DBSchema, IDBPDatabase, openDB } from 'idb';

interface MemosDB extends DBSchema {
  memos: {
    key: number;
    value: string;
  };
}

export type Memo = {
  id: number;
  text: string;
};

export default class MemosStorage {
  private db: IDBPDatabase<MemosDB> | null = null;

  constructor() {}

  async initialize() {
    this.db = await openDB<MemosDB>('Voice-memos', 1, {
      upgrade(db) {
        db.createObjectStore('memos', {
          autoIncrement: true,
        });
      },
    });
  }

  async getAll() {
    if (!this.db) {
      throw new Error('Database is not initialized');
    }

    const tx = this.db.transaction('memos', 'readonly');
    const store = tx.objectStore('memos');
    const memos = await store.getAll();
    const keys = await store.getAllKeys();

    await tx.done;

    return memos.map((text, index) => ({ id: keys[index], text }));
  }

  async saveOne(value: string, id?: number) {
    if (!this.db) {
      throw new Error('Database is not initialized');
    }

    const tx = this.db.transaction('memos', 'readwrite');
    const store = tx.objectStore('memos');

    const savedId = await store.put(value, id);
    await tx.done;

    return savedId;
  }

  async delete(id: number) {
    if (!this.db) {
      throw new Error('Database is not  dasdasdads initialized');
    }

    const tx = this.db.transaction('memos', 'readwrite');
    const store = tx.objectStore('memos');
    await store.delete(id);
    await tx.done;
  }
}
