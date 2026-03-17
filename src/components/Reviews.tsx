import { useState } from "react"
import Icon from "@/components/ui/icon"

const REVIEWS = [
  {
    name: "Алексей М.",
    city: "Симферополь",
    rating: 5,
    text: "Сломался на трассе ночью, думал до утра простою. Позвонил — приехали за 25 минут! Погрузили аккуратно, довезли до сервиса. Цена адекватная, без накруток. Рекомендую!",
    date: "Февраль 2026",
  },
  {
    name: "Марина К.",
    city: "Ялта",
    rating: 5,
    text: "Заказывала эвакуатор для перевозки авто после ДТП. Водитель был очень вежливый и аккуратный, машину закрепили надёжно. Всё прошло без единой царапины. Спасибо!",
    date: "Январь 2026",
  },
  {
    name: "Дмитрий В.",
    city: "Севастополь",
    rating: 5,
    text: "Уже третий раз обращаюсь — всегда быстро и без проблем. В этот раз нужна была частичная погрузка, ребята справились отлично. Лучший эвакуатор в Крыму!",
    date: "Декабрь 2025",
  },
  {
    name: "Ирина С.",
    city: "Евпатория",
    rating: 5,
    text: "Машина не заводилась, а нужно было срочно в сервис. Позвонила, через полчаса уже грузили. Очень приятный водитель, объяснил всё по стоимости заранее. Никаких сюрпризов!",
    date: "Ноябрь 2025",
  },
  {
    name: "Олег Т.",
    city: "Керчь",
    rating: 5,
    text: "Перегонял авто из Керчи в Симферополь на эвакуаторе. Договорились о цене по телефону — по приезду ни копейки сверху. Честная работа, буду обращаться ещё.",
    date: "Октябрь 2025",
  },
]

export default function Reviews() {
  const [current, setCurrent] = useState(0)
  const visibleCount = 3

  const canPrev = current > 0
  const canNext = current < REVIEWS.length - visibleCount

  const handlePrev = () => {
    if (canPrev) setCurrent(current - 1)
  }

  const handleNext = () => {
    if (canNext) setCurrent(current + 1)
  }

  return (
    <section className="bg-black py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-white text-3xl sm:text-4xl font-light mb-3">
              Отзывы <span className="font-medium italic">клиентов</span>
            </h2>
            <div className="w-12 h-[2px] bg-yellow-400 mb-4" />
            <p className="text-white/60 text-sm sm:text-base">
              Нам доверяют водители по всему Крыму
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={!canPrev}
              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                canPrev
                  ? "border-white/20 text-white hover:bg-white/10"
                  : "border-white/10 text-white/20 cursor-not-allowed"
              }`}
            >
              <Icon name="ChevronLeft" size={18} />
            </button>
            <button
              onClick={handleNext}
              disabled={!canNext}
              className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                canNext
                  ? "border-white/20 text-white hover:bg-white/10"
                  : "border-white/10 text-white/20 cursor-not-allowed"
              }`}
            >
              <Icon name="ChevronRight" size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-5 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * (100 / visibleCount + 1.7)}%)` }}
          >
            {REVIEWS.map((review, index) => (
              <div
                key={index}
                className="min-w-[calc(33.333%-14px)] max-w-[calc(33.333%-14px)] hidden sm:block"
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 sm:hidden">
            {REVIEWS.slice(0, 3).map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 pt-6 border-t border-white/10">
          <div className="text-center">
            <span className="text-yellow-400 text-2xl font-bold">500+</span>
            <p className="text-white/40 text-xs mt-1">выполненных заказов</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <span className="text-yellow-400 text-2xl font-bold">4.9</span>
            <p className="text-white/40 text-xs mt-1">средняя оценка</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <span className="text-yellow-400 text-2xl font-bold">98%</span>
            <p className="text-white/40 text-xs mt-1">рекомендуют нас</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review }: { review: typeof REVIEWS[number] }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all h-full flex flex-col">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-white/70 text-sm leading-relaxed flex-1 mb-5">
        «{review.text}»
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <div className="w-9 h-9 rounded-full bg-yellow-400/10 flex items-center justify-center">
          <span className="text-yellow-400 text-sm font-medium">
            {review.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-white text-sm font-medium">{review.name}</p>
          <p className="text-white/40 text-xs">{review.city} · {review.date}</p>
        </div>
      </div>
    </div>
  )
}
