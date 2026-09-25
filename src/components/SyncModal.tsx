type Props = {
  dataCount: number;
  onClose: () => void;
  onConfirm: () => void;
};

export default function SyncModal({
  dataCount,
  onClose,
  onConfirm,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-3 backdrop-blur-sm">
      <div className="w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="border-b border-slate-200 px-4 py-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-base">
                ☁️
              </div>

              <div>
                <h2 className="text-sm font-extrabold text-slate-900">
                  Simpan ke Google Sheets
                </h2>

                <p className="text-[10px] font-medium text-slate-500">
                  Semua data lokal akan disimpan
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-base font-semibold leading-none text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Tutup"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs font-medium leading-relaxed text-slate-600">
            Data lokal akan disimpan di Google Sheet.
            Data akan digabung berdasarkan tanggal.
          </p>

          <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                  Data Lokal
                </p>

                <p className="mt-0.5 text-xs font-semibold text-emerald-900">
                  Siap disimpan
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-extrabold text-emerald-700">
                  {dataCount}
                </p>

                <p className="text-[10px] font-semibold text-emerald-600">
                  data
                </p>
              </div>
            </div>
          </div>

          <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
            <div className="flex gap-2">
              <span className="text-sm">
                ⚠️
              </span>

              <p className="text-[10px] font-medium leading-relaxed text-amber-800">
                Pastikan semua data yang kamu simpan sudah masuk di Google
                Sheets dan jangan lupa backup datanya untuk dikirim.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md"
          >
            ☁ Simpan Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}