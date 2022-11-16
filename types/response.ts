export interface ResponseData<T> {
  data?: T;
  status?: boolean;
  error?: {
    message: string;
  };
}
