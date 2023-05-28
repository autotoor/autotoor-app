export interface WikipediaCoordinates {
  lat: number;
  lon: number;
  primary: boolean;
  globe: string;
}

export interface WikipediaThumbnail {
  source: string;
  width: number;
  height: number;
}

export interface WikipediaPageData {
  pageid: number;
  ns: number;
  title: string;
  coordinates: WikipediaCoordinates[];
  thumbnail?: WikipediaThumbnail;
  description: string;
  descriptionsource: string;
}

export interface WikipediaPageSummary extends WikipediaPageData {
  index: number;
}

export interface WikipediaPageDetails extends WikipediaPageData {
  extract: string;
}

export interface WikipediaPageQueryResultList<ResponseType> {
  pages: ResponseType[];
}

export interface WikipediaLimits {
  coordinates: number;
}

export interface WikipediaResponse<ResponseType> {
  batchcomplete: boolean;
  query: WikipediaPageQueryResultList<ResponseType>;
  limits?: WikipediaLimits;
}

export interface WikipediaNearbyCriteria {
  ggsradius: number;
  ggslimit: number;
}
