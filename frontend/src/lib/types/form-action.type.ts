export type FormAction<T> =
  | {
      status: true;
      data: T;
    }
  | {
      status: false;
      message: string | string[];
    };
