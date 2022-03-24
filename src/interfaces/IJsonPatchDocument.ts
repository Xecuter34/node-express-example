export interface IJsonPatchDocument {
  from?: string;
  op: Operation;
  path: string;
  value: Record<string, any> | string | number;
}

export type Operation = 'add' | 'copy' | 'move' | 'remove' | 'replace' | 'test';