export type PartResult = "OK" | "NG";

export type PartData = {
  id: number;
  area: string;
  prefix: string;
  partCode: string;
  fullCode: string;
  result: PartResult;
  stampDate: string;
  detailProblem: string;
  createdAt: string;
};

export type PartFormData = {
  area: string;
  partCode: string;
  result: PartResult;
  stampDate: string;
  detailProblem: string;
};