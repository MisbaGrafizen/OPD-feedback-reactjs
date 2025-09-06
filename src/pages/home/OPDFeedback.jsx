"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Languages,
  Phone,
  StarIcon,
  User,
  Stethoscope,
} from "lucide-react"
import { ApiPost } from "../../helper/axios"

import logo from "../../../public/images/Logo/GirirajFeedBackLogo.jpg"
import emoji1 from "../../../public/images/emojiFolder/11.png"
import emoji2 from "../../../public/images/emojiFolder/2.png"
import emoji3 from "../../../public/images/emojiFolder/3.png"
import emoji4 from "../../../public/images/emojiFolder/4.png"
import emoji5 from "../../../public/images/emojiFolder/5.png"
import emoji6 from "../../../public/images/emojiFolder/6.png"
import emoji7 from "../../../public/images/emojiFolder/7.png"
import emoji8 from "../../../public/images/emojiFolder/8.png"
import emoji9 from "../../../public/images/emojiFolder/9.png"
import emoji10 from "../../../public/images/emojiFolder/1.png"
const theme = {
  primaryBg: "bg-red-600 hover:bg-red-700",
  card: "rounded-[28px] border border-red-200 bg-[radial-gradient(1200px_600px_at_30%_-10%,rgba(255,0,0,0.1),transparent_60%),linear-gradient(to_bottom_right,rgba(255,255,255,0.95),rgba(255,0,0,0.06))] shadow-[0_10px_40px_rgba(244,63,94,0.20)]",
}

