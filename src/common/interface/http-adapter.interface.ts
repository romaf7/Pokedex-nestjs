
export interface HttpAdapter{
  get<T>(urls: string): Promise<T>;
}