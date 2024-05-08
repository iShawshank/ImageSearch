export interface IFlickrData {
  photos: IFlickrStat;
  stat: string;
}

interface IFlickrStat {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: IFlickrPhoto[];
}

export interface IFlickrPhoto {
  farm: number;
  id: string;
  isfamily: boolean;
  isfriend: boolean;
  ispublic: boolean;
  owner: string;
  secret: string;
  server: string;
  title: string;
}
