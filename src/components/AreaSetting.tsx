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
  rackJis: RackJisType | "";
  pic: string;
  shift: ShiftType;

  // Tanggal kerja
  workDate: string;

  onChangeArea: (
    value: AreaSetting
  ) => void;

  onChangeRackJis: (
    value: RackJisType | ""
  ) => void;

  onChangePic: (
    value: string
  ) => void;

  onChangeShift: (
    value: ShiftType
  ) => void;

  // Update tanggal kerja
  onChangeWorkDate: (
    value: string
  ) => void;

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
    <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">


      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-lg">
            ⚙️
          </div>

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Setting Area Kerja
            </h2>

            <p className="text-sm font-medium text-slate-500">
              Setting area dan tanggal kerja sebelum mulai input data.
            </p>

          </div>

        </div>

      </div>


      <div className="p-5 sm:p-6">

        <div className="grid gap-5 md:grid-cols-5">

          <div>

            <label
              htmlFor="work-date"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Tanggal Kerja
            </label>

            <input
              id="work-date"
              type="date"
              value={workDate}
              onChange={(e) =>
                onChangeWorkDate(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition hover:border-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

            <p className="mt-1.5 text-xs font-medium text-slate-500">
              Menentukan sheet Google Sheets.
            </p>

          </div>


          <div>

            <label className="mb-2 block text-sm font-bold text-slate-700">
              Area
            </label>

            <select
              value={area}
              onChange={(e) =>
                onChangeArea(
                  e.target.value as AreaSetting
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition hover:border-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >

              {WORK_AREA_OPTIONS.map(
                (item) => (

                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>

                )
              )}

            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-bold text-slate-700">
              Rak JIS
            </label>

            <select
              value={rackJis}
              onChange={(e) =>
                onChangeRackJis(
                  e.target.value as RackJisType
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition hover:border-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >

              <option value="">
                Pilih Rak JIS
              </option>

              {RACK_JIS_OPTIONS.map(
                (item) => (

                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>

                )
              )}

            </select>

            <p className="mt-1.5 text-xs font-medium text-slate-500">
              Pilih posisi Rak JIS untuk area {area}.
            </p>

          </div>

          <div>

            <label
              htmlFor="pic"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              PIC
            </label>

            <input
              id="pic"
              type="text"
              value={pic}
              onChange={(e) =>
                onChangePic(
                  e.target.value
                )
              }
              placeholder="Ketik nama PIC"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition placeholder:font-normal placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-bold text-slate-700">
              Shift
            </label>

            <select
              value={shift}
              onChange={(e) =>
                onChangeShift(
                  e.target.value as ShiftType
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition hover:border-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >

              {SHIFT_OPTIONS.map(
                (item) => (

                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>

                )
              )}

            </select>

          </div>

        </div>

        <div className="mt-5 flex justify-end">

          <button
            type="button"
            onClick={onSave}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
          >
            ✓ Simpan Setting
          </button>

        </div>

      </div>

    </section>
  );
}