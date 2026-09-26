"use client";

import { AREA_OPTIONS } from "@/data/partConfig";

import type { PartFormData } from "@/types/part";

type Props = {
  form: PartFormData;
  editing: boolean;
  previewCode: string;

  onChange: (
    field: keyof PartFormData,
    value: string
  ) => void;

  onSubmit: () => void;
  onCancel: () => void;
};

export default function PartForm({
  form,
  editing,
  previewCode,
  onChange,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-3 py-3 sm:px-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {editing ? "Edit Kode Part" : "Tambah Kode Part"}
            </h2>

            <p className="mt-0.5 text-xs font-medium text-slate-500">
              Masukkan STAMP DATE / LOT, pilih model, kode part, result, dan detail problem
            </p>
          </div>

          {editing && (
            <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
              Mode Edit
            </span>
          )}
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div>
            <label
              htmlFor="stampDate"
              className="mb-1 block text-[11px] font-bold text-slate-700"
            >
              STAMP DATE / LOT
            </label>

            <input
              id="stampDate"
              type="text"
              inputMode="text"
              maxLength={5}
              value={form.stampDate}
              onChange={(e) => {
                const value = e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z0-9]/g, "")
                  .slice(0, 5);

                onChange("stampDate", value);
              }}
              placeholder="Contoh: H2126"
              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-800 shadow-sm outline-none transition placeholder:font-sans placeholder:tracking-normal placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1 text-[10px] font-medium text-slate-500">
              Format: 1 huruf (Bulan) + 4 angka (Tgl Thn)
            </p>
          </div>

          <div>
            <label
              htmlFor="model"
              className="mb-1 block text-[11px] font-bold text-slate-700"
            >
              Model
            </label>

            <select
              id="model"
              value={form.area}
              onChange={(e) =>
                onChange("area", e.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-slate-800 shadow-sm outline-none transition hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              {AREA_OPTIONS.map((item) => (
                <option
                  key={item.label}
                  value={item.label}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="partCode"
              className="mb-1 block text-[11px] font-bold text-slate-700"
            >
              Kode Part
            </label>

            <input
              id="partCode"
              type="text"
              inputMode="text"
              maxLength={6}
              value={form.partCode}
              onChange={(e) => {
                const value = e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z0-9]/g, "");

                onChange("partCode", value);
              }}
              placeholder="Contoh: 020NB9"
              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-800 shadow-sm outline-none transition placeholder:font-sans placeholder:tracking-normal placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1 text-[10px] font-medium text-slate-500">
              Format: 3 angka + 3 kode warna
            </p>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-bold text-slate-700">
              Result
            </label>

            <div className="flex h-[36px] items-center gap-4 rounded-lg border border-slate-300 bg-white px-2.5">
              <label className="flex cursor-pointer items-center gap-1">
                <input
                  type="radio"
                  name="part-result"
                  value="OK"
                  checked={form.result === "OK"}
                  onChange={() =>
                    onChange("result", "OK")
                  }
                  className="h-3 w-3 accent-emerald-600"
                />

                <span className="text-xs font-bold text-emerald-700">
                  OK
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-1">
                <input
                  type="radio"
                  name="part-result"
                  value="NG"
                  checked={form.result === "NG"}
                  onChange={() =>
                    onChange("result", "NG")
                  }
                  className="h-3 w-3 accent-red-600"
                />

                <span className="text-xs font-bold text-red-700">
                  NG
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <label
            htmlFor="detailProblem"
            className="mb-1 block text-[11px] font-bold text-slate-700"
          >
            DETAIL PROBLEM
          </label>

          <textarea
            id="detailProblem"
            value={form.detailProblem}
            onChange={(e) =>
              onChange(
                "detailProblem",
                e.target.value
              )
            }
            rows={2}
            placeholder="Masukkan detail problem / deskripsi..."
            className="w-full resize-y rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-medium text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="mt-2 rounded-xl border border-blue-200 bg-blue-50 p-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
            Preview Kode
          </p>

          <p className="mt-0.5 break-all font-mono text-sm font-extrabold tracking-wide text-blue-900">
            {previewCode || "-"}
          </p>
        </div>

        <div className="mt-3 flex flex-col items-center gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onSubmit}
            className="w-auto rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-[0.99] sm:flex-1"
          >
            {editing ? "✓ Simpan Perubahan" : "+ Tambah Data"}
          </button>

          {editing && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
            >
              Batal
            </button>
          )}
        </div>
      </div>
    </section>
  );
}