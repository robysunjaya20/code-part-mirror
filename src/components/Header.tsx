export default function Header() {
  const GOOGLE_SHEET_URL =
    "https://docs.google.com/spreadsheets/d/1qJL_CnJxsPWrpi97pl9KYmXNcYaWl2Dve-xogQkG4Hg/edit?usp=sharing";

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xs font-extrabold text-white shadow-sm">
            Bei
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold text-slate-900 sm:text-base">
              Standby Management Report
            </h1>

            <p className="truncate text-[10px] font-medium text-slate-500 sm:text-xs">
              SU2ID & KS Mirror
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <div className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1.5 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            <span className="text-[10px] font-semibold text-emerald-700">
              Local Storage Aktif
            </span>
          </div>

          <a
            href={GOOGLE_SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-100 active:scale-[0.98]"
            title="Buka Google Sheets"
          >
            <span className="text-sm">
              📊
            </span>

            <span className="hidden sm:inline">
              Google Sheets
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}