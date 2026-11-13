const STORAGE_NAME = `keyvalue`;

export async function idbGetItem<T>(key: string): Promise<T | null> {
  return (await run(`readonly`, (store) => requestToPromise(store.get(key)))) ?? null;
}

export function idbGetKeys(): Promise<string[]> {
  return new Promise(async (resolve) => {
    const keys = await run(`readonly`, (store) => requestToPromise(store.getAllKeys()));
    resolve(keys.map((key) => key.toString()));
  });
}

export async function idbSetItem<T>(key: string, value: T): Promise<void> {
  await run(`readwrite`, (store) => requestToPromise(store.put(value, key)));
}

export function idbRemoveItem(key: string): Promise<void> {
  return run(`readwrite`, (store) => requestToPromise(store.delete(key)));
}

export function clear(): Promise<void> {
  return run(`readwrite`, (store) => requestToPromise(store.clear()));
}

let db: IDBDatabase | null = null;

async function run<T>(
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => Promise<T>,
): Promise<T> {
  if (!db) db = await openIDB();
  const tx = db.transaction(STORAGE_NAME, mode);
  const done = new Promise<void>((resolve) => {
    tx.oncomplete = () => resolve();
    tx.onabort = () => {
      throw tx.error ?? new Error(`Transaction aborted`);
    };
    tx.onerror = () => {
      tx.abort();
      throw tx.error ?? new Error(`Transaction failed`);
    };
  });

  try {
    const result = await operation(tx.objectStore(STORAGE_NAME));
    await done;
    return result;
  } catch (error) {
    try {
      tx.abort();
    } catch {
      // transaction may already have completed or aborted.
    }

    await done.catch(() => undefined);
    throw error;
  }
}

// init idb
export function openIDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(STORAGE_NAME);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORAGE_NAME)) {
        db.createObjectStore(STORAGE_NAME);
      }
    };

    request.onsuccess = () => {
      const db = request.result;

      db.onversionchange = () => db.close();

      resolve(db);
    };

    request.onerror = () => reject(request.error);

    request.onblocked = () => console.warn(`Database upgrade blocked by another connection.`);
  });
}

export function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
