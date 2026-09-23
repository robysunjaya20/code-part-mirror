import {
  AREA_OPTIONS,
  COLOR_OPTIONS,
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

      {/* HEADER */}

      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              {editing
                ? "Edit Kode Part"
                : "Tambah Kode Part"}
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Pilih area, masukkan 3 digit kode part,
              lalu pilih warna.
            </p>

          </div>


          {editing && (

            <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-800">
              Mode Edit
            </span>

          )}

        </div>

      </div>


      {/* BODY */}

      <div className="p-5 sm:p-6">

        <div className="grid gap-5 md:grid-cols-3">

          {/* AREA */}

          <div>

            <label className="mb-2 block text-sm font-bold text-slate-700">
              Area
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


          {/* PART CODE */}

          <div>

            <label className="mb-2 block text-sm font-bold text-slate-700">
              Kode Part
            </label>

            <input
              type="text"
              inputMode="numeric"
              maxLength={3}
              value={form.partCode}
              onChange={(e) => {

                const value =
                  e.target.value.replace(
                    /\D/g,
                    ""
                  );

                onChange(
                  "partCode",
                  value
                );

              }}
              placeholder="Contoh: 030"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-mono text-sm font-bold text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

            <p className="mt-1.5 text-xs font-medium text-slate-500">
              Masukkan tepat 3 angka
            </p>

          </div>


          {/* WARNA */}

          <div>

            <label className="mb-2 block text-sm font-bold text-slate-700">
              Warna
            </label>

            <select
              value={form.color}
              onChange={(e) =>
                onChange(
                  "color",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm outline-none transition hover:border-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >

              {COLOR_OPTIONS.map(
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


        {/* PREVIEW */}

        <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">

          <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Preview Kode
          </p>

          <p className="mt-2 break-all font-mono text-2xl font-extrabold tracking-wide text-blue-900 sm:text-3xl">
            {previewCode}
          </p>

        </div>


        {/* BUTTON */}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">

          <button
            onClick={onSubmit}
            className="flex-1 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-[0.99]"
          >
            {editing
              ? "✓ Simpan Perubahan"
              : "+ Tambah Data"}
          </button>


          {editing && (

            <button
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