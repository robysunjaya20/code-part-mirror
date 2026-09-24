import {
  AREA_OPTIONS,
} from "@/data/partConfig";

import type {
  PartFormData,
} from "@/types/part";


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
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* =========================
          HEADER
      ========================= */}

      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              {editing
                ? "Edit Kode Part"
                : "Tambah Kode Part"}
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Pilih model, masukkan Kode Part, Result, LOT, dan Detail Problem
            </p>

          </div>


          {editing && (

            <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-800">
              Mode Edit
            </span>

          )}

        </div>

      </div>


      {/* =========================
          BODY
      ========================= */}

      <div className="p-5 sm:p-6">


        {/* =========================
            BARIS 1
        ========================= */}

        <div className="grid gap-5 md:grid-cols-3">


          {/* =========================
              MODEL
          ========================= */}

          <div>

            <label className="mb-2 block text-sm font-bold text-slate-700">
              Model
            </label>


            <select
              value={form.area}
              onChange={(e) =>
                onChange(
                  "area",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition hover:border-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >

              {AREA_OPTIONS.map(
                (item) => (

                  <option
                    key={item.label}
                    value={item.label}
                  >
                    {item.label}
                  </option>

                )
              )}

            </select>

          </div>


          {/* =========================
              KODE PART
          ========================= */}

          <div>

            <label
              htmlFor="partCode"
              className="mb-2 block text-sm font-bold text-slate-700"
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

                const value =
                  e.target.value
                    .toUpperCase()
                    .replace(
                      /[^A-Z0-9]/g,
                      ""
                    );

                onChange(
                  "partCode",
                  value
                );

              }}
              placeholder="Contoh: 020NB9"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-slate-800 shadow-sm outline-none transition placeholder:font-sans placeholder:tracking-normal placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />


            <p className="mt-1.5 text-xs font-medium text-slate-500">
              Format: 3 angka + 3 kode warna
            </p>

          </div>


          {/* =========================
              RESULT
          ========================= */}

          <div>

            <label className="mb-2 block text-sm font-bold text-slate-700">
              Result
            </label>


            <div className="flex h-[50px] items-center gap-6 rounded-xl border border-slate-300 bg-white px-4">


              {/* OK */}

              <label className="flex cursor-pointer items-center gap-2">

                <input
                  type="radio"
                  name="part-result"
                  value="OK"
                  checked={
                    form.result === "OK"
                  }
                  onChange={() =>
                    onChange(
                      "result",
                      "OK"
                    )
                  }
                  className="h-4 w-4 accent-emerald-600"
                />

                <span className="text-sm font-bold text-emerald-700">
                  OK
                </span>

              </label>


              {/* NG */}

              <label className="flex cursor-pointer items-center gap-2">

                <input
                  type="radio"
                  name="part-result"
                  value="NG"
                  checked={
                    form.result === "NG"
                  }
                  onChange={() =>
                    onChange(
                      "result",
                      "NG"
                    )
                  }
                  className="h-4 w-4 accent-red-600"
                />

                <span className="text-sm font-bold text-red-700">
                  NG
                </span>

              </label>

            </div>

          </div>

        </div>


        {/* =========================
            BARIS 2
        ========================= */}

        <div className="mt-5 grid gap-5 md:grid-cols-3">


          {/* =========================
              STAMP DATE / LOT
          ========================= */}

          <div>

            <label
              htmlFor="stampDate"
              className="mb-2 block text-sm font-bold text-slate-700"
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

                const value =
                  e.target.value
                    .toUpperCase()
                    .replace(
                      /[^A-Z0-9]/g,
                      ""
                    )
                    .slice(0, 5);

                onChange(
                  "stampDate",
                  value
                );

              }}
              placeholder="Contoh: A1234"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider text-slate-800 shadow-sm outline-none transition placeholder:font-sans placeholder:tracking-normal placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />


            <p className="mt-1.5 text-xs font-medium text-slate-500">
              Format: 1 huruf (Bulan) + 4 angka(Tgl Thn)
            </p>

          </div>

          <div className="md:col-span-2">

            <label
              htmlFor="detailProblem"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              DETAIL PROBLEM
            </label>


            <textarea
              id="detailProblem"
              value={
                form.detailProblem
              }
              onChange={(e) =>
                onChange(
                  "detailProblem",
                  e.target.value
                )
              }
              rows={3}
              placeholder="Masukkan detail problem / deskripsi..."
              className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

            <p className="mt-1.5 text-xs font-medium text-slate-500">
              Masukkan deskripsi secara detail.
            </p>

          </div>

        </div>


        {/* =========================
            PREVIEW
        ========================= */}

        <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">

          <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Preview Kode
          </p>


          <p className="mt-2 break-all font-mono text-2xl font-extrabold tracking-wide text-blue-900 sm:text-3xl">
            {previewCode || "-"}
          </p>

        </div>


        {/* =========================
            BUTTON
        ========================= */}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">

          <button
            type="button"
            onClick={onSubmit}
            className="flex-1 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-[0.99]"
          >

            {editing
              ? "✓ Simpan Perubahan"
              : "+ Tambah Data"}

          </button>


          {editing && (

            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
            >
              Batal
            </button>

          )}

        </div>

      </div>

    </section>
  );
}