// Language dictionary
const dict = {
  en: {
    // Step 0
    step0Title: "Thank you for helping us in improving patient experience",
    step0Subtitle: "We value your feedback",
    chooseLang: "Choose your language",
    english: "English",
    hindi: "हिंदी",
    gujarati: "ગુજરાતી",

    // Common buttons
    back: "Back",
    next: "Next",
    submit: "Submit",

    // Step 1: Personal
    step1Title: "Personal Details",
    name: "Name",
    mobile: "Mobile No",
    doctorName: "Consultant Doctor Name",

    // Validations
    vName: "Name is required",
    vMobile: "Enter a valid mobile number",
    vDoctor: "Please select a consultant doctor",

    // Step 2: Services Feedback
    step2Title: "Please rate your experience",
    appointment: "Appointment",
    reception: "Reception Staff",
    diagnostic: "Diagnostic Services",
    laboratory: "Laboratory",
    radiology: "Radiology",
    doctorServices: "Doctor Services",
    security: "Security",
    comments: "Comments (optional)",

    // Step 3: Awareness
    step3Title: "How did you come to know about our hospital?",
    awarenessOptions: [
      "Social Media",
      "Through Doctor",
      "Hoarding",
      "Radio/FM",
      "Website",
      "Friends/Relatives",
      "Walk-in",
      "Others",
    ],

    // Step 4: Recommendation
    step4Title: "How likely are you to recommend our hospital to others?",
    npsNotLikely: "Not Likely",
    npsMaybe: "Maybe",
    npsLikely: "Likely",

    // Thank you
    thanksTitle: "Thank you!",
    thanksBody: "Your feedback has been submitted successfully.",
  },
  hi: {
    step0Title: "रोगी अनुभव को बेहतर बनाने में हमारी मदद करने के लिए धन्यवाद",
    step0Subtitle: "हम आपके फीडबैक को महत्व देते हैं",
    chooseLang: "भाषा चुनें",
    english: "English",
    hindi: "हिंदी",
    gujarati: "ગુજરાતી",

    back: "वापस",
    next: "आगे",
    submit: "जमा करें",

    step1Title: "व्यक्तिगत विवरण",
    name: "नाम",
    mobile: "मोबाइल नंबर",
    doctorName: "कंसल्टेंट डॉक्टर का नाम",

    vName: "नाम आवश्यक है",
    vMobile: "कृपया मान्य मोबाइल नंबर दर्ज करें",
    vDoctor: "कंसल्टेंट डॉक्टर चुनें",

    step2Title: "कृपया अपने अनुभव को रेट करें",
    appointment: "अपॉइंटमेंट",
    reception: "रिसेप्शन स्टाफ",
    diagnostic: "डायग्नोस्टिक सेवाएँ",
    laboratory: "प्रयोगशाला",
    radiology: "रेडियोलॉजी",
    doctorServices: "डॉक्टर सेवाएँ",
    security: "सिक्योरिटी",
    comments: "टिप्पणी (वैकल्पिक)",

    step3Title: "आप हमारे अस्पताल के बारे में कैसे जानते हैं?",
    awarenessOptions: [
      "सोशल मीडिया",
      "डॉक्टर के माध्यम से",
      "होर्डिंग",
      "रेडियो/एफएम",
      "वेबसाइट",
      "दोस्त/रिश्तेदार",
      "वॉक-इन",
      "अन्य",
    ],

    step4Title: "आप हमारे अस्पताल की सिफारिश दूसरों को करने की कितनी संभावना रखते हैं?",
    npsNotLikely: "संभावना कम",
    npsMaybe: "शायद",
    npsLikely: "संभावित",

    thanksTitle: "धन्यवाद!",
    thanksBody: "आपका फीडबैक सफलतापूर्वक जमा हो गया है।",
  },
  gu: {
    step0Title: "દર્દી અનુભવ સુધારવામાં અમને મદદ કરવા બદલ આભાર",
    step0Subtitle: "અમે તમારા પ્રતિસાદને મૂલ્ય આપીએ છીએ",
    chooseLang: "ભાષા પસંદ કરો",
    english: "English",
    hindi: "હિન્દી",
    gujarati: "ગુજરાતી",

    back: "પાછળ",
    next: "આગળ",
    submit: "સબમિટ",

    step1Title: "વ્યક્તિગત વિગતો",
    name: "નામ",
    mobile: "મોબાઇલ નંબર",
    doctorName: "કન્સલ્ટન્ટ ડોક્ટરનું નામ",

    vName: "નામ આવશ્યક છે",
    vMobile: "કૃપા કરીને માન્ય મોબાઇલ નંબર દાખલ કરો",
    vDoctor: "કન્સલ્ટન્ટ ડોક્ટર પસંદ કરો",

    step2Title: "કૃપા કરીને તમારા અનુભવને રેટ કરો",
    appointment: "અપોઇન્ટમેન્ટ",
    reception: "રિસેપ્શન સ્ટાફ",
    diagnostic: "ડાયગ્નોસ્ટિક સેવાઓ",
    laboratory: "લેબોરેટરી",
    radiology: "રેડિયોલોજી",
    doctorServices: "ડોક્ટર સેવાઓ",
    security: "સિક્યુરિટી",
    comments: "ટિપ્પણી (વૈકલ્પિક)",

    step3Title: "અમારા હોસ્પિટલ વિશે તમને કેવી રીતે ખબર પડી?",
    awarenessOptions: ["સોશિયલ મીડિયા", "ડોક્ટર દ્વારા", "હોર્ડિંગ", "રેડિયો/એફએમ", "વેબસાઇટ", "મિત્રો/સગાં", "વૉક-ઇન", "અન્ય"],

    step4Title: "તમે અમારી હોસ્પિટલની ભલામણ અન્ય લોકોને કરવાની કેટલી શક્યતા છે?",
    npsNotLikely: "શક્ય નથી",
    npsMaybe: "કદાચ",
    npsLikely: "ખૂબ શક્ય",

    thanksTitle: "આભાર!",
    thanksBody: "તમારો પ્રતિસાદ સફળતાપૂર્વક સબમિટ થયો છે.",
  },
}

const OPD_ENDPOINT = "/opd-patient";


// Framer Motion variants
const sectionVariants = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.18 } },
}


const servicesConfig = [
  {
    title: "appointment",
    options: [{ key: "appointment" }],
  },
  {
    title: "receptionStaff",
    options: [{ key: "frontDesk" }],
  },
  {
    title: "diagnosticServices",
    options: [
      { key: "laboratory" },
      { key: "radiology" },
    ],
  },
  {
    title: "doctorServices",
    options: [
      { key: "consultant" }, // you can adjust if you want sub-options like before
      { key: "medical" },
    ],
  },
  {
    title: "security",
    options: [{ key: "security" }],
  },
]

