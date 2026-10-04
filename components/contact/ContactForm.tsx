"use client";
import { useState, type FormEvent } from "react";
import { budgetsOf, timelinesOf, topicsOf, validate, type ContactInput } from "@/lib/contact";
import { waLink } from "@/lib/content/site";
import { useLang } from "@/components/i18n/LangProvider";

const T = {
  ar: { doneLabel: "وصلت رسالتك", thanks: "شكراً لك.", doneText: "سنراجع طلبك ونعود إليك خلال يوم عمل واحد بتصور أولي. وإن كان الأمر عاجلاً، راسلنا مباشرة على واتساب.", wa: "راسلنا على واتساب", help: "بماذا نساعدك؟", multi: "(يمكن اختيار أكثر من واحد)", name: "الاسم *", namePh: "اسمك الكامل", company: "الشركة", companyPh: "اسم الشركة أو العلامة", email: "البريد الإلكتروني *", phone: "واتساب أو الهاتف", budget: "الميزانية التقريبية", when: "متى تريد البدء؟", msg: "حدّثنا عن مشروعك *", msgPh: "ما الذي تريد بناءه؟ من هم عملاؤك؟ وما الذي يعيقك اليوم؟", note: "نرد خلال يوم عمل واحد. بياناتك لا تُشارك مع أي طرف.", sending: "جارٍ الإرسال…", send: "أرسل الطلب", fail: "تعذر الإرسال. حاول مرة أخرى، أو راسلنا على واتساب." },
  en: { doneLabel: "Message received", thanks: "Thank you.", doneText: "We'll review your request and get back to you within one business day with an initial outline. If it's urgent, message us on WhatsApp.", wa: "Message us on WhatsApp", help: "How can we help?", multi: "(choose one or more)", name: "Name *", namePh: "Your full name", company: "Company", companyPh: "Company or brand name", email: "Email *", phone: "WhatsApp or phone", budget: "Approximate budget", when: "When do you want to start?", msg: "Tell us about your project *", msgPh: "What do you want to build? Who are your customers? What's holding you back today?", note: "We reply within one business day. Your data is never shared.", sending: "Sending…", send: "Send request", fail: "Couldn't send. Please try again, or message us on WhatsApp." },
};

type Errors = Partial<Record<keyof ContactInput, string>>;

export function ContactForm({ initial }: { initial?: string }) {
  const lang = useLang();
  const t = T[lang];
  const topics = topicsOf(lang), budgets = budgetsOf(lang), timelines = timelinesOf(lang);
  const [sel, setSel] = useState<string[]>(initial && topicsOf(lang).some((x) => x.value === initial) ? [initial] : []);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const toggle = (v: string) => setSel((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const data: ContactInput = {
      name: String(f.get("name") || ""), company: String(f.get("company") || ""), email: String(f.get("email") || ""),
      phone: String(f.get("phone") || ""), message: String(f.get("message") || ""), website: String(f.get("website") || ""),
      topics: sel, budget, timeline, lang,
    };
    const errs = validate(data, lang);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState("sending");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const j = await r.json();
      if (!r.ok || !j.ok) { setErrors(j.errors ?? {}); setState("error"); return; }
      setState("done");
    } catch { setState("error"); }
  }

  if (state === "done")
    return (
      <div className="glass rounded-[28px] p-[clamp(28px,4vw,56px)] [animation:rise_.8s_var(--ease-out)]" role="status">
        <span className="label">{t.doneLabel}</span>
        <h2 className="h2 mt-6">{t.thanks}</h2>
        <p className="lead mt-5 max-w-[40ch] text-mist">{t.doneText}</p>
        <a className="btn btn-ruby mt-9" href={waLink(lang)} target="_blank" rel="noopener">{t.wa}</a>
      </div>
    );

  return (
    <form onSubmit={submit} noValidate className="glass glass-strong grid gap-10 rounded-[28px] p-[clamp(24px,3.4vw,52px)]">
      <fieldset>
        <legend className="mb-4 text-[14px] text-mist">{t.help} <span className="text-[12px] opacity-70">{t.multi}</span></legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((o) => <button type="button" key={o.value} className="opt" aria-pressed={sel.includes(o.value)} onClick={() => toggle(o.value)}>{o.label}</button>)}
        </div>
        {errors.topics && <p className="mt-2 text-[12px] text-[var(--ruby-soft)]">{errors.topics}</p>}
      </fieldset>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="field"><label htmlFor="name">{t.name}</label><input id="name" name="name" autoComplete="name" placeholder={t.namePh} aria-invalid={!!errors.name} />{errors.name && <span className="err">{errors.name}</span>}</div>
        <div className="field"><label htmlFor="company">{t.company}</label><input id="company" name="company" autoComplete="organization" placeholder={t.companyPh} /></div>
        <div className="field"><label htmlFor="email">{t.email}</label><input id="email" name="email" type="email" dir="ltr" autoComplete="email" placeholder="you@company.com" className="rtl:text-end" aria-invalid={!!errors.email} />{errors.email && <span className="err">{errors.email}</span>}</div>
        <div className="field"><label htmlFor="phone">{t.phone}</label><input id="phone" name="phone" type="tel" dir="ltr" autoComplete="tel" placeholder="+967" className="rtl:text-end" /></div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <fieldset>
          <legend className="mb-4 text-[14px] text-mist">{t.budget}</legend>
          <div className="flex flex-wrap gap-2">{budgets.map((b) => <button type="button" key={b} className="opt" aria-pressed={budget === b} onClick={() => setBudget(b === budget ? "" : b)}>{b}</button>)}</div>
        </fieldset>
        <fieldset>
          <legend className="mb-4 text-[14px] text-mist">{t.when}</legend>
          <div className="flex flex-wrap gap-2">{timelines.map((x) => <button type="button" key={x} className="opt" aria-pressed={timeline === x} onClick={() => setTimeline(x === timeline ? "" : x)}>{x}</button>)}</div>
        </fieldset>
      </div>

      <div className="field"><label htmlFor="message">{t.msg}</label><textarea id="message" name="message" placeholder={t.msgPh} aria-invalid={!!errors.message} />{errors.message && <span className="err">{errors.message}</span>}</div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex flex-wrap items-center justify-between gap-5">
        <p className="text-[13px] text-mist">{t.note}</p>
        <button className="btn btn-ruby" disabled={state === "sending"}>{state === "sending" ? t.sending : t.send}</button>
      </div>
      {state === "error" && !Object.keys(errors).length && <p className="text-[14px] text-[var(--ruby-soft)]" role="alert">{t.fail}</p>}
    </form>
  );
}
