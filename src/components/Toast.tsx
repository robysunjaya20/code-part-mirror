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

  const style = styles[type];

  return (
    <div className="fixed right-3 top-3 z-[100] w-[calc(100%-1.5rem)] max-w-xs animate-[slideIn_0.25s_ease-out]">
      <div
        className={`rounded-xl border p-3 shadow-lg ${style.wrapper}`}
      >
        <div className="flex items-start gap-2">
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${style.icon}`}
          >
            {style.symbol}
          </div>

          <div className="min-w-0 flex-1">
            <p
              className={`text-xs font-extrabold ${style.title}`}
            >
              {type === "success"
                ? "Berhasil"
                : type === "error"
                  ? "Terjadi Kesalahan"
                  : "Informasi"}
            </p>

            <p
              className={`mt-0.5 text-xs font-medium leading-relaxed ${style.message}`}
            >
              {message}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-base font-semibold leading-none text-slate-400 transition hover:text-slate-700"
            aria-label="Tutup"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}