const emojiRows = [
  // Row 1 → Definitely (10, 9)
  [
    { value: 10, src: emoji10 },
    { value: 9, src: emoji9 },
  ],
  // Row 2 → Maybe (8, 7)
  [
    { value: 8, src: emoji8 },
    { value: 7, src: emoji7 },
  ],
  // Row 3 → Not at all (6, 5, 4, 3)
  [
    { value: 6, src: emoji6 },
    { value: 5, src: emoji5 },
    { value: 4, src: emoji4 },
    { value: 3, src: emoji3 },
  ],
  // Row 4 → Not at all (2, 1)
  [
    { value: 2, src: emoji2 },
    { value: 1, src: emoji1 },
  ],
]
// Floating input
function FloatingInput({ icon: Icon, label, type = "text", value, onChange, error, inputProps = {} }) {
  return (
    <div>
      <div
        className={`relative rounded-[14px] border bg-white ${error ? "border-red-400" : "border-gray-200"
          } focus-within:border-red-400`}
      >
        {Icon ? (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`peer w-full bg-transparent outline-none ${Icon ? "px-12" : "px-4"} pt-5 pb-2 rounded-[14px]`}
          placeholder=" "               // IMPORTANT for :placeholder-shown to work
          {...inputProps}
        />

        <label
          className={`pointer-events-none absolute ${Icon ? "left-12" : "left-4"} bg-white px-1
            transition-all
            top-3 text-base text-gray-500
            peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-red-600
            peer-[&:not(:placeholder-shown)]:top-1.5
            peer-[&:not(:placeholder-shown)]:text-xs
            peer-[&:not(:placeholder-shown)]:text-gray-600`}
        >
          {label}
        </label>
      </div>

      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  )
}


// Floating textarea
function FloatingTextarea({ label, value, onChange, rows = 3 }) {
  return (
    <div className="relative">
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer w-full resize-y rounded-[14px] border border-gray-200 bg-white p-4 pt-4 h-[80px] outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-200"
      />
      <label
        className={`pointer-events-none absolute left-4 top-3 text-gray-500 transition-all bg-white px-1
          peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
          peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-red-600
          peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-600`}
      >
        {label}
      </label>
    </div>
  )
}

// Text button with icon (Back/Next/Submit)
function TextIconButton({ icon: Icon, children, onClick, variant = "solid", className = "", disabled = false }) {
  const base =
    "inline-flex items-center gap-2 rounded-[8px] px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-red-500"
  const styles =
    variant === "solid"
      ? "bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
      : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
  return (
    <button type="button" onClick={onClick} className={`${base} ${styles} ${className}`} disabled={disabled}>
      {children}
      <Icon className="h-4 w-4" />
    </button>
  )
}

function ServiceFeedback({ title, options, t }) {
    const [selected, setSelected] = useState(options[0].key)
    const [ratings, setRatings] = useState({})
    const [comments, setComments] = useState({})
    const [awareness, setAwareness] = useState(null);


    return (
        <div className="border flex flex-col md:flex-row justify-between w-[100%] gap-[10px] md:items-center rounded-xl md:px-[20px] py-3 mb-2 px-[10px] bg-white shadow-sm">
            <div>


                <h3 className="text-[15px] font-[500] mb-1">{t(title)}</h3>

                {/* Radio Options */}
                <div className="flex gap-4 ">
                    {options.map((opt) => (
                        <label key={opt.key} className="flex items-center gap-2 text-[13px] cursor-pointer">
                            <input
                                type="radio"
                                name={title}
                                value={opt.key}
                                checked={selected === opt.key}
                                onChange={() => setSelected(opt.key)}
                                className="accent-red-600 w-[15px] h-[15px]"
                            />
                            {t(opt.key)}
                        </label>
                    ))}
                </div>
            </div>
            {/* Stars */}
            <div className="">
                <Stars
                    value={ratings[selected] || 0}
                    onChange={(v) => setRatings((r) => ({ ...r, [selected]: v }))}
                />
            </div>

            {/* Comments */}

        </div>
    )
}
// Stars 1..5
function Stars({ value = 0, onChange, label }) {
  const stars = [1, 2, 3, 4, 5]
  return (
    <div className="flex items-center gap-2" aria-label={`${label || "Rating"}: ${value} of 5`} role="img">
      {stars.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className="p-1"
          aria-label={`Rate ${s}`}
          title={`Rate ${s}`}
        >
          <StarIcon
            className={`h-6 w-6 ${s <= value ? "text-yellow-400" : "text-gray-300 hover:text-gray-400"} transition`}
            strokeWidth={1.6}
            fill={s <= value ? "currentColor" : "none"}
          />
        </button>
      ))}
    </div>
  )
}

