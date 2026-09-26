"use client";

import {
  WORK_AREA_OPTIONS,
  RACK_JIS_OPTIONS,
  SHIFT_OPTIONS,
} from "@/data/partConfig";

import type {
  AreaSetting,
  RackJisType,
  ShiftType,
} from "@/types/part";

type Props = {
  area: AreaSetting;
  rackJis: RackJisType;
  pic: string;
  shift: ShiftType;
  workDate: string;

  onChangeArea: (value: AreaSetting) => void;
  onChangeRackJis: (value: RackJisType) => void;
  onChangePic: (value: string) => void;
  onChangeShift: (value: ShiftType) => void;
  onChangeWorkDate: (value: string) => void;

  onSave: () => void;
};

export default function AreaSetting({
  area,
  rackJis,
  pic,
  shift,
  workDate,
  onChangeArea,
  onChangeRackJis,
  onChangePic,
  onChangeShift,
  onChangeWorkDate,
  onSave,
}: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-3 py-2.5 sm:px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-base">
            ⚙️
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">
              Setting Area Kerja
            </h2>

            <p className="mt-0.5 text-[11px] font-medium text-slate-500">
              Setting area dan tanggal kerja sebelum mulai input data.
            </p>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          <div>
            <label
              htmlFor="workDate"
              className="mb-1 block text-[11px] font-bold text-slate-700"
            >
              Tanggal Kerja
            </label>

            <input
              id="workDate"
              type="date"
              value={workDate}
              onChange={(e) =>
                onChangeWorkDate(e.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-slate-800 shadow-sm outline-none transition hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="shift"
              className="mb-1 block text-[11px] font-bold text-slate-700"
            >
              Shift
            </label>

            <select
              id="shift"
              value={shift}
              onChange={(e) =>
                onChangeShift(e.target.value as ShiftType)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-slate-800 shadow-sm outline-none transition hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              {SHIFT_OPTIONS.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="area"
              className="mb-1 block text-[11px] font-bold text-slate-700"
            >
              Area
            </label>

            <select
              id="area"
              value={area}
              onChange={(e) =>
                onChangeArea(e.target.value as AreaSetting)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-slate-800 shadow-sm outline-none transition hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              {WORK_AREA_OPTIONS.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="rackJis"
              className="mb-1 block text-[11px] font-bold text-slate-700"
            >
              Rak JIS
            </label>

            <select
              id="rackJis"
              value={rackJis}
              onChange={(e) =>
                onChangeRackJis(
                  e.target.value as RackJisType
                )
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-slate-800 shadow-sm outline-none transition hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              {RACK_JIS_OPTIONS.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="pic"
              className="mb-1 block text-[11px] font-bold text-slate-700"
            >
              PIC
            </label>

            <input
              id="pic"
              type="text"
              value={pic}
              onChange={(e) =>
                onChangePic(e.target.value)
              }
              placeholder="Nama PIC"
              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={onSave}
            className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98]"
          >
            Simpan Setting
          </button>
        </div>
      </div>
    </section>
  );
}