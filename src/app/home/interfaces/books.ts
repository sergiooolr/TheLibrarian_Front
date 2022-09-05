import { VolumeInfoBD } from './addbookbd';
export interface Books {
  length: number;
  items: Item[];
}

export interface Item {
  id:         string;
  volumeInfo: VolumeInfo;

}

export interface VolumeInfo {
  title:               string;
  authors:             string[];
  publishedDate:       string;
  isbn:                string;
  description:         string;
  imageLinks:          ImageLinks;
  pageCount:           number;
  categories:          string[];
  language:            string;
  industryIdentifiers: IndustryIdentifier[];
  previewLink:         string;

}




export interface ImageLinks {
  smallThumbnail: string;
  thumbnail:      string;
}

export interface IndustryIdentifier {
  identifier: string;
}

export enum Idioma {
  En = "en",
  Es = "es",
}