// Animated dropdown (Framer Motion)
function AnimatedDropdown({ label, icon: Icon, options, selected, onSelect, placeholder = "Select..." }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onDoc(e) {
      if (!ref.current) return
      if (!ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [])

  return (
    <div ref={ref} className="relative">
      <div className="relative rounded-[14px] border border-gray-200 bg-white focus-within:border-red-400">
        {Icon ? (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`w-full text-left ${Icon ? "pl-12" : "pl-4"} pr-10 py-3 rounded-[14px]`}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className={`text-sm ${selected ? "text-gray-900" : "text-gray-500"}`}>{selected || placeholder}</span>
        </button>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute z-30 mt-2 w-full max-h-60 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg"
            role="listbox"
          >
            {options.map((opt, idx) => (
              <motion.li
                key={opt}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.02 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    onSelect(opt)
                    setOpen(false)
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-red-50 focus:bg-red-50 text-gray-900"
                >
                  {opt}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
// Circular emotive button used on the NPS screen
function EmoteButton({ value, src, selected, onSelect }) {
  const isActive = selected === value
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => onSelect(value)}
        className={`relative grid h-16 w-16 place-items-center rounded-full  transition
          ${isActive ? "scale-110 d" : "opacity-40 border-gray-300"}`}
      >
        <img src={src} alt={`Emoji ${value}`} className="md:h-15 h-[60px] w-[60px] md:w-15 object-contain" />
      </button>
      <span
        className={`mt-1 text-sm font-semibold transition ${
          isActive ? "opacity-100 scale-105" : "opacity-40"
        }`}
      >
        {value}
      </span>
    </div>
  )
}


// NPS segmented (0-6 red, 7-8 yellow, 9-10 green)
function NpsSegmented({ value, onChange, t }) {
  const btn = (n, colorClasses) => (
    <button
      key={n}
      type="button"
      onClick={() => onChange(n)}
      className={`h-12 w-12 rounded-full text-sm font-semibold transition border ${colorClasses} ${value === n ? "ring-2 ring-offset-1 ring-current" : ""
        }`}
      aria-label={`NPS ${n}`}
      title={`NPS ${n}`}
    >
      {n}
    </button>
  )

  return (
    <div className="space-y-6">
      <div>
        <p className="text-center text-red-600 font-semibold">{t("npsNotLikely")}</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          {[0, 1, 2, 3, 4, 5, 6].map((n) => btn(n, "border-red-600 text-red-600 hover:bg-red-50"))}
        </div>
      </div>
      <div>
        <p className="text-center text-yellow-600 font-semibold">{t("npsMaybe")}</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          {[7, 8].map((n) => btn(n, "border-yellow-500 text-yellow-600 hover:bg-yellow-50"))}
        </div>
      </div>
      <div>
        <p className="text-center text-green-700 font-semibold">{t("npsLikely")}</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          {[9, 10].map((n) => btn(n, "border-green-700 text-green-700 hover:bg-green-50"))}
        </div>
      </div>
    </div>
  )
}

export default function OPDFeedback() {
  // Language
  const [lng, setLng] = useState("en")
  const t = (k) => dict[lng][k] || k

  // Step: 0..5
  const [step, setStep] = useState(0)

  // Step 1: Personal
  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")
  const [doctor, setDoctor] = useState("")
  const [errors, setErrors] = useState({})
  const DOCTORS = useMemo(
    () => ["Dr. Sharma", "Dr. Mehta", "Dr. Patel", "Dr. Gupta", "Dr. Rao", "Dr. Singh", "Dr. Das", "Dr. Iyer"],
    [],
  )

  // Step 2: Ratings
  const [ratings, setRatings] = useState({
    appointment: 0,
    reception: 0,
    diagnostic: 0,
    laboratory: 0,
    radiology: 0,
    doctorServices: 0,
    security: 0,
  })
  const [comments, setComments] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Map UI ratings -> backend keys (mirrors IPD names; extras are sent too)
  const mapRatingsForBackend = (r) => ({
    // IPD-like keys
    appointmentBooking: r.appointment || 0,
    receptionStaff: r.reception || 0,
    labServices: r.laboratory || 0,
    radiologyServices: r.radiology || 0,
    doctorServices: r.doctorServices || 0,

    // If your OPD backend also stores these, they’ll arrive; otherwise ignored
    diagnosticServices: r.diagnostic || 0,
    security: r.security || 0,
  });

  // Final submission on Step 4
  const handleSubmitOPD = async () => {
    // Make sure Step 1 is valid and NPS chosen
    if (!validateStep1()) { setStep(1); return; }
    if (nps === null) { alert("Please select a recommendation score."); return; }

    setIsSubmitting(true);
    try {
      const payload = {
        language: lng,
        patientName: name,
        contact: mobile,
        consultantDoctor: doctor,
        ratings: mapRatingsForBackend(ratings),
        comments,
        awareness: awareness,
        overallRecommendation: nps,
      };

      await ApiPost(OPD_ENDPOINT, payload);

      // show toast then go to Thank-you screen
      setShowSaved(true);
      setTimeout(() => {
        setShowSaved(false);
        setStep(5);
      }, 800);
    } catch (err) {
      console.error("OPD submit failed:", err);
      alert("Could not submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 3: Awareness (multi-select)
  const AWARE = dict[lng].awarenessOptions
  const [awareness, setAwareness] = useState([])
  useEffect(() => {
    // Keep values stable when language changes
    // Awareness options are matched by index across languages
  }, [lng])

  // Step 4: NPS
  const [nps, setNps] = useState(null)

  // Thanks modal state inline page (Step 5 is a screen)
  const [showSaved, setShowSaved] = useState(false)

  // Apply html lang attribute for accessibility
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lng
      document.documentElement.dir = "ltr"
    }
  }, [lng])

  const validateStep1 = () => {
    const e = {}
    if (!name.trim()) e.name = dict[lng].vName
    const digits = mobile.replace(/[^\d]/g, "")
    if (digits.length < 10 || digits.length > 15) e.mobile = dict[lng].vMobile
    if (!doctor) e.doctor = dict[lng].vDoctor
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const toggleAwareness = (opt) => {
    setAwareness((prev) => (prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]))
  }

  const canNext =
    step === 0
      ? true
      : step === 1
        ? name.trim() && mobile.replace(/[^\d]/g, "").length >= 10 && doctor
        : step === 2
          ? true
          : step === 3
            ? true
            : step === 4
              ? nps !== null
              : true

  // Step dots (5 steps before thanks)
  const activeDot = step

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <main className="mx-auto max-w-[760px] px-4 py-8" lang={lng}>
        <div className={`${theme.card} p-6 sm:p-8`}>
          <AnimatePresence mode="wait">
            {/* Step 0: Language Selection */}
            {step === 0 && (
              <motion.section key="lang" variants={sectionVariants} initial="initial" animate="animate" exit="exit">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={logo}
                    alt="Hospital logo"
                    className="h-16 w-auto mb-4"
                    crossOrigin="anonymous"
                  />
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-[600] text-gray-900">{t("step0Title")}</h1>
                  <p className="mt-2  text-gray-700">{t("step0Subtitle")}</p>

                  <div className="mt-20 w-full text-left">
                    <p className="text-sm font-semibold text-gray-900">{t("chooseLang")}</p>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {[
                        { id: "en", label: dict.en.english },
                        { id: "hi", label: dict.en.hindi },
                        { id: "gu", label: dict.en.gujarati },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setLng(opt.id)}
                          className={`inline-flex items-center gap-2 rounded-[8px] px-4 py-2 text-sm font-semibold transition ${lng === opt.id
                            ? "bg-red-600 text-white"
                            : "border border-gray-200 bg-white text-gray-800 hover:border-red-300"
                            }`}
                        >
                          <Languages className="h-4 w-4" />
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 w-full flex justify-end">
                    <TextIconButton
                      icon={ArrowRight}
                      onClick={() => setStep(1)}
                      variant="solid"
                      className={theme.primaryBg}
                    >
                      {t("next")}
                    </TextIconButton>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Step 1: Personal Details */}
            {step === 1 && (
              <motion.section key="personal" variants={sectionVariants} initial="initial" animate="animate" exit="exit">
                <h2 className="text-2xl sm:text-3xl font-[600] text-gray-900 mb-6">{t("step1Title")}</h2>

                <div className="space-y-4">
                  <FloatingInput
                    icon={User}
                    label={t("name")}
                    value={name}
                    onChange={setName}
                    error={errors.name}
                    inputProps={{ placeholder: " " }}
                  />
                  <FloatingInput
                    icon={Phone}
                    type="tel"
                    label={t("mobile")}
                    value={mobile}
                    onChange={setMobile}
                    error={errors.mobile}
                    inputProps={{ inputMode: "numeric", placeholder: " " }}
                  />
                  <div>
                    <AnimatedDropdown
                      label={t("doctorName")}
                      icon={Stethoscope}
                      options={DOCTORS}
                      selected={doctor}
                      onSelect={setDoctor}
                      placeholder={t("doctorName")}
                    />
                    {errors.doctor ? <p className="mt-1 text-xs text-red-600">{errors.doctor}</p> : null}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <TextIconButton icon={ArrowLeft} onClick={() => setStep(0)} variant="outline">
                    {t("back")}
                  </TextIconButton>
                  <TextIconButton
                    icon={ArrowRight}
                    onClick={() => {
                      if (validateStep1()) setStep(2)
                    }}
                    variant="solid"
                    className={theme.primaryBg}
                    disabled={!canNext}
                  >
                    {t("next")}
                  </TextIconButton>
                </div>
              </motion.section>
            )}

            {/* Step 2: Services Feedback */}
            {step === 2 && (
              <motion.section key="services" variants={sectionVariants} initial="initial" animate="animate" exit="exit">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-[600] text-gray-900">{t("step2Title")}</h2>
                </div>
                {servicesConfig.map((srv) => (
                  <ServiceFeedback
                    key={srv.title}
                    title={srv.title}
                    options={srv.options}
                    t={t}
                  />
                ))}



                <div className="mt-6">
                  <FloatingTextarea label={t("comments")} value={comments} onChange={setComments} rows={4} />
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <TextIconButton icon={ArrowLeft} onClick={() => setStep(1)} variant="outline">
                    {t("back")}
                  </TextIconButton>
                  <TextIconButton
                    icon={ArrowRight}
                    onClick={() => setStep(3)}
                    variant="solid"
                    className={theme.primaryBg}
                  >
                    {t("next")}
                  </TextIconButton>
                </div>
              </motion.section>
            )}

            {/* Step 3: Awareness */}
            {step === 3 && (
              <motion.section
                key="awareness"
                variants={sectionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <h2 className="text-2xl font-[600] text-gray-900 text-center">{t("step3Title")}</h2>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {dict[lng].awarenessOptions.map((opt) => {
                    const active = awareness === opt
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAwareness(opt)}
                        className={`rounded-[8px] px-3 py-2 text-sm font-medium transition border ${active
                          ? "border-red-600 bg-red-50 text-red-700"
                          : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                          }`}
                        aria-pressed={active}
                      >
                        {opt}
                      </button>
                    )
                  })}

                </div>

                <div className="mt-8 flex items-center justify-between">
                  <TextIconButton icon={ArrowLeft} onClick={() => setStep(2)} variant="outline">
                    {t("back")}
                  </TextIconButton>
                  <TextIconButton
                    icon={ArrowRight}
                    onClick={() => setStep(4)}
                    variant="solid"
                    className={theme.primaryBg}
                  >
                    {t("next")}
                  </TextIconButton>
                </div>
              </motion.section>
            )}

            {/* Step 4: Recommendation (NPS) */}
            {step === 4 && (
              <motion.section key="nps" variants={sectionVariants} initial="initial" animate="animate" exit="exit">
                <h2 className="text-2xl font-[600] text-gray-900 text-center">{t("step4Title")}</h2>

    {/* Row 1: Definitely */}
    <div className="mt-6">
      <p className="text-center text-green-700 font-semibold">{t("npsLikely")}</p>
      <div className="mt-3 flex justify-center gap-10">
        {[{ v: 10, img: emoji10 }, { v: 9, img: emoji9 }].map((item) => (
          <EmoteButton
            key={item.v}
            value={item.v}
            src={item.img}
            selected={nps}
            onSelect={setNps}
          />
        ))}
      </div>
    </div>

    {/* Row 2: Maybe */}
    <div className="mt-8">
      <p className="text-center text-yellow-600 font-semibold">{t("npsMaybe")}</p>
      <div className="mt-3 flex justify-center gap-10">
        {[{ v: 8, img: emoji8 }, { v: 7, img: emoji7 }].map((item) => (
          <EmoteButton
            key={item.v}
            value={item.v}
            src={item.img}
            selected={nps}
            onSelect={setNps}
          />
        ))}
      </div>
    </div>

    {/* Row 3: Not at all */}
    <div className="mt-8">
      <p className="text-center text-red-600 font-semibold">{t("npsNotLikely")}</p>
      <div className="mt-3 flex justify-center gap-6">
        {[{ v: 6, img: emoji6 }, { v: 5, img: emoji5 }, { v: 4, img: emoji4 }, { v: 3, img: emoji3 }].map((item) => (
          <EmoteButton
            key={item.v}
            value={item.v}
            src={item.img}
            selected={nps}
            onSelect={setNps}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-10">
        {[{ v: 2, img: emoji2 }, { v: 1, img: emoji1 }].map((item) => (
          <EmoteButton
            key={item.v}
            value={item.v}
            src={item.img}
            selected={nps}
            onSelect={setNps}
          />
        ))}
      </div>
    </div>

                <div className="mt-8 flex items-center justify-between">
                  <TextIconButton icon={ArrowLeft} onClick={() => setStep(3)} variant="outline">
                    {t("back")}
                  </TextIconButton>

                  <TextIconButton
                    icon={ArrowRight}
                    onClick={handleSubmitOPD}
                    variant="solid"
                    className={theme.primaryBg}
                    disabled={nps === null || isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : t("submit")}
                  </TextIconButton>

                </div>
              </motion.section>
            )}

            {/* Step 5: Thank-you */}
            {step === 5 && (
              <motion.section key="thanks" variants={sectionVariants} initial="initial" animate="animate" exit="exit">
                <div className="flex flex-col items-center text-center py-8">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                  <h3 className="mt-3 text-2xl font-bold text-gray-900">{t("thanksTitle")}</h3>
                  <p className="mt-2 text-gray-700">{t("thanksBody")}</p>
                  <div className="mt-6">
                    <TextIconButton
                      icon={ArrowRight}
                      onClick={() => {
                        // Reset to Step 0 (keep selected language)
                        setStep(0)
                        setName("")
                        setMobile("")
                        setDoctor("")
                        setErrors({})
                        setRatings({
                          appointment: 0,
                          reception: 0,
                          diagnostic: 0,
                          laboratory: 0,
                          radiology: 0,
                          doctorServices: 0,
                          security: 0,
                        })
                        setComments("")
                        setAwareness([])
                        setNps(null)
                      }}
                      variant="solid"
                      className={theme.primaryBg}
                    >
                      {t("next")}
                    </TextIconButton>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Step indicator (0..4 visible steps) */}
        <Dots total={5} active={Math.min(activeDot, 4)} />
      </main>

      {/* Small toast-like saved feedback */}
      <AnimatePresence>
        {showSaved && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              className={`${theme.card} w-full max-w-sm p-6 text-center`}
            >
              <CheckCircle2 className="mx-auto h-10 w-10 text-green-600" />
              <h3 className="mt-2 text-lg font-bold text-gray-900">{t("thanksTitle")}</h3>
              <p className="mt-1 text-sm text-gray-600">{t("thanksBody")}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Dots({ total = 5, active = 0 }) {
  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`h-2 rounded-full ${i === active ? "w-6 bg-red-600" : "w-2 bg-gray-300"}`} />
      ))}
    </div>
  )
}
