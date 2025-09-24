"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Check,
  Languages,Search,
  Phone,
  StarIcon,
  User,
  Stethoscope,
} from "lucide-react"
import { ApiDelete, ApiGet, ApiPost } from "../../helper/axios"

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
  // primaryBg: "bg-red-600 hover:bg-red-700",
  card:
    "rounded-[22px] border-[1.4px] border-gray-300 shadow-md ",
}

const dict = {
  en: {
    step0Title: "Welcome to SHREE GIRIRAJ HOSPITAL",
    step0Subtitle: "With passion, commitment and experience the team at Shree Giriraj Hospital focuses on serving their patients with the utmost possible care and compassion.",
    welcomeP2:
      "We are glad to hear you out. Your feedback matters to us and helps us improve our services. Let us know by providing a quick review on our services.",
    chooseLang: "Choose your language",
    english: "English",
    hindi: "हिंदी",
    gujarati: "ગુજરાતી",

    back: "Back",
    next: "Next",
    submit: "Submit",

    step1Title: "Personal Details",
    name: "Name",
    mobile: "Mobile No",
    doctorName: "Consultant Doctor Name",

    vName: "Name is required",
    vMobile: "Enter a 10-digit mobile number",
    vDoctor: "Please select a consultant doctor",

    step2Title: "Please rate your experience",
    mustRateAtLeast: "Please rate at least {n} services. Currently rated: {c}.",
    ratedCount: "Rated {c}/{n} required",
    appointment: "Appointment",
    receptionStaff: "Reception Staff",
    diagnosticServices: "Diagnostic Services",
    radiologyDiagnosticServices: "Diagnostic Services (Radiology)",
    pathologyDiagnosticServices: "Diagnostic Services (Pathology)",
    doctorServices: "Doctor Services",
    consultant: "Consultant",
    medical: "Medical Officer",
    security: "Security",
    comments: "Comments (optional)",

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

    step4Title: "How likely are you to recommend our hospital to others?",
    npsNotLikely: "Not Likely",
    npsMaybe: "Maybe",
    npsLikely: "Likely",

    thanksTitle: "Thank you!",
    thanksBody: "Your feedback has been submitted successfully.",
  },
  hi: {
    step0Title: "SHREE GIRIRAJ HOSPITAL में आपका स्वागत है",
    step0Subtitle: "समर्पण, प्रतिबद्धता और अनुभव के साथ श्री गिरिराज अस्पताल की टीम रोगियों की सेवा सर्वोत्तम देखभाल और करुणा से करती है।",
    welcomeP2:
      "हमें आपकी बात सुनकर खुशी होगी। आपका फीडबैक हमारे लिए महत्वपूर्ण है और हमारी सेवाओं को बेहतर बनाने में मदद करता है। कृपया त्वरित समीक्षा देकर हमें बताएं।",
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
    vMobile: "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें",
    vDoctor: "कंसल्टेंट डॉक्टर चुनें",

    step2Title: "कृपया अपने अनुभव को रेट करें",
    mustRateAtLeast: "कम से कम {n} सेवाओं को रेट करें। अभी: {c}।",
    ratedCount: "{n} में से {c} सेवाएँ रेट कीं",
    appointment: "अपॉइंटमेंट",
    receptionStaff: "रिसेप्शन स्टाफ",
    diagnosticServices: "डायग्नोस्टिक सेवाएँ",
    radiologyDiagnosticServices: "डायग्नोस्टिक सेवाएँ (रेडियोलॉजी)",
    pathologyDiagnosticServices: "डायग्नोस्टिक सेवाएँ (पैथोलॉजी)",
    doctorServices: "डॉक्टर सेवाएँ",
    consultant: "कंसल्टेंट",
    medical: "मेडिकल ऑफिसर",
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
    step0Title: "SHREE GIRIRAJ HOSPITAL માં આપનું સ્વાગત છે",
    step0Subtitle: "સમર્પણ, પ્રતિબદ્ધતા અને અનુભવ સાથે શ્રી ગિરિરાજ હોસ્પિટલની ટીમ દર્દીઓને શ્રેષ્ઠ કાળજી અને કરુણા સાથે સેવા આપે છે.",
    welcomeP2:
      "અમને તમારો અવાજ સાંભળવો ગમે છે. તમારો પ્રતિસાદ અમારે માટે મહત્વનો છે અને અમારી સેવાઓ સુધારવામાં મદદ કરે છે. કૃપા કરીને ઝડપી સમીક્ષા આપો.",
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
    vMobile: "કૃપા કરીને 10 અંકોનો મોબાઇલ નંબર દાખલ કરો",
    vDoctor: "કન્સલ્ટન્ટ ડોક્ટર પસંદ કરો",

    step2Title: "કૃપા કરીને તમારા અનુભવને રેટ કરો",
    mustRateAtLeast: "ઓછામાં ઓછા {ન} સેવાઓને રેટ કરો. હાલ: {c}.",
    ratedCount: "{n} માંથી {c} સેવાઓ રેટ થઈ",
    appointment: "અપોઇન્ટમેન્ટ",
    receptionStaff: "રિસેપ્શન સ્ટાફ",
    diagnosticServices: "ડાયગ્નોસ્ટિક સેવાઓ",
    radiologyDiagnosticServices: "ડાયગ્નોસ્ટિક સેવાઓ (રેડિયોલોજી)",
    pathologyDiagnosticServices: "ડાયગ્નોસ્ટિક સેવાઓ (પેઠોલોજી)",
    doctorServices: "ડોક્ટર સેવાઓ",
    consultant: "કન્સલ્ટન્ટ",
    medical: "મેડિકલ ઓફિસર",
    security: "સિક્યુરિટી",
    comments: "ટિપ્પણી (વૈકલ્પિક)",

    step3Title: "અમારા હોસ્પિટલ વિશે તમને કેવી રીતે ખબર પડી?",
    awarenessOptions: [
      "સોશિયલ મીડિયા",
      "ડોક્ટર દ્વારા",
      "હોર્ડિંગ",
      "રેડિયો/એફએમ",
      "વેબસાઇટ",
      "મિત્રો/સગાં",
      "વૉક-ઇન",
      "અન્ય",
    ],

    step4Title: "તમે અમારી હોસ્પિટલની ભલામણ અન્ય લોકોને કરવાની કેટલી શક્યતા છે?",
    npsNotLikely: "શક્ય નથી",
    npsMaybe: "કદાચ",
    npsLikely: "ખૂબ શક્ય",

    thanksTitle: "આભાર!",
    thanksBody: "તમારો પ્રતિસાદ સફળતાપૂર્વક સબમિટ થયો છે.",
  },
}

