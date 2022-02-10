enum Type {
  CLASSIC = "CLASSIC",
  SERVER_SIDE = "SERVER_SIDE",
  MVT = "MVT",
}

export enum Status {
  DRAFT = "DRAFT",
  ONLINE = "ONLINE",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
}

export interface Site {
  id: number;
  url: string;
}

export interface Test {
  id: number;
  name: string;
  type: Type;
  status: Status;
  siteId: 1 | 2 | 3;
}

export enum SortNames {
  STATUS = 'status',
  NAME = 'name',
  TYPE = 'type',
  SITE = 'siteId',
}

export enum SortDirection {
  ASC = 'asc',
  DECS = 'desc',
}

export enum Colors {
  RED = "red",
  PURPLE = "purple",
  BLUE = "blue",
}