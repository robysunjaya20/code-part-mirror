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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur-sm">

      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">


        {/* HEADER */}

        <div className="border-b border-slate-200 px-6 py-5">

          <div className="flex items-start justify-between gap-4">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-xl">
                ☁️
              </div>

              <div>

                <h2 className="text-lg font-extrabold text-slate-900">
                  Simpan ke Google Sheets
                </h2>

                <p className="text-sm font-medium text-slate-500">
                  Sinkronisasi data lokal
                </p>

              </div>

            </div>


            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-lg font-semibold text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Tutup"
            >
              ×
            </button>

          </div>

        </div>


        {/* BODY */}

        <div className="p-6">

          <p className="text-sm font-medium leading-relaxed text-slate-600">
            Anda akan menyinkronkan seluruh data
            yang saat ini tersimpan di browser
            ke Google Sheets.
          </p>


          {/* COUNT */}

          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                  Data Lokal
                </p>

                <p className="mt-1 text-sm font-semibold text-emerald-900">
                  Siap disinkronkan
                </p>

              </div>


              <div className="text-right">

                <p className="text-3xl font-extrabold text-emerald-700">
                  {dataCount}
                </p>

                <p className="text-xs font-semibold text-emerald-600">
                  data
                </p>

              </div>

            </div>

          </div>


          {/* WARNING */}

          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">

            <div className="flex gap-3">

              <span className="text-lg">
                ⚠️
              </span>

              <p className="text-xs font-medium leading-relaxed text-amber-800">
                Data di Google Sheets akan
                disesuaikan dengan data lokal.
                Data lama yang tidak ada di lokal
                dapat terhapus dari sheet.
              </p>

            </div>

          </div>

        </div>


        {/* FOOTER */}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            Batal
          </button>


          <button
            onClick={onConfirm}
            className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md"
          >
            ☁ Simpan Sekarang
          </button>

        </div>

      </div>

    </div>
  );
}