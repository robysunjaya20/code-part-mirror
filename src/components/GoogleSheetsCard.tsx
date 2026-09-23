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
    <section className="mt-6 overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
      
      <div className="bg-emerald-50 p-5 sm:p-6">
        
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          
          {/* INFO */}
          <div className="flex gap-4">
            
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-xl">
              ☁️
            </div>

            <div>
              
              <h3 className="font-bold text-emerald-900">
                Google Sheets
              </h3>

              <p className="mt-1 max-w-xl text-sm font-medium leading-relaxed text-emerald-800">
                Data saat ini disimpan secara lokal.
                Gunakan tombol untuk menyinkronkan
                seluruh data ke Google Sheets.
              </p>

              {lastSync && (
                <p className="mt-2 text-xs font-bold text-emerald-700">
                  ✓ Sinkronisasi terakhir:{" "}
                  {lastSync}
                </p>
              )}

            </div>

          </div>


          {/* BUTTON */}
          <button
            type="button"
            onClick={onSync}
            disabled={
              dataCount === 0 ||
              isSyncing
            }
            className="w-full rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 lg:w-auto"
          >
            
            {isSyncing ? (
              
              <span className="flex items-center justify-center gap-2">
                
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

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