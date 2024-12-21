// types.ts
export interface Image {
  src: string;
  alt: string;
}

export interface Section {
  id: string;
  title: string;
}

export interface Profile {
  name: string;
  image: Image;
}

export interface WeddingDetails {
  date: string;
  time: string;
  venue: string;
  address: string;
}