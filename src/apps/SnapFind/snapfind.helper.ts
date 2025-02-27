import Axios from "axios";

interface Response {
  data: {
    total_pages: number;
    total: number;
    results: Image[]
  }
}

export interface Image {
  id: string;
  descripition: string,
  blur_hash: string;
  color: string,
  downloads: number,
  likes: number,
  height: number,
  width: number,
  links: {
    download: string,
  }
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

export const unsplashImages = async (query: string, page: number, orientation: string | null) => {
  const params: any = { query, page, per_page: 50 };
  orientation && (params['orientation'] = orientation);
  const { data }: Response = await unsplash.get("/search/photos", { params });

  return data
}

export function getComplementaryColor(hex: string): string {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse the hex string into its three components
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate the complement for each color component
  const rComplement = (255 - r).toString(16).padStart(2, '0');
  const gComplement = (255 - g).toString(16).padStart(2, '0');
  const bComplement = (255 - b).toString(16).padStart(2, '0');

  // Combine the complements to get the complementary color
  return `#${rComplement}${gComplement}${bComplement}`;
}