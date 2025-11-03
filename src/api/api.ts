import { MediaItemSchema } from './types';

export async function getData() {
  const response = await fetch('/data.json');
  const data = await response.json();
  const validData = MediaItemSchema.array().safeParse(data);

  if (validData.success) {
    return validData.data;
  }
};