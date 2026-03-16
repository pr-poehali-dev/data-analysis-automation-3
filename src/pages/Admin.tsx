import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ADMIN_LOGIN = "Yalta"
const ADMIN_PASSWORD = "Yalta220577"
const NEWS_URL = "https://functions.poehali.dev/1279db87-9326-4b6d-9988-ad8a408d5f79"

interface NewsItem {
  id: number
  title: string
  content: string
  date: string
  publish_at: string | null
}

function isPublished(item: NewsItem) {
  if (!item.publish_at) return true
  return new Date(item.publish_at) <= new Date()
}

function formatPublishAt(iso: string | null) {
  if (!iso) return null
  const d = new Date(iso)
  return d.toLocaleString("ru-RU", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
}

// Преобразует datetime-local value (2024-01-15T10:30) в ISO для бэкенда
function localToISO(val: string) {
  if (!val) return null
  return new Date(val).toISOString()
}

// Преобразует ISO -> datetime-local input value
function isoToLocal(iso: string | null) {
  if (!iso) return ""
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export default function Admin() {
  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(false)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ title: "", content: "", date: "", publish_at: "" })

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (login === ADMIN_LOGIN && password === ADMIN_PASSWORD) {
      setIsAuth(true)
      setError("")
    } else {
      setError("Неверный логин или пароль")
    }
  }

  async function loadNews() {
    setLoading(true)
    const r = await fetch(`${NEWS_URL}?admin=1`)
    const data = await r.json()
    setNews(data)
    setLoading(false)
  }

  useEffect(() => {
    if (isAuth) loadNews()
  }, [isAuth])

  async function handleAdd() {
    if (!form.title || !form.content) return
    setSaving(true)
    await fetch(NEWS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        content: form.content,
        date: form.date || undefined,
        publish_at: form.publish_at ? localToISO(form.publish_at) : null,
      }),
    })
    setForm({ title: "", content: "", date: "", publish_at: "" })
    await loadNews()
    setSaving(false)
  }

  function handleEdit(item: NewsItem) {
    setEditId(item.id)
    setForm({
      title: item.title,
      content: item.content,
      date: item.date,
      publish_at: isoToLocal(item.publish_at),
    })
  }

  async function handleSave() {
    if (!editId) return
    setSaving(true)
    await fetch(NEWS_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editId,
        title: form.title,
        content: form.content,
        date: form.date || undefined,
        publish_at: form.publish_at ? localToISO(form.publish_at) : null,
      }),
    })
    setEditId(null)
    setForm({ title: "", content: "", date: "", publish_at: "" })
    await loadNews()
    setSaving(false)
  }

  async function handleDelete(id: number) {
    if (!confirm("Удалить новость?")) return
    await fetch(`${NEWS_URL}?id=${id}`, { method: "DELETE" })
    await loadNews()
  }

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <button onClick={() => navigate("/")} className="text-white/40 hover:text-white/70 text-xs mb-8 flex items-center gap-1 transition-colors">
            ← На главную
          </button>
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8">
            <h1 className="text-white text-xl font-medium mb-1">Вход в панель</h1>
            <p className="text-white/40 text-xs mb-6">Управление новостями сайта</p>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="text-white/50 text-xs mb-1 block">Логин</label>
                <input
                  type="text"
                  value={login}
                  onChange={e => setLogin(e.target.value)}
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-white/30 transition-colors"
                  autoComplete="username"
                />
              </div>
              <div>
                <label className="text-white/50 text-xs mb-1 block">Пароль</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-white/30 transition-colors"
                  autoComplete="current-password"
                />
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button
                type="submit"
                className="w-full bg-white text-black font-medium text-sm py-2.5 rounded-lg hover:bg-white/90 active:scale-95 transition-all duration-200 mt-2"
              >
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-xl font-medium">Управление новостями</h1>
            <p className="text-white/40 text-xs mt-0.5">Публикация и редактирование новостей</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/news")} className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Страница новостей
            </button>
            <button onClick={() => navigate("/")} className="text-white/40 hover:text-white/70 text-xs transition-colors">
              На главную
            </button>
            <button onClick={() => setIsAuth(false)} className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Выйти
            </button>
          </div>
        </div>

        {/* Форма */}
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-white text-sm font-medium mb-4">
            {editId ? "Редактировать новость" : "Новая публикация"}
          </h2>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Заголовок"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/30"
            />
            <textarea
              placeholder="Текст новости"
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              rows={5}
              className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-white/30 transition-colors placeholder:text-white/30 resize-none"
            />
            <div>
              <label className="text-white/40 text-xs mb-1 block">Дата и время публикации</label>
              <input
                type="datetime-local"
                value={form.publish_at}
                onChange={e => setForm({ ...form, publish_at: e.target.value })}
                className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-white/30 transition-colors"
              />
            </div>
            {form.publish_at && new Date(form.publish_at) > new Date() && (
              <p className="text-amber-400/70 text-xs flex items-center gap-1">
                ⏰ Новость будет опубликована {formatPublishAt(localToISO(form.publish_at))}
              </p>
            )}
            <div className="flex gap-2">
              {editId ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 bg-white text-black text-sm font-medium py-2.5 rounded-lg hover:bg-white/90 active:scale-95 transition-all duration-200 disabled:opacity-50"
                  >
                    {saving ? "Сохранение..." : "Сохранить"}
                  </button>
                  <button
                    onClick={() => { setEditId(null); setForm({ title: "", content: "", date: "", publish_at: "" }) }}
                    className="px-4 py-2.5 rounded-lg border border-white/10 text-white/50 text-sm hover:border-white/30 transition-colors"
                  >
                    Отмена
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAdd}
                  disabled={saving || !form.title || !form.content}
                  className="flex-1 bg-white text-black text-sm font-medium py-2.5 rounded-lg hover:bg-white/90 active:scale-95 transition-all duration-200 disabled:opacity-50"
                >
                  {saving ? "Сохранение..." : form.publish_at && new Date(form.publish_at) > new Date() ? "Запланировать" : "Опубликовать"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Список */}
        {loading && (
          <div className="flex gap-2 items-center text-white/30 text-sm py-4">
            <div className="w-4 h-4 border border-white/20 border-t-white/60 rounded-full animate-spin" />
            Загрузка...
          </div>
        )}
        <div className="flex flex-col gap-3">
          {!loading && news.length === 0 && (
            <p className="text-white/30 text-sm text-center py-8">Новостей пока нет</p>
          )}
          {news.map(item => (
            <div key={item.id} className={`bg-zinc-900 border rounded-xl p-5 ${isPublished(item) ? "border-white/10" : "border-amber-400/20"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {isPublished(item) ? (
                      <span className="text-green-400/70 text-xs">● Опубликовано</span>
                    ) : (
                      <span className="text-amber-400/70 text-xs">⏰ Запланировано · {formatPublishAt(item.publish_at)}</span>
                    )}
                  </div>
                  <h3 className="text-white text-sm font-medium mb-1 truncate">{item.title}</h3>
                  <p className="text-white/60 text-xs leading-relaxed line-clamp-2">{item.content}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => navigate(`/news/${item.id}`)}
                    className="text-white/30 hover:text-white text-xs transition-colors"
                  >
                    Просмотр
                  </button>
                  <button onClick={() => handleEdit(item)} className="text-white/40 hover:text-white text-xs transition-colors">
                    Изменить
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-400/60 hover:text-red-400 text-xs transition-colors">
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}