const OPD_ENDPOINT = "/opd-patient"
const MIN_REQUIRED_RATINGS = 3

// services (diagnostics split → radiology/pathology)
const servicesConfig = [
  { title: "appointment", options: [{ key: "appointment" }] },
  { title: "receptionStaff", options: [{ key: "receptionStaff" }] },
  { title: "radiologyDiagnosticServices", options: [{ key: "radiologyDiagnosticServices" }] },
  { title: "pathologyDiagnosticServices", options: [{ key: "pathologyDiagnosticServices" }] },
  { title: "doctorServices", options: [{ key: "doctorServices" }] },
  { title: "security", options: [{ key: "security" }] },
]

const AWARENESS_ENUMS = [
  "socialMedia",
  "throughDoctor",
  "hoarding",
  "radio",
  "website",
  "friendsRelatives",
  "walkIn",
  "others",
]

const DOCTOR_TYPE_MAP = { consultant: "Consultant", medical: "Medical Officer" }
const DIAGNOSTIC_TYPE_MAP = { radiology: "Radiology", pathology: "Pathology" }

const sectionVariants = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.18 } },
}

/* ---------- Inputs ---------- */
function FloatingInput({ icon: Icon, label, type = "text", value, onChange, error, inputProps = {} }) {
  return (
    <div>
      <div className={`relative rounded-[14px] border bg-white ${error ? "border-red-400" : "border-gray-200"} focus-within:border-red-400`}>
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
          placeholder=" "
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

function TextIconButton({
  icon: Icon,
  children,
  onClick,
  variant = "solid",
  className = "",
  disabled = false,
  iconPosition = "right", // NEW: "left" or "right"
}) {
  const base =
    "inline-flex items-center gap-2 rounded-[8px] px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-red-500"
  const styles =
    variant === "solid"
      ? "bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
      : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
      disabled={disabled}
    >
      {iconPosition === "left" && <Icon className="h-4 w-4" />}
      {children}
      {iconPosition === "right" && <Icon className="h-4 w-4" />}
    </button>
  )
}

 function AnimatedDropdown({
  icon: Icon,
  options,
  selected,
  onSelect,
  placeholder = "Select..."
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const ref = useRef(null)

  // Close when clicking outside
  useEffect(() => {
    function onDoc(e) {
      if (!ref.current) return
      if (!ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", onDoc)
    return () => document.removeEventListener("mousedown", onDoc)
  }, [])

  // Filter options
  const filtered = options.filter(opt =>
    opt.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div ref={ref} className="relative">
      {/* Main Button */}
      <div className="relative rounded-[14px] border border-gray-200 bg-white focus-within:border-red-400">
        {Icon ? (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className={`w-full text-left ${Icon ? "pl-12" : "pl-4"} pr-10 py-3 rounded-[14px]`}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span
            className={`text-sm ${selected ? "text-gray-900" : "text-gray-500"}`}
          >
            {selected || placeholder}
          </span>
        </button>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute z-30 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-lg"
          >
            {/* Search Bar */}
            <div className="flex items-center px-3 py-2 border-b border-gray-200">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full text-sm outline-none border-0 focus:ring-0"
              />
            </div>

            {/* Options */}
            <ul className="max-h-60 overflow-auto" role="listbox">
              {filtered.length === 0 && (
                <li className="px-3 py-2 text-gray-400 text-sm">No results</li>
              )}
              {filtered.map((opt, idx) => (
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
                      setQuery("")
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-red-50 focus:bg-red-50 text-gray-900"
                  >
                    {opt}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
/* ---------- Stars ---------- */
function Stars({ value = 0, onChange, label }) {
  const stars = [1, 2, 3, 4, 5]
  return (
    <div className="flex items-center gap-2" aria-label={`${label || "Rating"}: ${value} of 5`} role="img">
      {stars.map((s) => (
        <button key={s} type="button" onClick={() => onChange(s)} className="p-1" aria-label={`Rate ${s}`} title={`Rate ${s}`}>
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

/* ---------- Controlled ServiceFeedback ---------- */
function ServiceFeedback({ title, options, t, ratings, onRate, selected, onSelect }) {
  return (
    <div className="border flex flex-col md:flex-row justify-between w-full gap-3 md:items-center rounded-xl md:px-5 py-3 mb-2 px-3 bg-white shadow-sm">
      <div>
        <h3 className="text-[15px] font-[500] mb-1">{t(title) || title}</h3>
        <div className="flex gap-4">
          {/* {options.map((opt) => (
            <label key={opt.key} className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input
                type="radio"
                name={title}
                value={opt.key}
                checked={selected === opt.key}
                onChange={() => onSelect?.(opt.key)}
                className="accent-red-600 w-[15px] h-[15px]"
              />
              {t(opt.key) || opt.key}
            </label>
          ))} */}
        </div>
      </div>

      <div>
        <Stars
          value={typeof ratings === "object" ? ratings[selected] || 0 : ratings}
          onChange={(v) => onRate(title, selected, v)}
        />
      </div>
    </div>
  )
}

/* ---------- NPS Emoji Button ---------- */
function EmoteButton({ value, src, selected, onSelect }) {
  const isActive = selected === value
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => onSelect(value)}
        className={`relative grid h-16 w-16 place-items-center rounded-full transition ${isActive ? "scale-110" : "opacity-40 border-gray-300"}`}
      >
        <img src={src} alt={`Emoji ${value}`} className="md:h-15 h-[60px] w-[60px] md:w-15 object-contain" />
      </button>
      <span className={`mt-1 text-sm font-semibold transition ${isActive ? "opacity-100 scale-105" : "opacity-40"}`}>{value}</span>
    </div>
  )
}

/* ======================= MAIN ======================= */
export default function OPDFeedback() {
  const [lng, setLng] = useState("en")
  const t = (k) => dict[lng][k] || k

  const [step, setStep] = useState(0)

  // Personal
  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("") // digits only
  const [doctor, setDoctor] = useState("")
  const [errors, setErrors] = useState({})
  const DOCTORS = useMemo(
    () => ["Dr. Sharma", "Dr. Mehta", "Dr. Patel", "Dr. Gupta", "Dr. Rao", "Dr. Singh", "Dr. Das", "Dr. Iyer"],
    [],
  )

  // Ratings
  const [ratings, setRatings] = useState({
    appointment: 0,
    receptionStaff: 0,
    radiologyDiagnosticServices: 0,
    pathologyDiagnosticServices: 0,
    doctorServices: 0,
    security: 0,
  })


  const ratedCount = useMemo(
    () => Object.values(ratings).filter((v) => typeof v === "number" && v >= 1 && v <= 5).length,
    [ratings],
  )
  const [feedbackError, setFeedbackError] = useState("")
  const [comments, setComments] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [doctors, setDoctors] = useState([]);


  // Sub-service selections → to send doctorType & diagnosticType
  const [selectedOptions, setSelectedOptions] = useState({
    diagnosticServices: "radiology",
    doctorServices: "consultant",
  })

  // Awareness (single select by index)
  const [awarenessIdx, setAwarenessIdx] = useState(null)

  // NPS
  const [nps, setNps] = useState(null)

  // Toast
  const [showSaved, setShowSaved] = useState(false)

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lng
      document.documentElement.dir = "ltr"
    }
  }, [lng])

  const validateStep1 = () => {
    const e = {}
    if (!name.trim()) e.name = dict[lng].vName
    const digits = mobile.replace(/\D/g, "")
    if (digits.length !== 10) e.mobile = dict[lng].vMobile
    if (!doctor) e.doctor = dict[lng].vDoctor
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onRate = (serviceKey, optionKey, stars) => {
    setFeedbackError("")
    setRatings((prev) => ({
      ...prev,
      [serviceKey]: stars,
    }))
  }

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await ApiGet("/doctors"); 
        if (res?.data) {
          setDoctors(res.data); // [{ _id, name }]
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  const compactRatings = (obj) =>
    Object.fromEntries(Object.entries(obj).filter(([, v]) => typeof v === "number" && v >= 1 && v <= 5))

  const handleSubmitOPD = async () => {
    if (!validateStep1()) {
      setStep(1)
      return
    }
    if (ratedCount < MIN_REQUIRED_RATINGS) {
      setStep(2)
      setFeedbackError(
        (dict[lng].mustRateAtLeast || "Please rate at least {n} services. Currently rated: {c}.")
          .replace("{n}", String(MIN_REQUIRED_RATINGS))
          .replace("{c}", String(ratedCount)),
      )
      return
    }
    if (nps === null) {
      setStep(4)
      alert("Please select a recommendation score.")
      return
    }

    setIsSubmitting(true)
    try {
      const payload = {
        language: lng,
        patientName: name,
        contact: mobile, // digits-only, 10 length
        consultantDoctorName: doctor,
        ratings: compactRatings(ratings),
        comments,
        awareness: awarenessIdx !== null ? AWARENESS_ENUMS[awarenessIdx] : undefined,
        overallRecommendation: nps,
        doctorType: selectedOptions.doctorServices ? DOCTOR_TYPE_MAP[selectedOptions.doctorServices] : undefined,
        diagnosticType: selectedOptions.diagnosticServices ? DIAGNOSTIC_TYPE_MAP[selectedOptions.diagnosticServices] : undefined,
      }

      await ApiPost(OPD_ENDPOINT, payload)

      setShowSaved(true)
      setTimeout(() => {
        setShowSaved(false)
        setStep(5)
      }, 700)
    } catch (err) {
      console.error("OPD submit failed:", err)
      alert("Could not submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const canNext =
    step === 0
      ? true
      : step === 1
        ? name.trim() && mobile.replace(/\D/g, "").length === 10 && doctor
        : step === 2
          ? ratedCount >= MIN_REQUIRED_RATINGS
          : step === 4
            ? nps !== null
            : true

  const activeDot = step

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <main className="mx-auto max-w-4xl px-4 py-8" lang={lng}>
        <div className={`${theme.card} p-6 sm:p-8`}>
          <AnimatePresence mode="wait">
            {/* Step 0: Language */}
            {step === 0 && (
              <motion.section key="lang" variants={sectionVariants} initial="initial" animate="animate" exit="exit">
                <div className="flex flex-col items-center text-center">
                  <div className=" min-h-[270px] w-[100%]">


                    <img src={logo} alt="Hospital logo" className="h-16 w-fit  mx-auto mb-4" crossOrigin="anonymous" />
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-[600] text-gray-900">{t("step0Title")}</h1>
                    <p className="mt-2  text-gray-700">{t("step0Subtitle")}</p>
                    <p className="mt-3 text-gray-700">{t("welcomeP2")}</p>
                  </div>
                  <div className="mt-10 w-full text-left">
                    <p className="text-sm font-semibold text-gray-900">{t("chooseLang")}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        { id: "en", label: dict.en.english },
                        { id: "hi", label: dict.en.hindi },
                        { id: "gu", label: dict.en.gujarati },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setLng(opt.id)}
                          className={`inline-flex items-center gap-2 rounded-[8px] px-4 py-2 text-sm font-semibold transition ${lng === opt.id ? "bg-red-600 text-white" : "border border-gray-200 bg-white text-gray-800 hover:border-red-300"
                            }`}
                        >
                          <Languages className="h-4 w-4" />
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 w-full flex justify-end">
                    <TextIconButton icon={ArrowRight} onClick={() => setStep(1)} variant="solid" className={theme.primaryBg}>
                      {t("next")}
                    </TextIconButton>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Step 1: Personal */}
            {step === 1 && (
              <motion.section key="personal" variants={sectionVariants} initial="initial" animate="animate" exit="exit">
                <h2 className="text-2xl sm:text-3xl font-[600] text-gray-900 mb-6">{t("step1Title")}</h2>

                <div className="space-y-4">
                  <FloatingInput icon={User} label={t("name")} value={name} onChange={setName} error={errors.name} inputProps={{ placeholder: " " }} />

                  {/* MOBILE: keep digits, length 10 */}
                  <FloatingInput
                    icon={Phone}
                    type="tel"
                    label={t("mobile")}
                    value={mobile}
                    onChange={(raw) => setMobile(String(raw).replace(/\D/g, "").slice(0, 10))}
                    error={errors.mobile}
                    inputProps={{
                      inputMode: "numeric",
                      placeholder: " ",
                      maxLength: 10,
                      pattern: "\\d{10}",
                      title: dict[lng].vMobile,
                    }}
                  />

                  <div>
                    <AnimatedDropdown
                      icon={Stethoscope}
                      options={doctors.map((d) => d.name)}
                      selected={doctors.find((d) => d._id === doctor)?.name || ""}
                      onSelect={(opt) => {
                        const selectedDoc = doctors.find((d) => d.name === opt);
                        if (selectedDoc) {
                          setDoctor(selectedDoc._id);
                        }
                      }}
                      placeholder={t("doctorName")}
                    />
                    {errors.doctor ? <p className="mt-1 text-xs text-red-600">{errors.doctor}</p> : null}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <TextIconButton icon={ArrowLeft} iconPosition="left"
                    onClick={() => setStep(0)} variant="outline">
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
                    ratings={ratings[srv.title]}
                    onRate={onRate}
                    selected={selectedOptions[srv.title]}
                    onSelect={(opt) =>
                      setSelectedOptions((p) => ({ ...p, [srv.title]: opt }))
                    }
                  />
                ))}


                {/* Rated count + error */}
                <div className="mt-2">
                  <p className={`text-sm ${ratedCount >= MIN_REQUIRED_RATINGS ? "text-green-600" : "text-gray-600"}`}>
                    {(dict[lng].ratedCount || "Rated {c}/{n} required")
                      .replace("{c}", String(ratedCount))
                      .replace("{n}", String(MIN_REQUIRED_RATINGS))}
                  </p>
                  {!!feedbackError && <p className="text-sm text-red-600 mt-1">{feedbackError}</p>}
                </div>

                <div className="mt-6">
                  <FloatingTextarea label={t("comments")} value={comments} onChange={setComments} rows={4} />
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <TextIconButton icon={ArrowLeft} iconPosition="left"
                    onClick={() => setStep(1)} variant="outline">
                    {t("back")}
                  </TextIconButton>
                  <TextIconButton
                    icon={ArrowRight}
                    onClick={() => {
                      if (ratedCount < MIN_REQUIRED_RATINGS) {
                        setFeedbackError(
                          (dict[lng].mustRateAtLeast || "Please rate at least {n} services. Currently rated: {c}.")
                            .replace("{n}", String(MIN_REQUIRED_RATINGS))
                            .replace("{c}", String(ratedCount)),
                        )
                        return
                      }
                      setFeedbackError("")
                      setStep(3)
                    }}
                    variant="solid"
                    className={theme.primaryBg}
                    disabled={ratedCount < MIN_REQUIRED_RATINGS}
                  >
                    {t("next")}
                  </TextIconButton>
                </div>
              </motion.section>
            )}

            {/* Step 3: Awareness */}
            {step === 3 && (
              <motion.section key="awareness" variants={sectionVariants} initial="initial" animate="animate" exit="exit">
                <h2 className="text-2xl font-[600] text-gray-900 text-center">{t("step3Title")}</h2>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {dict[lng].awarenessOptions.map((opt, idx) => {
                    const active = awarenessIdx === idx
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAwarenessIdx(idx)}
                        className={`flex items-center justify-center gap-2 rounded-[8px] px-3 py-2 text-sm font-medium transition border relative
          ${active
                            ? "border-red-600 bg-red-50 text-red-700"
                            : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                          }`}
                        aria-pressed={active}
                      >
                        {/* Animated checkmark */}
                        <AnimatePresence>
                          {active && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0, x: -8 }}
                              animate={{ scale: 1, opacity: 1, x: 0 }}
                              exit={{ scale: 0, opacity: 0, x: -8 }}
                              transition={{ duration: 0.2 }}
                              className="text-green-600 flex-shrink-0"
                            >
                              <Check size={18} strokeWidth={4} />
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {opt}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <TextIconButton icon={ArrowLeft} iconPosition="left"
                    onClick={() => setStep(2)} variant="outline">
                    {t("back")}
                  </TextIconButton>
                  <TextIconButton icon={ArrowRight} onClick={() => setStep(4)} variant="solid" className={theme.primaryBg}>
                    {t("next")}
                  </TextIconButton>
                </div>
              </motion.section>
            )}

            {/* Step 4: NPS */}
            {step === 4 && (
              <motion.section key="nps" variants={sectionVariants} initial="initial" animate="animate" exit="exit">
                <h2 className="text-2xl font-[600] text-gray-900 text-center">{t("step4Title")}</h2>

                <div className="mt-6">
                  <p className="text-center text-green-700 font-semibold">{t("npsLikely")}</p>
                  <div className="mt-3 flex justify-center gap-10">
                    {[{ v: 10, img: emoji10 }, { v: 9, img: emoji9 }].map((item) => (
                      <EmoteButton key={item.v} value={item.v} src={item.img} selected={nps} onSelect={setNps} />
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-center text-yellow-600 font-semibold">{t("npsMaybe")}</p>
                  <div className="mt-3 flex justify-center gap-10">
                    {[{ v: 8, img: emoji8 }, { v: 7, img: emoji7 }].map((item) => (
                      <EmoteButton key={item.v} value={item.v} src={item.img} selected={nps} onSelect={setNps} />
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-center text-red-600 font-semibold">{t("npsNotLikely")}</p>
                  <div className="mt-3 flex justify-center gap-6">
                    {[{ v: 6, img: emoji6 }, { v: 5, img: emoji5 }, { v: 4, img: emoji4 }, { v: 3, img: emoji3 }].map((item) => (
                      <EmoteButton key={item.v} value={item.v} src={item.img} selected={nps} onSelect={setNps} />
                    ))}
                  </div>
                  <div className="mt-4 flex justify-center gap-10">
                    {[{ v: 2, img: emoji2 }, { v: 1, img: emoji1 }].map((item) => (
                      <EmoteButton key={item.v} value={item.v} src={item.img} selected={nps} onSelect={setNps} />
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <TextIconButton icon={ArrowLeft} onClick={() => setStep(3)} variant="outline">
                    {t("back")}
                  </TextIconButton>
                  <TextIconButton icon={ArrowRight} onClick={handleSubmitOPD} variant="solid" className={theme.primaryBg} disabled={isSubmitting}>
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
                        setStep(0)
                        setName("")
                        setMobile("")
                        setDoctor("")
                        setErrors({})
                        setRatings({ appointment: 0, receptionStaff: 0, diagnosticServices: 0, doctorServices: 0, security: 0 })
                        setComments("")
                        setAwarenessIdx(null)
                        setNps(null)
                        setFeedbackError("")
                        setSelectedOptions({ diagnosticServices: "radiology", doctorServices: "consultant" })
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

        <Dots total={5} active={Math.min(activeDot, 4)} />
      </main>

      {/* Toast */}
      <AnimatePresence>
        {showSaved && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} className={`${theme.card} w-full bg-[#fff] max-w-sm p-6 text-center`}>
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
