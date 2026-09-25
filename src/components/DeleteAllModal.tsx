type Props = {
  dataCount: number;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteAllModal({
  dataCount,
  onClose,
  onConfirm,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-3 backdrop-blur-sm">
      <div className="w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="p-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-base">
            ⚠️
          </div>

          <h2 className="mt-3 text-base font-extrabold text-slate-900">
            Hapus Semua Data?
          </h2>

          <p className="mt-1.5 text-xs font-medium leading-relaxed text-slate-600">
            <strong className="font-extrabold text-slate-900">
              {dataCount}
            </strong>{" "}
            data yang tersimpan di browser
            akan dihapus.
          </p>

          <p className="mt-2 text-xs font-medium text-red-600">
            Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>

        <div className="flex gap-2 border-t border-slate-200 bg-slate-50 px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-700"
          >
            Ya, Hapus Semua
          </button>
        </div>
      </div>
    </div>
  );
}