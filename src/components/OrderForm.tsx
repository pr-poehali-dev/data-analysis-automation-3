import { useState } from "react"
import Icon from "@/components/ui/icon"

const FUNCTION_URL = "https://functions.poehali.dev/38f29e26-2de0-4449-a92a-fb914d4bff1d"

export default function OrderForm() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", comment: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("success")
        setForm({ name: "", phone: "", city: "", comment: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="relative z-20 w-full flex justify-center px-6 py-16">
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <h2 className="text-white text-2xl font-light mb-1">
          Оставьте <span className="font-medium italic">заявку</span>
        </h2>
        <p className="text-white/50 text-xs mb-6">Перезвоним в течение 5 минут</p>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
              <Icon name="CheckCircle" size={28} className="text-green-400" />
            </div>
            <p className="text-white text-lg font-light">Заявка отправлена!</p>
            <p className="text-white/50 text-xs">Мы свяжемся с вами в ближайшее время</p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-2 text-white/50 hover:text-white text-xs underline transition-colors"
            >
              Отправить ещё одну
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Ваше имя *"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              type="tel"
              placeholder="Телефон *"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"
            />
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Город / населённый пункт"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"
            />
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Комментарий (марка авто, адрес и т.д.)"
              rows={3}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors resize-none"
            />

            {status === "error" && (
              <p className="text-red-400 text-xs">Ошибка отправки. Попробуйте ещё раз или позвоните нам.</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  Отправляем...
                </>
              ) : (
                "Вызвать эвакуатор"
              )}
            </button>

            <p className="text-white/25 text-xs text-center">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
