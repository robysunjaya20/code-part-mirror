type ToastType =
  | "success"
  | "error"
  | "info";

type Props = {
  message: string;
  type?: ToastType;
  onClose: () => void;
};


export default function Toast({
  message,
  type = "success",
  onClose,
}: Props) {

  const styles = {

    success: {
      wrapper:
        "border-emerald-200 bg-emerald-50",
      icon:
        "bg-emerald-100 text-emerald-700",
      title:
        "text-emerald-900",
      message:
        "text-emerald-700",
      symbol: "✓",
    },

    error: {
      wrapper:
        "border-red-200 bg-red-50",
      icon:
        "bg-red-100 text-red-700",
      title:
        "text-red-900",
      message:
        "text-red-700",
      symbol: "!",
    },

    info: {
      wrapper:
        "border-blue-200 bg-blue-50",
      icon:
        "bg-blue-100 text-blue-700",
      title:
        "text-blue-900",
      message:
        "text-blue-700",
      symbol: "i",
    },

  };


  const style =
    styles[type];


  return (
    <div className="fixed right-4 top-4 z-[100] w-[calc(100%-2rem)] max-w-sm animate-[slideIn_0.25s_ease-out]">

      <div
        className={`rounded-2xl border p-4 shadow-xl ${style.wrapper}`}
      >

        <div className="flex items-start gap-3">

          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-extrabold ${style.icon}`}
          >
            {style.symbol}
          </div>


          <div className="min-w-0 flex-1">

            <p
              className={`text-sm font-extrabold ${style.title}`}
            >
              {type === "success"
                ? "Berhasil"
                : type === "error"
                  ? "Terjadi Kesalahan"
                  : "Informasi"}
            </p>

            <p
              className={`mt-1 text-sm font-medium leading-relaxed ${style.message}`}
            >
              {message}
            </p>

          </div>


          <button
            onClick={onClose}
            className="text-lg font-semibold text-slate-400 hover:text-slate-700"
            aria-label="Tutup"
          >
            ×
          </button>

        </div>

      </div>

    </div>
  );
}