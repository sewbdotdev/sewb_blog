export interface CategoryOrTag {
  id: string;
  title: string;
  slug: string;
}

export interface MetaData {
  page: number;
  pageCount: number;
  total: number;
  pageSize: number;
}

export interface CategoryOrTagResponse {
  data: {
    id: string;
    attributes: CategoryOrTag;
  }[];
  meta: {
    pagination: MetaData;
  };
}
