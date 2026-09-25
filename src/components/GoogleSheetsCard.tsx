type Props = {
  dataCount: number;
  isSyncing: boolean;
  lastSync: string | null;
  onSync: () => void;
};

export default function GoogleSheetsCard({
  dataCount,
  isSyncing,
  lastSync,
  onSync,
}: Props) {
  return (
    <section className="mt-2 overflow-hidden rounded-xl border border-emerald-200 bg-white shadow-sm">
      <div className="bg-emerald-50 p-3 sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-base">
              ☁️
            </div>

            <div>
              <h3 className="text-sm font-bold text-emerald-900">
                Google Sheets
              </h3>

              <p className="mt-0.5 max-w-xl text-xs font-medium leading-relaxed text-emerald-800">
                Data saat ini disimpan secara lokal.
                Gunakan tombol untuk menyinkronkan
                seluruh data ke Google Sheets.
              </p>

              {lastSync && (
                <p className="mt-1 text-[10px] font-bold text-emerald-700">
                  ✓ Sinkronisasi terakhir:{" "}
                  {lastSync}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onSync}
            disabled={
              dataCount === 0 ||
              isSyncing
            }
            className="w-full rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 lg:w-auto"
          >
            {isSyncing ? (
              <span className="flex items-center justify-center gap-1.5">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Menyimpan...
              </span>
            ) : (
              "☁ Simpan ke Google Sheets"
            )}
          </button>
        </div>
      </div>
    </section>
  );
}