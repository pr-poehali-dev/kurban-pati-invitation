import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/c3ca4308-8b83-4e93-b020-07d520ea9168/files/3097a476-65f5-4ce8-82f8-654b13f8620a.jpg";
const EVENT_DATE = new Date("2026-05-31T17:00:00");

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function RevealBlock({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = EVENT_DATE.getTime() - Date.now();
      if (diff <= 0) return;
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "дней", value: time.days },
    { label: "часов", value: time.hours },
    { label: "минут", value: time.minutes },
    { label: "секунд", value: time.seconds },
  ];

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {items.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-[#D4AF64]/50 bg-white/10 backdrop-blur flex items-center justify-center">
            <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-2xl md:text-3xl text-white font-light">
              {String(value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-white/60 text-xs mt-1 uppercase tracking-widest">{label}</span>
        </div>
      ))}
    </div>
  );
}

function FloatingParticles({ dark = false }: { dark?: boolean }) {
  const particles = useRef(
    Array.from({ length: 18 }).map(() => ({
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.current.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size + "px",
            height: p.size + "px",
            left: p.left + "%",
            top: p.top + "%",
            background: dark ? "rgba(212,175,100,0.5)" : "rgba(255,255,255,0.4)",
            animation: `particleFloat ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const activities = [
  { emoji: "🍽️", title: "Халяльный фуршет", desc: "Вкусная еда в исламских традициях" },
  { emoji: "🎮", title: "Игры и интерактивы", desc: "Весёлые активности для всех" },
  { emoji: "📸", title: "Фотозона + фотограф", desc: "Профессиональные воспоминания" },
  { emoji: "🎞️", title: "Полароид", desc: "Моментальные снимки на память" },
  { emoji: "🌿", title: "Хна", desc: "Нанесение узоров хной" },
  { emoji: "🏆", title: "Конкурсы и призы", desc: "Подарки для победительниц" },
  { emoji: "🎤", title: "Выступления участниц", desc: "Таланты и сюрпризы" },
  { emoji: "💬", title: "Душевные разговоры", desc: "Искренние беседы между своими" },
  { emoji: "🌙", title: "Смысл Курбан-байрама", desc: "Напоминание о духовном значении" },
];

const nightActivities = [
  { emoji: "✨", title: "Бенгальские огни" },
  { emoji: "🔥", title: "Мангал" },
  { emoji: "🧖‍♀️", title: "Баня" },
  { emoji: "🌙", title: "Душевные посиделки" },
  { emoji: "☀️", title: "Завтрак" },
  { emoji: "🛏️", title: "Двухместные комнаты" },
];

const tariffs = [
  {
    name: "Без ночёвки",
    price: "1 500 ₽",
    details: ["До 22:00", "Возраст 16+"],
    icon: "🌸",
    highlight: false,
  },
  {
    name: "С ночёвкой",
    price: "2 500 ₽",
    details: ["До 1 июня 11:00", "Возраст 18+"],
    icon: "🌙",
    highlight: true,
  },
];

export default function Index() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contact: "",
    format: "",
    address: "",
    transfer: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#FBF7F4", fontFamily: "'Montserrat', sans-serif" }}>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.65) 100%)" }} />
        <FloatingParticles />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="mb-4" style={{ animation: "kpFadeDown 1s ease both" }}>
            <span className="text-xs uppercase tracking-[0.4em] text-[#D4AF64]/90">Закрытый халяльный вечер · Курбан-байрам 2026</span>
          </div>

          <h1
            className="text-white font-light leading-none mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(72px,12vw,120px)", animation: "kpFadeUp 1s ease 0.2s both" }}
          >
            Курбан
          </h1>
          <h1
            className="font-light leading-none mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(72px,12vw,120px)", color: "#D4AF64", animation: "kpFadeUp 1s ease 0.35s both" }}
          >
            Пати
          </h1>

          <p
            className="text-white/85 text-sm md:text-base font-light mb-2 tracking-wide"
            style={{ animation: "kpFadeUp 1s ease 0.45s both" }}
          >
            для девушек-мусульманок
          </p>
          <p
            className="text-white/65 text-xs md:text-sm font-light mb-10 leading-relaxed max-w-md mx-auto"
            style={{ animation: "kpFadeUp 1s ease 0.5s both" }}
          >Мы ждем именно тебя ✨</p>

          <div style={{ animation: "kpFadeUp 1s ease 0.65s both" }}>
            <Countdown />
          </div>

          <div style={{ animation: "kpFadeUp 1s ease 0.8s both" }} className="mt-10 flex flex-col items-center gap-3">
            <a
              href="#form"
              className="inline-block px-10 py-4 text-sm uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: "#D4AF64", color: "#fff", letterSpacing: "0.18em" }}
            >
              Подать заявку
            </a>
            <p className="text-white/50 text-xs tracking-widest uppercase">Количество мест ограничено 🤍</p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-white/40" />
        </div>
      </section>

      {/* About */}
      <section className="py-24 px-4" style={{ background: "#FBF7F4" }}>
        <div className="max-w-2xl mx-auto text-center">
          <RevealBlock>
            <p className="text-[#D4AF64] text-xs tracking-[0.5em] uppercase mb-6">✦ ✦ ✦</p>
            <h2 className="font-light mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,5vw,48px)", color: "#3D2E2E" }}>
              О мероприятии
            </h2>
            <p className="leading-relaxed text-base md:text-lg font-light mb-8" style={{ color: "#7A6060" }}>
              Мы создаём пространство, где мусульманки смогут провести Курбан-байрам в атмосфере сестринства, красоты и халяльного отдыха. Это не массовая вечеринка, а тёплый закрытый вечер для своих.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl" style={{ background: "rgba(212,175,100,0.08)", border: "1px solid rgba(212,175,100,0.2)" }}>
              <span className="text-xl">🏡</span>
              <p className="text-sm font-light" style={{ color: "#7A6060" }}>
                Красивый двухэтажный дом за городом
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* What awaits */}
      <section className="py-16 px-4" style={{ background: "#FBF7F4" }}>
        <div className="max-w-xl mx-auto">
          <RevealBlock className="text-center mb-10">
            <p className="text-[#D4AF64] text-xs tracking-[0.5em] uppercase mb-3">✦</p>
            <h2 className="font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px,4vw,40px)", color: "#3D2E2E" }}>
              Тебя ждёт
            </h2>
          </RevealBlock>
          <RevealBlock delay={100}>
            <div className="space-y-3">
              {[
                "Тёплая атмосфера сестринства",
                "Красивый двухэтажный дом за городом",
                "Вечерние образы и праздничное настроение",
                "Халяльный фуршет",
                "Игры, конкурсы и интерактивы",
                "Фотозона, фотограф и полароид",
                "Хна, подарки и сюрпризы",
                "Душевное общение и напоминание о смысле праздника",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 px-5 py-4 rounded-2xl" style={{ background: "white", border: "1px solid rgba(212,175,100,0.12)" }}>
                  <span className="text-[#D4AF64] text-lg flex-shrink-0">🤍</span>
                  <p className="text-sm font-light" style={{ color: "#3D2E2E" }}>{item}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Info strip */}
      <section className="py-12 px-4" style={{ background: "#F5EDE8" }}>
        <div className="max-w-2xl mx-auto">
          <RevealBlock>
            <div className="flex flex-col md:flex-row justify-center gap-8 items-center text-center">
              <div>
                <span className="text-2xl mb-2 block">📍</span>
                <p className="text-sm font-medium" style={{ color: "#3D2E2E" }}>с. Юськи</p>
                <p className="text-xs mt-0.5" style={{ color: "#7A6060" }}>ул. Октябрьская, 50</p>
              </div>
              <div className="hidden md:block w-px h-10 opacity-30" style={{ background: "#D4AF64" }} />
              <div>
                <span className="text-2xl mb-2 block">📅</span>
                <p className="text-sm font-medium" style={{ color: "#3D2E2E" }}>31 мая 2026</p>
                <p className="text-xs mt-0.5" style={{ color: "#7A6060" }}>Курбан-байрам</p>
              </div>
              <div className="hidden md:block w-px h-10 opacity-30" style={{ background: "#D4AF64" }} />
              <div>
                <span className="text-2xl mb-2 block">🕔</span>
                <p className="text-sm font-medium" style={{ color: "#3D2E2E" }}>Заезд в 17:00</p>
                <p className="text-xs mt-0.5" style={{ color: "#7A6060" }}>Мест ограничено 🤍</p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-24 px-4" style={{ background: "#FBF7F4" }}>
        <div className="max-w-2xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <p className="text-[#D4AF64] text-xs tracking-[0.5em] uppercase mb-4">✦</p>
            <h2 className="font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,5vw,48px)", color: "#3D2E2E" }}>
              Программа
            </h2>
          </RevealBlock>

          {/* Day 1 */}
          <RevealBlock className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1" style={{ background: "rgba(212,175,100,0.3)" }} />
              <span className="text-xs uppercase tracking-[0.3em] px-4 py-2 rounded-full" style={{ color: "#D4AF64", background: "rgba(212,175,100,0.08)", border: "1px solid rgba(212,175,100,0.2)" }}>
                31 мая
              </span>
              <div className="h-px flex-1" style={{ background: "rgba(212,175,100,0.3)" }} />
            </div>
            <div className="space-y-0">
              {[
                { time: "17:00", label: "Заезд, знакомство с локацией", night: false },
                { time: "18:00", label: "Открытие", night: false },
                { time: "19:00", label: "Выступления спикеров, работа интерактивных зон", night: false },
                { time: "20:00", label: "Аукцион, объявление королевы вечера", night: false },
                { time: "до 22:00", label: "Выезд участниц без ночёвки", night: false, dimmed: true },
                { time: "23:00", label: "Сосиски у мангала, бенгальские огни", night: true },
                { time: "24:00", label: "Баня, душевные разговоры", night: true },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-stretch">
                  <div className="flex flex-col items-center" style={{ minWidth: "70px" }}>
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-5"
                      style={{ background: item.night ? "#D4AF64" : (item.dimmed ? "#C8B8B8" : "#D4AF64"), opacity: item.dimmed ? 0.4 : 1 }}
                    />
                    {i < 6 && <div className="w-px flex-1 mt-1" style={{ background: "rgba(212,175,100,0.2)" }} />}
                  </div>
                  <div className="pb-5 flex-1">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span
                        className="font-light flex-shrink-0"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: item.dimmed ? "#C8B8B8" : "#D4AF64", opacity: item.dimmed ? 0.6 : 1 }}
                      >
                        {item.time}
                      </span>
                      <span
                        className="text-sm font-light"
                        style={{ color: item.night ? "#3D2E2E" : (item.dimmed ? "#B0A0A0" : "#3D2E2E") }}
                      >
                        {item.label}
                        {item.night && <span className="ml-2 text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(212,175,100,0.1)", color: "#D4AF64" }}>с ночёвкой</span>}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Day 2 */}
          <RevealBlock>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1" style={{ background: "rgba(212,175,100,0.3)" }} />
              <span className="text-xs uppercase tracking-[0.3em] px-4 py-2 rounded-full" style={{ color: "#D4AF64", background: "rgba(212,175,100,0.08)", border: "1px solid rgba(212,175,100,0.2)" }}>
                1 июня
              </span>
              <div className="h-px flex-1" style={{ background: "rgba(212,175,100,0.3)" }} />
            </div>
            <div className="space-y-0">
              {[
                { time: "10:00", label: "Завтрак" },
                { time: "11:00", label: "Выезд" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-stretch">
                  <div className="flex flex-col items-center" style={{ minWidth: "70px" }}>
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-5" style={{ background: "#D4AF64" }} />
                    {i < 1 && <div className="w-px flex-1 mt-1" style={{ background: "rgba(212,175,100,0.2)" }} />}
                  </div>
                  <div className="pb-5 flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: "#D4AF64" }}>
                        {item.time}
                      </span>
                      <span className="text-sm font-light" style={{ color: "#3D2E2E" }}>{item.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-center mt-4" style={{ color: "#9E8080" }}>
              * ночная программа — только для гостей с ночёвкой
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* Dress code */}
      <section className="py-24 px-4" style={{ background: "#F0E6DF" }}>
        <div className="max-w-2xl mx-auto text-center">
          <RevealBlock>
            <p className="text-[#D4AF64] text-xs tracking-[0.5em] uppercase mb-4">✦</p>
            <h2 className="font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,5vw,48px)", color: "#3D2E2E" }}>
              Дресс-код
            </h2>
            <p className="text-sm font-light mb-10" style={{ color: "#7A6060" }}>
              🎀 Вечерние платья и праздничные причёски
            </p>
            <div className="flex flex-col md:flex-row gap-5 justify-center items-stretch">
              {[
                { emoji: "👗", text: "Вечерние платья" },
                { emoji: "💇‍♀️", text: "Праздничные причёски" },
                { emoji: "🌸", text: "Только женское мероприятие — без присутствия мужчин" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex-1 p-6 rounded-3xl text-center"
                  style={{ background: "white", border: "1px solid rgba(212,175,100,0.15)" }}
                >
                  <span className="text-3xl mb-3 block">{item.emoji}</span>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: "#3D2E2E" }}>{item.text}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Tariffs */}
      <section className="py-24 px-4" style={{ background: "#FBF7F4" }}>
        <div className="max-w-2xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <p className="text-[#D4AF64] text-xs tracking-[0.5em] uppercase mb-4">✦</p>
            <h2 className="font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,5vw,48px)", color: "#3D2E2E" }}>
              Форматы участия
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tariffs.map((t, i) => (
              <RevealBlock key={t.name} delay={i * 120}>
                <div
                  className="p-8 rounded-3xl text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    background: t.highlight ? "#1C1010" : "white",
                    border: `1px solid ${t.highlight ? "#D4AF64" : "rgba(212,175,100,0.2)"}`,
                  }}
                >
                  <div className="text-4xl mb-4">{t.icon}</div>
                  <h3
                    className="font-semibold mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", color: t.highlight ? "white" : "#3D2E2E" }}
                  >
                    {t.name}
                  </h3>
                  <div
                    className="text-3xl font-light mb-5"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#D4AF64" }}
                  >
                    {t.price}
                  </div>
                  <ul className="space-y-2 text-left inline-block">
                    {t.details.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm" style={{ color: t.highlight ? "rgba(255,255,255,0.7)" : "#7A6060" }}>
                        <span style={{ color: "#D4AF64" }}>✦</span> {d}
                      </li>
                    ))}
                  </ul>
                  {t.highlight && (
                    <div className="mt-5">
                      <span className="inline-block px-4 py-1 rounded-full text-xs uppercase tracking-widest" style={{ background: "rgba(212,175,100,0.15)", color: "#D4AF64" }}>
                        Полная программа
                      </span>
                    </div>
                  )}
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="py-24 px-4" style={{ background: "#F5EDE8" }}>
        <div className="max-w-xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="text-[#D4AF64] text-xs tracking-[0.5em] uppercase mb-4">✦</p>
            <h2 className="font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px,5vw,48px)", color: "#3D2E2E" }}>
              Подать заявку
            </h2>
            <p className="text-sm font-light mb-5" style={{ color: "#7A6060" }}>Заполни форму — мы с тобой свяжемся</p>
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl" style={{ background: "rgba(212,175,100,0.08)", border: "1px solid rgba(212,175,100,0.2)" }}>
              <span className="text-lg">💌</span>
              <p className="text-sm font-light" style={{ color: "#7A6060" }}>
                После подтверждения участия тебе будет отправлено бумажное приглашение
              </p>
            </div>
          </RevealBlock>

          {submitted ? (
            <RevealBlock>
              <div className="text-center py-16 px-8 rounded-3xl" style={{ background: "white", border: "1px solid rgba(212,175,100,0.2)" }}>
                <div className="text-5xl mb-6">🤍</div>
                <h3 className="font-light mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "26px", color: "#3D2E2E" }}>
                  Заявка принята!
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#7A6060" }}>
                  После подтверждения участия тебе будет отправлено бумажное приглашение 🤍
                </p>
                <p className="text-sm font-light italic" style={{ color: "#9E8080" }}>
                  Будем счастливы разделить этот вечер вместе ✨
                </p>
              </div>
            </RevealBlock>
          ) : (
            <RevealBlock>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: "Имя", key: "name", type: "text", placeholder: "Твоё имя" },
                  { label: "Возраст", key: "age", type: "number", placeholder: "Твой возраст" },
                  { label: "Телефон или Telegram", key: "contact", type: "text", placeholder: "+7 900 000 00 00 или @username" },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#9E8080" }}>{label}</label>
                    <input
                      className="w-full px-5 py-4 rounded-2xl outline-none transition-all duration-200 focus:shadow-md text-sm"
                      style={{
                        background: "white",
                        border: "1px solid rgba(212,175,100,0.2)",
                        color: "#3D2E2E",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.border = "1px solid #D4AF64")}
                      onBlur={(e) => (e.target.style.border = "1px solid rgba(212,175,100,0.2)")}
                      type={type}
                      placeholder={placeholder}
                      value={formData[key as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      required
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#9E8080" }}>Формат участия</label>
                  <select
                    className="w-full px-5 py-4 rounded-2xl outline-none transition-all duration-200 text-sm"
                    style={{
                      background: "white",
                      border: "1px solid rgba(212,175,100,0.2)",
                      color: "#3D2E2E",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                    onFocus={(e) => (e.target.style.border = "1px solid #D4AF64")}
                    onBlur={(e) => (e.target.style.border = "1px solid rgba(212,175,100,0.2)")}
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                    required
                  >
                    <option value="">Выбери формат</option>
                    <option value="day">Без ночёвки — 1 500 ₽</option>
                    <option value="night">С ночёвкой — 2 500 ₽</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#9E8080" }}>Почтовый адрес для приглашения</label>
                  <input
                    className="w-full px-5 py-4 rounded-2xl outline-none transition-all duration-200 text-sm"
                    style={{
                      background: "white",
                      border: "1px solid rgba(212,175,100,0.2)",
                      color: "#3D2E2E",
                      fontFamily: "'Montserrat', sans-serif",
                    }}
                    onFocus={(e) => (e.target.style.border = "1px solid #D4AF64")}
                    onBlur={(e) => (e.target.style.border = "1px solid rgba(212,175,100,0.2)")}
                    type="text"
                    placeholder="Город, улица, дом, квартира, индекс"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#9E8080" }}>Нужен ли трансфер от Соборной мечети?</label>
                  <div className="flex gap-3">
                    {["Да, нужен", "Нет, доберусь сама"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData({ ...formData, transfer: opt })}
                        className="flex-1 py-4 rounded-2xl text-sm font-light transition-all duration-200"
                        style={{
                          background: formData.transfer === opt ? "#D4AF64" : "white",
                          color: formData.transfer === opt ? "white" : "#3D2E2E",
                          border: formData.transfer === opt ? "1px solid #D4AF64" : "1px solid rgba(212,175,100,0.2)",
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg mt-2"
                  style={{ background: "#D4AF64", color: "white", fontFamily: "'Montserrat', sans-serif" }}
                >
                  Отправить заявку
                </button>
              </form>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 text-center relative overflow-hidden" style={{ background: "#1C1010" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, rgba(212,175,100,0.12) 0%, transparent 70%)" }} />
        <FloatingParticles dark />
        <div className="relative z-10 max-w-xl mx-auto">
          <p className="text-[#D4AF64] text-xs tracking-[0.5em] uppercase mb-6">✦ ✦ ✦</p>
          <p className="font-light italic leading-relaxed mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#D4AF64", fontSize: "clamp(18px,3vw,22px)" }}>
            «Это закрытый вечер, о котором не будет массовых объявлений. Если у тебя есть подруга, которой близка такая атмосфера — ты можешь передать приглашение ей ✨»
          </p>
          <p className="text-white/40 text-sm font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Будем счастливы разделить этот вечер вместе 🤍
          </p>
          <div className="w-16 h-px mx-auto mb-6" style={{ background: "rgba(212,175,100,0.3)" }} />
          <p className="text-[#D4AF64]/40 text-xs tracking-widest uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Курбан Пати · 31 мая 2026
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes kpFadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes kpFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
}