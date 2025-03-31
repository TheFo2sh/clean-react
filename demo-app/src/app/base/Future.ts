export type Future<T> = {Value: T  , Error: Error | null , IsPending: boolean  }
export type Operational<T> = {id: string , object : T | Future<T> , status: 'Idle' | 'Running' };