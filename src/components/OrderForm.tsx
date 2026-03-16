import { useState } from "react"
import Icon from "@/components/ui/icon"

const FUNCTION_URL = "https://functions.poehali.dev/38f29e26-2de0-4449-a92a-fb914d4bff1d"

const CRIMEA_CITIES = [
  "Симферополь", "Севастополь", "Ялта", "Алушта", "Евпатория",
  "Керчь", "Феодосия", "Джанкой", "Бахчисарай", "Судак",
  "Саки", "Армянск", "Красноперекопск", "Белогорск", "Старый Крым",
  "Щёлкино", "Инкерман", "Балаклава", "Форос", "Гурзуф",
  "Партенит", "Коктебель", "Черноморское", "Николаевка", "Песчаное",
  "Межводное", "Мисхор", "Гаспра", "Кореиз", "Ливадия",
  "Алупка", "Симеиз", "Массандра", "Никита", "Краснокаменка",
  "Береговое", "Приморский", "Орджоникидзе", "Курортное", "Морское",
  "Рыбачье", "Малореченское", "Солнечногорское", "Канака", "Новый Свет",
  "Перевальное", "Зуя", "Нижнегорский", "Советский", "Кировское",
  "Ленино", "Первомайское", "Раздольное", "Гвардейское", "Октябрьское",
  "Почтовое", "Каштановое", "Верхняя Кутузовка", "Запрудное", "Лавровое",
  "Виноградное", "Оползневое", "Санаторное", "Парковое", "Понизовка",
  "Кацивели", "Голубой Залив", "Олива", "Береговое (ЮБК)", "Малый Маяк",
  "Утёс", "Пушкино", "Изобильное", "Краснолесье", "Перевальное",
  "Добровское", "Грушевка", "Насыпное", "Виноградное (Судак)",
  "Новоотрадное", "Золотое", "Мирное", "Молочное", "Штормовое",
  "Поповка", "Оленёвка", "Заозёрное", "Витино", "Новофёдоровка",
  "Прибрежное", "Фрунзе", "Угловое", "Кача", "Любимовка",
  "Орлиное", "Тыловое", "Родниковское", "Соколиное", "Куйбышево",
  "Танковое", "Научный", "Партизанское", "Доброе", "Чистенькое"
]

type OrderType = "city" | "route"

export default function OrderForm() {
  const [orderType, setOrderType] = useState<OrderType>("city")
  const [form, setForm] = useState({
    phone: "",
    name: "",
    city: "",
    from: "",
    to: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    const payload = orderType === "city"
      ? { phone: form.phone, name: form.name, city: form.city, orderType: "city", price: "5 000 ₽" }
      : { phone: form.phone, name: form.name, from: form.from, to: form.to, orderType: "route", price: "3 500 ₽ подача + 73 ₽/км" }

    try {
      const res = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setStatus("success")
        setForm({ phone: "", name: "", city: "", from: "", to: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const inputClass = "w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"

  return (
    <div className="relative z-20 w-full flex justify-center">
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
        <p className="text-white/50 text-xs mb-3">Перезвоним в течение 5 минут</p>
        <div className="w-12 h-[2px] bg-yellow-400 mb-6" />

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
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              type="tel"
              placeholder="Телефон *"
              className={inputClass}
            />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Ваше имя *"
              className={inputClass}
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setOrderType("city")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  orderType === "city"
                    ? "bg-yellow-400 text-black"
                    : "bg-white/5 text-white/50 border border-white/15 hover:border-white/30"
                }`}
              >
                По городу
              </button>
              <button
                type="button"
                onClick={() => setOrderType("route")}
                className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  orderType === "route"
                    ? "bg-yellow-400 text-black"
                    : "bg-white/5 text-white/50 border border-white/15 hover:border-white/30"
                }`}
              >
                Откуда → Куда
              </button>
            </div>

            {orderType === "city" ? (
              <>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className={`${inputClass} appearance-none`}
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
                >
                  <option value="" disabled className="bg-neutral-900 text-white/30">Выберите город *</option>
                  {CRIMEA_CITIES.map(city => (
                    <option key={city} value={city} className="bg-neutral-900 text-white">{city}</option>
                  ))}
                </select>
                {form.city && (
                  <div className="flex items-center justify-between bg-yellow-400/10 border border-yellow-400/30 rounded-xl px-4 py-3">
                    <span className="text-white/70 text-sm">Эвакуатор по городу</span>
                    <span className="text-yellow-400 text-lg font-bold">5 000 ₽</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <select
                  name="from"
                  value={form.from}
                  onChange={handleChange}
                  required
                  className={`${inputClass} appearance-none`}
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
                >
                  <option value="" disabled className="bg-neutral-900 text-white/30">Откуда *</option>
                  {CRIMEA_CITIES.map(city => (
                    <option key={city} value={city} className="bg-neutral-900 text-white">{city}</option>
                  ))}
                </select>
                <select
                  name="to"
                  value={form.to}
                  onChange={handleChange}
                  required
                  className={`${inputClass} appearance-none`}
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
                >
                  <option value="" disabled className="bg-neutral-900 text-white/30">Куда *</option>
                  {CRIMEA_CITIES.map(city => (
                    <option key={city} value={city} className="bg-neutral-900 text-white">{city}</option>
                  ))}
                </select>
                {form.from && form.to && (
                  <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl px-4 py-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Подача эвакуатора</span>
                      <span className="text-yellow-400 text-base font-bold">3 500 ₽</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-xs">+ каждый километр</span>
                      <span className="text-yellow-400/80 text-sm font-medium">73 ₽/км</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {status === "error" && (
              <p className="text-red-400 text-xs">Ошибка отправки. Попробуйте ещё раз или позвоните нам.</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 rounded-xl bg-yellow-400 text-black text-sm font-medium hover:bg-yellow-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
    </div>
  )
}