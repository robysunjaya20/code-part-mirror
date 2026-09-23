export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-sm font-extrabold text-white shadow-sm">
            PC
          </div>

          <div>

            <h1 className="text-lg font-bold text-slate-900 sm:text-xl">
              Part Code Management
            </h1>

            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              SU2ID & KS Part Code System
            </p>

          </div>

        </div>


        <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 sm:flex">

          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

          <span className="text-xs font-semibold text-emerald-700">
            Local Storage Aktif
          </span>

        </div>

      </div>

    </header>
  );
}