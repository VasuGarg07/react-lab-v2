import Axios from "axios";

interface Response {
  data: {
    total_pages: number;
    total: number;
    results: Image[]
  }
}

export interface Image {
  id: string,
  descripition: string,
  blur_hash: string;
  color: string,
  downloads: number,
  likes: number,
  height: number,
  width: number,
  urls: {
    full: string,
    regular: string,
  },
  user: {
    name: string,
    instagram_username: string,
    profile_image: {
      large: string,
      medium: string,
      small: string
    }
  }
}

export enum Orientation {
  Landscape = 'landscape',
  Portrait = 'portrait',
  Squarish = 'squarish'
}

const unsplash = Axios.create(
  {
    baseURL: 'https://api.unsplash.com',
    headers: {
      Authorization: "Client-ID B9-8fGMMlWiTmrQBsaZTJp5yb7ZCAcbcG9tMQIrJ_rA",
    }
  }
);

export const unsplashImages = async (query: string, page: number,) => {
  const { data }: Response = await unsplash.get("/search/photos", {
    params: { query, page, per_page: 50 }
  });

  return data
}

