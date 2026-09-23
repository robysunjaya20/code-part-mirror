import {
  AREA_OPTIONS,
  COLOR_OPTIONS,
} from "@/data/partConfig";

import type {
  PartData,
} from "@/types/part";

type Props = {
  data: PartData[];

  search: string;
  filterArea: string;
  filterColor: string;

  onSearch: (
    value: string
  ) => void;

  onFilterArea: (
    value: string
  ) => void;

  onFilterColor: (
    value: string
  ) => void;

  onEdit: (
    item: PartData
  ) => void;

  onDelete: (
    id: number
  ) => void;

  onDeleteAll: () => void;

  onClearFilter: () => void;
};


export default function PartList({
  data,
  search,
  filterArea,
  filterColor,
  onSearch,
  onFilterArea,
  onFilterColor,
  onEdit,
  onDelete,
  onDeleteAll,
  onClearFilter,
}: Props) {

  const hasFilter =
    search ||
    filterArea !== "ALL" ||
    filterColor !== "ALL";


  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* HEADER */}

      <div className="border-b border-slate-200 p-5 sm:p-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Data Part Code
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Kelola kode part yang tersimpan di browser.
            </p>

          </div>


          {data.length > 0 && (

            <button
              onClick={onDeleteAll}
              className="rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-100"
            >
              Hapus Semua
            </button>

          )}

        </div>


        {/* FILTER */}

        <div className="mt-5 grid gap-3 md:grid-cols-3">

          {/* SEARCH */}

          <div>

            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-600">
              Cari
            </label>

            <div className="relative">

              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                🔍
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  onSearch(
                    e.target.value
                  )
                }
                placeholder="Cari kode part..."
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />

            </div>

          </div>


          {/* AREA */}

          <div>

            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-600">
              Filter Area
            </label>

            <select
              value={filterArea}
              onChange={(e) =>
                onFilterArea(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none hover:border-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >

              <option value="ALL">
                Semua Area
              </option>

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


          {/* COLOR */}

          <div>

            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-600">
              Filter Warna
            </label>

            <select
              value={filterColor}
              onChange={(e) =>
                onFilterColor(
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 outline-none hover:border-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >

              <option value="ALL">
                Semua Warna
              </option>

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


        {hasFilter && (

          <button
            onClick={onClearFilter}
            className="mt-4 text-sm font-bold text-blue-600 hover:text-blue-800"
          >
            ↻ Reset Filter
          </button>

        )}

      </div>


      {/* LIST */}

      <div className="p-5 sm:p-6">

        {data.length === 0 ? (

          <EmptyState
            title="Belum ada data"
            description="Tambahkan kode part menggunakan form di atas."
            icon="📦"
          />

        ) : (

          <div className="space-y-3">

            {data.map(
              (item, index) => (

                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-sm"
                >

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    {/* INFO */}

                    <div className="min-w-0">

                      <div className="flex items-center gap-3">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">
                          {index + 1}
                        </div>


                        <p className="break-all font-mono text-lg font-extrabold text-slate-900">
                          {item.fullCode}
                        </p>

                      </div>


                      <div className="mt-3 flex flex-wrap gap-2 pl-11">

                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
                          {item.area}
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          Part: {item.partCode}
                        </span>

                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800">
                          {item.color}
                        </span>

                      </div>

                    </div>


                    {/* ACTION */}

                    <div className="flex shrink-0 gap-2 pl-11 sm:pl-0">

                      <button
                        onClick={() =>
                          onEdit(item)
                        }
                        className="rounded-xl border border-blue-300 bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
                      >
                        Edit
                      </button>


                      <button
                        onClick={() =>
                          onDelete(
                            item.id
                          )
                        }
                        className="rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-100"
                      >
                        Hapus
                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </section>
  );
}


// ========================================
// EMPTY STATE
// ========================================

function EmptyState({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {

  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-14 text-center">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
        {icon}
      </div>

      <h3 className="mt-4 text-base font-bold text-slate-700">
        {title}
      </h3>

      <p className="mt-1 text-sm font-medium text-slate-500">
        {description}
      </p>

    </div>
  );
}