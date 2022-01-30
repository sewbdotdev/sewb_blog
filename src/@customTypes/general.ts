export type Pagination = {
  page: number;
  pageCount: number;
  total: number;
  pageSize: number;
};

export type Author = {
  id: string;
  attributes: {
    username: string;
  };
};

export type Image = {
  id: string;
  attributes: {
    width: number;
    height: number;
    altenativeText: string;
    caption: string;
    url: string;
  };
};

export type APIResponse = {
  meta: {
    pagination: Pagination;
  };
};
