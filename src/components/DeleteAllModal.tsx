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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur-sm">

      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">


        {/* BODY */}

        <div className="p-6">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-xl">
            ⚠️
          </div>


          <h2 className="mt-5 text-xl font-extrabold text-slate-900">
            Hapus Semua Data?
          </h2>


          <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">

            {" "}

            <strong className="font-extrabold text-slate-900">
              {dataCount}
            </strong>{" "}

            data yang tersimpan di browser
            akan dihapus.

            <br />
            <br />

            Tindakan ini tidak dapat dibatalkan.

          </p>

        </div>


        {/* FOOTER */}

        <div className="flex gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5">

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            Batal
          </button>


          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Ya, Hapus Semua
          </button>

        </div>

      </div>

    </div>
  );
}