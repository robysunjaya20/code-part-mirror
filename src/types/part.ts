export type PartResult = "OK" | "NG";

export type AreaSetting = "RAK JIS" | "DOORSUB";

export type ShiftType = "SHIFT 1" | "SHIFT 2";

export type RackJisType =
  | "RAK JIS 1"
  | "RAK JIS 2"
  | "RAK JIS 3"
  | "RAK JIS 4"
  | "RAK JIS 5"
  | "RAK JIS 6"
  | "RAK JIS 7"
  | "RAK JIS 8";

export type PartData = {
  id: number;

  // Model
  area: string;

  prefix: string;
  partCode: string;
  fullCode: string;

  result: PartResult;

  stampDate: string;
  detailProblem: string;

  // Setting area kerja
  workArea: AreaSetting;
  rackJis: RackJisType | "";
  pic: string;
  shift: ShiftType;

  createdAt: string;
};

export type PartFormData = {
  // Model
  area: string;

  partCode: string;
  result: PartResult;

  stampDate: string;
  detailProblem: string;

  // Setting area kerja
  workArea: AreaSetting;
  rackJis: RackJisType | "";
  pic: string;
  shift: ShiftType;
};