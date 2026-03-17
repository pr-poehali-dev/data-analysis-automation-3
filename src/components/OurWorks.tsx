import { useState } from "react"
import Icon from "@/components/ui/icon"

const WORKS = [
  {
    image: "https://cdn.poehali.dev/projects/b275e081-8e63-4958-8c50-b2e74190fc81/bucket/f5d27ec7-c392-49a9-bc9d-753aadef5c17.jpg",
    title: "Эвакуация Subaru Forester",
    description: "Погрузка и транспортировка автомобиля без переднего колеса. Бережная фиксация на платформе с использованием специального оборудования.",
  },
  {
    image: "https://cdn.poehali.dev/projects/b275e081-8e63-4958-8c50-b2e74190fc81/bucket/fda542da-d92d-4739-9ae5-642f0eced370.jpeg",
    title: "Буксировочная тележка",
    description: "Перевозка автомобилей на жёсткой сцепке — безопасный и экономичный способ транспортировки на дальние расстояния.",
  },
  {
    image: "https://cdn.poehali.dev/projects/b275e081-8e63-4958-8c50-b2e74190fc81/bucket/c6b44c1d-e6f8-4ffd-9d3f-47d8a6ed6c6a.jpg",
    title: "Частичная погрузка Opel Astra",
    description: "Эвакуация методом частичной погрузки — подходит для автомобилей с заблокированным рулём или неисправной трансмиссией.",
  },
]

export default function OurWorks() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="bg-neutral-950 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <h2 className="text-white text-3xl sm:text-4xl font-light mb-3">
            Наши <span className="font-medium italic">работы</span>
          </h2>
          <div className="w-12 h-[2px] bg-yellow-400 mb-6" />
          <p className="text-white/60 text-sm sm:text-base max-w-2xl leading-relaxed">
            Каждый вызов — это индивидуальный подход. Мы подбираем оптимальный способ эвакуации 
            в зависимости от типа автомобиля, характера поломки и дорожных условий. 
            Наши специалисты имеют опыт работы с любыми ситуациями: от стандартной перевозки 
            до сложной эвакуации из труднодоступных мест.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <img
              src={WORKS[activeIndex].image}
              alt={WORKS[activeIndex].title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white text-lg font-medium mb-1">
                {WORKS[activeIndex].title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {WORKS[activeIndex].description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {WORKS.map((work, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-yellow-400/10 border border-yellow-400/30"
                    : "bg-white/5 border border-white/10 hover:border-white/20"
                }`}
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-20 h-16 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-medium mb-1 transition-colors ${
                    activeIndex === index ? "text-yellow-400" : "text-white"
                  }`}>
                    {work.title}
                  </h4>
                  <p className="text-white/50 text-xs line-clamp-2">{work.description}</p>
                </div>
                <Icon
                  name={activeIndex === index ? "ChevronRight" : "ChevronRight"}
                  size={18}
                  className={`shrink-0 transition-colors ${
                    activeIndex === index ? "text-yellow-400" : "text-white/30"
                  }`}
                />
              </button>
            ))}

            <div className="mt-4 p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="Shield" size={20} className="text-yellow-400" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium mb-1">Индивидуальный подход</h4>
                  <p className="text-white/50 text-xs leading-relaxed">
                    Перед выездом мы уточняем все детали: марку и модель авто, тип неисправности, 
                    условия подъезда. Это позволяет заранее подготовить нужное оборудование 
                    и выполнить эвакуацию быстро и без повреждений.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
