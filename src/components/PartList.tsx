import {
  AREA_OPTIONS,
} from "@/data/partConfig";

import type {
  PartData,
} from "@/types/part";

type Props = {
  data: PartData[];

  search: string;
  filterArea: string;

  onSearch: (
    value: string
  ) => void;

  onFilterArea: (
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
  onSearch,
  onFilterArea,
  onEdit,
  onDelete,
  onDeleteAll,
  onClearFilter,
}: Props) {
  const hasFilter =
    search.trim() !== "" ||
    filterArea !== "ALL";

  return (
    <section className="mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-900">
              Data Part Code
            </h2>

            <p className="mt-1 text-xs font-medium text-slate-500">
              Kelola kode part yang tersimpan di lokal.
            </p>
          </div>

          {data.length > 0 && (
            <button
              type="button"
              onClick={onDeleteAll}
              className="rounded-xl border border-red-300 bg-red-50 px-2 py-2 text-xs font-bold text-red-700 transition hover:bg-red-100"
            >
              Hapus Semua
            </button>
          )}
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2">
          <div className="col-span-2 min-w-0">
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-600">
              Cari Data
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm">
                🔍
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  onSearch(e.target.value)
                }
                placeholder="Cari data..."
                className="w-full min-w-0 rounded-xl border border-slate-300 bg-white py-3 pl-8 pr-2 text-xs font-medium text-slate-800 outline-none placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="min-w-0">
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-slate-600">
              Filter Model
            </label>

            <select
              value={filterArea}
              onChange={(e) =>
                onFilterArea(e.target.value)
              }
              className="w-full min-w-0 rounded-xl border border-slate-300 bg-white px-2 py-3 text-xs font-semibold text-slate-800 outline-none hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              <option value="ALL">
                Semua Model
              </option>

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
        </div>

        {hasFilter && (
          <button
            type="button"
            onClick={onClearFilter}
            className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-800"
          >
            ↻ Reset Filter
          </button>
        )}
      </div>

      <div className="p-5 sm:p-6">
        {data.length === 0 ? (
          <EmptyState
            title="Belum ada data"
            description="Tambahkan kode part menggunakan form di atas."
            icon="📦"
          />
        ) : (
          <div className="space-y-1">
            {[...data].reverse().map(
              (item, index) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-2 transition hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-sm"
                >
                  <div className="flex items-start gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[11px] font-bold text-slate-600">
                      {data.length - index}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="min-w-0 flex-1 break-all font-mono text-xs font-extrabold text-slate-900">
                          {item.fullCode}
                        </p>

                        <div className="flex shrink-0 gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              onEdit(item)
                            }
                            className="rounded-lg border border-blue-300 bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-700 transition hover:bg-blue-100"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              onDelete(item.id)
                            }
                            className="rounded-lg border border-red-300 bg-red-50 px-2.5 py-1.5 text-xs font-bold text-red-700 transition hover:bg-red-100"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-800">
                          Model: {item.area}
                        </span>

                        <span
                          className={
                            item.result === "OK"
                              ? "rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-700"
                              : "rounded-full bg-red-100 px-3 py-1 text-[11px] font-bold text-red-700"
                          }
                        >
                          Result: {item.result}
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-0.5 font-mono text-[11px] font-bold text-slate-700">
                          Part: {item.partCode}
                        </span>

                        <span className="rounded-full bg-amber-100 px-3 py-1 font-mono text-[11px] font-bold text-amber-800">
                          LOT: {item.stampDate || "-"}
                        </span>
                      </div>

                      <div className="mt-2 ml-0 rounded-xl border border-indigo-100 bg-indigo-50 p-2">
                        <div className="flex flex-wrap gap-x-2 gap-y-1">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wide text-indigo-500">
                              Area
                            </p>

                            <p className="text-xs font-bold text-indigo-900">
                              {item.workArea || "-"}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wide text-indigo-500">
                              Rak JIS
                            </p>

                            <p className="text-xs font-bold text-indigo-900">
                              {item.rackJis || "-"}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wide text-indigo-500">
                              PIC
                            </p>

                            <p className="text-xs font-bold text-indigo-900">
                              {item.pic || "-"}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wide text-indigo-500">
                              Shift
                            </p>

                            <p className="text-xs font-bold text-indigo-900">
                              {item.shift || "-"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {item.detailProblem?.trim() && (
                        <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                            Detail Problem
                          </p>

                          <p className="mt-1 whitespace-pre-wrap break-words text-xs font-medium text-slate-700">
                            {item.detailProblem}
                          </p>
                        </div>
                      )}
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

      <p className="mt-1 text-xs font-medium text-slate-500">
        {description}
      </p>
    </div>
  );
}