export default function Header() {
  const GOOGLE_SHEET_URL =
    "https://docs.google.com/spreadsheets/d/1qJL_CnJxsPWrpi97pl9KYmXNcYaWl2Dve-xogQkG4Hg/edit?usp=sharing";

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo & Title */}
        <div className="flex min-w-0 items-center gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-extrabold text-white shadow-sm">
            Bei
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
              Standby Management Report
            </h1>

            <p className="truncate text-xs font-medium text-slate-500 sm:text-sm">
              SU2ID & KS Mirror 
            </p>
          </div>

        </div>

        {/* Right Menu */}
        <div className="flex shrink-0 items-center gap-2">

          {/* Local Storage Status */}
          <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 sm:flex">

            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

            <span className="text-xs font-semibold text-emerald-700">
              Local Storage Aktif
            </span>

          </div>

          {/* Google Sheets */}
          <a
            href={GOOGLE_SHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-100 active:scale-[0.98]"
            title="Buka Google Sheets"
          >
            <span className="text-base">
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