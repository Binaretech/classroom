declare global {
  type ValueOf<T> = T[keyof T];

  type Merge<A, B> = {
    [K in keyof A]: K extends keyof B ? B[K] : A[K];
  } & B extends infer O
    ? { [K in keyof O]: O[K] }
    : never;

  type Keyable<T = unknown> = T & {
    key?: string;
  };

  type StaticPathProps = {
    params: { locale: string; route: string[] };
    locale: string;
  };

  type RootStackParamList = {
    'class/[id]': { id: string };
  };
}

// error
export {};
