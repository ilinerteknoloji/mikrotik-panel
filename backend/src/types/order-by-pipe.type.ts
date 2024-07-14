export type OrderByPipeType<T> = {
  key: keyof T;
  order: "asc" | "desc";
};
