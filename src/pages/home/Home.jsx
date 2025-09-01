"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import logo from "../../../public/images/Logo/GirirajFeedBackLogo.jpg"

// Local Storage Key
const LS_KEY = "hf_redesign_full_flow"

// Internal keys
const SERVICE_KEYS = [
  "appointment",
  "attendant",
  "reception",
  "cleanliness",
  "lab",
  "radiology",
  "consultant",
  "physio",
]

const DEPT_KEYS = [
  "consultants",
  "officers",
  "nursing",
  "admission",
  "housekeeping",
  "maintenance",
  "diagnostics",
  "opd",
  "canteen",
  "security",
  "others",
]

// Translations
const T = {
  en: {
    welcomeTitle: "Welcome",
    welcomeCopy: "Please select your language to proceed.",
    languageSelect: "Please select language",
    start: "Start",
    personalDetails: "Personal Details",
    patientName: "Patient Name",
    relativeName: "Relative Name",
    contactNo: "Contact No",
    bedNo: "Bed No",
    back: "Back",
    next: "Next",
    choose: {
      feedbackLead: "Please provide your valuable feedback by rating our services.",
      concernsLead: "Concerns? Let us know by providing the details below.",
      feedbackBtn: "Feedback",
      concernsBtn: "Concerns",
    },
    feedback: {
      title: "IPD Reviews",
      lead: "Rate the following services",
      services: [
        "Appointment Booking",
        "Attendant Staff",
        "Reception Staff Behaviour",
        "Cleanliness",
        "Laboratory Services",
        "Radiology Services",
        "Consultant Doctor Behaviour/Services",
        "Physiotherapy Services",
      ],
    },
    concerns: {
      title: "Concern Form",
      lead: "Share your concerns. You can type, upload images, or add a quick note later.",
      depts: [
        "Consultant Doctors",
        "Medical Officers",
        "Nursing",
        "Admission/Discharge",
        "Housekeeping/Cleaning",
        "Maintenance",
        "Diagnostics (Radiology/Pathology)",
        "OPD",
        "Canteen/Dietician",
        "Security",
        "Others",
      ],
      addText: "Add text",
      addImage: "Image",
      record: "Record",
    },
    ratingWords: { excellent: "Excellent", good: "Good", average: "Average", improve: "Need to Improve" },
    save: "Save",
    savedNote: "Thanks! Your data is saved locally. See console for JSON.",
  },
  hi: {
    welcomeTitle: "स्वागत है",
    welcomeCopy: "कृपया आगे बढ़ने के लिए भाषा चुनें।",
    languageSelect: "कृपया भाषा चुनें",
    start: "शुरू करें",
    personalDetails: "व्यक्तिगत विवरण",
    patientName: "मरीज़ का नाम",
    relativeName: "रिश्तेदार का नाम",
    contactNo: "संपर्क नंबर",
    bedNo: "बेड नंबर",
    back: "वापस",
    next: "आगे",
    choose: {
      feedbackLead: "कृपया हमारी सेवाओं की रेटिंग करके अपना मूल्यवान फीडबैक दें।",
      concernsLead: "कोई चिंता? नीचे विवरण देकर हमें बताएं।",
      feedbackBtn: "फीडबैक",
      concernsBtn: "शिकायत",
    },
    feedback: {
        title: "आईपीडी समीक्षा", 
      lead: "निम्न सेवाओं को रेट करें",
      services: [
        "अपॉइंटमेंट बुकिंग",
        "अटेंडेंट स्टाफ",
        "रिसेप्शन स्टाफ का व्यवहार",
        "स्वच्छता",
        "लैब सेवाएँ",
        "रेडियोलॉजी सेवाएँ",
        "कंसल्टेंट डॉक्टर का व्यवहार/से���ाएँ",
        "फिजियोथेरेपी सेवाएँ",
      ],
    },
    concerns: {
      title: "शिकायत फ़ોર્મ",
      lead: "अपनी चिंता साझा करें। आप लिख सकते हैं, तस्वीर जोड़ सकते हैं या वॉयस नोट बाद में जोड़ सकते हैं।",
      depts: [
        "कंसल्टेंट डॉक्टर",
        "मेडिकल ऑफिसर",
        "नर्सિંગ",
        "प्रवेश/डिस्चार्ज",
        "हाउसकीपिंग/सफाई",
        "मेंटेनेंस",
        "डायग्नोस्टिक्स (रेडियोलॉजी/पैथोलॉजी)",
        "ओपीडी",
        "कैंटीन/डायटीशियन",
        "सिक्योरिटी",
        "अन्य",
      ],
      addText: "टेक्स्ट जोड़ें",
      addImage: "इमेज",
      record: "रिकॉर्ड",
    },
    ratingWords: { excellent: "उत्कृष्ट", good: "अच्छा", average: "औसत", improve: "सुधार की आवश्यकता" },
    save: "सेव",
    savedNote: "धन्यवाद! डेटा लोकल रूप से सेव हो गया। JSON कंसोल में देखें।",
  },
  gu: {
    welcomeTitle: "સ્વાગત છે",
    welcomeCopy: "આગળ વધવા માટે કૃપા કરીને ભાષા પસંદ કરો.",
    languageSelect: "કૃપા કરીને ભાષા પસંદ કરો",
    start: "શરૂઆત કરો",
    personalDetails: "વ્યક્તિગત વિગતો",
    patientName: "દર્દીનું નામ",
    relativeName: "સંબંધિનું નામ",
    contactNo: "સંપર્ક નંબર",
    bedNo: "બેડ નંબર",
    back: "પાછળ",
    next: "આગળ",
    choose: {
      feedbackLead: "અમારી સેવાઓને રેટ કરીને તમારો મૂલ્યવાન પ્રતિસાદ આપો.",
      concernsLead: "કોઈ ચિંતા? નીચે વિગતો આપી અમને જાણ કરો.",
      feedbackBtn: "ફીડબેક",
      concernsBtn: "ચિંતા",
    },
    feedback: {
   title: "આઈપીડિ સમીક્ષા",
      lead: "નીચેની સેવાઓને રેટ કરો",
      services: [
        "અપોઇન્ટમેન્ટ બુકિંગ",
        "અટેન્ડન્ટ સ્ટાફ",
        "રિસેપ્શન સ્ટાફ વર્તન",
        "સ્વચ્છતા",
        "લેબોરેટરી સેવાઓ",
        "રેડિયોલોજી સેવાઓ",
        "કન્સલ્ટન્ટ ડોક્ટર વર્તન/સેવા",
        "ફિઝિયોથેરાપી સેવાઓ",
      ],
    },
    concerns: {
      title: "ચિંતાનો ફોર્મ",
      lead: "તમારી ચિંતા શેર કરો. તમે લખી શકો, ઇમેજ ઉમેરી શકો અથવા બાદમાં વોઇસ નોંધ ઉમેરી શકો.",
      depts: [
        "કન્સલ્ટન્ટ ડોક્ટર્સ",
        "મેડિકલ ઓફિસર્સ",
        "નર્સિંગ",
        "પ્રવેશ/ડિસ્ચાર્જ",
        "હાઉસકીપિંગ/ક્લિનિંગ",
        "મેંટેનન્સ",
        "ડાયગ્નોસ્ટિક્સ (રેડિયોલોજી/પેથીલોજી)",
        "ઓપીડી",
        "કેંટિન/ડાયટિશિયન",
        "સિક્યોરિટી",
        "અન્ય",
      ],
      addText: "ટેક્સ્ટ ઉમેરો",
      addImage: "ઇમેજ",
      record: "રેકોર્ડ",
    },
    ratingWords: { excellent: "શાનદાર", good: "સારું", average: "સરેરાશ", improve: "સુધારો જરૂરી" },
    save: "સેવ",
    savedNote: "આભાર! ડેટા લોકલી સેવ થયો. JSON કન્સોલમાં જુઓ.",
  },
}

export default function Home() {
  const [lang, setLang] = useState("en")
  const t = T[lang]
const [recordingDept, setRecordingDept] = useState(null) // track which dept is recording

  // Steps: 0 language -> 1 personal -> 2 choose -> 3 form
  const [step, setStep] = useState(0)
  const [flow, setFlow] = useState(null) // "feedback" | "concerns" | null

  const [personal, setPersonal] = useState({
    patientName: "",
    relativeName: "",
    contactNo: "",
    bedNo: "",
  })
const [isRecording, setIsRecording] = useState(false)
const [mediaRecorder, setMediaRecorder] = useState(null)

const [initialized, setInitialized] = useState(false)

  const [ratings, setRatings] = useState(() => Object.fromEntries(SERVICE_KEYS.map((k) => [k, null])))

  const [concerns, setConcerns] = useState(() =>
    Object.fromEntries(DEPT_KEYS.map((k) => [k, { text: "", image: null }])),
  )
const [recordedAudio, setRecordedAudio] = useState(null)
const audioChunksRef = useRef([])




useEffect(() => {
  if (initialized) return
  const raw = localStorage.getItem(LS_KEY)
  if (!raw) return

  try {
    const s = JSON.parse(raw)
    setLang(s.lang ?? "en")
    setStep(s.step ?? 0)
    setFlow(s.flow ?? null)
    setPersonal({
      patientName: s.personal?.patientName ?? "",
      relativeName: s.personal?.relativeName ?? "",
      contactNo: s.personal?.contactNo ?? "",
      bedNo: s.personal?.bedNo ?? "",
    })
    setRatings(s.ratings ?? ratings)
    setConcerns(s.concerns ?? concerns)
  } catch {}
  setInitialized(true)
}, [initialized])
useEffect(() => {
  const timeout = setTimeout(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ lang, step, flow, personal, ratings, concerns }))
    } catch {}
  }, 300)

  return () => clearTimeout(timeout)
}, [lang, step, flow, personal, ratings, concerns])

const handlePersonalChange = (key, value) => {
  setPersonal((prev) => ({ ...prev, [key]: value }))
}


  const [savedNote, setSavedNote] = useState("")

  // Load persisted
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (!raw) return
      const s = JSON.parse(raw)
      setLang(s.lang ?? "en")
      setStep(s.step ?? 0)
      setFlow(s.flow ?? null)
      setPersonal(s.personal ?? personal)
      setRatings(s.ratings ?? ratings)
      setConcerns(s.concerns ?? concerns)
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist on change


  function setRatingByIndex(idx, value) {
    const key = SERVICE_KEYS[idx]
    setRatings((prev) => ({ ...prev, [key]: value }))
  }

  async function fileToDataURL(file) {
    const reader = new FileReader()
    return await new Promise((resolve, reject) => {
      reader.onload = () => resolve(String(reader.result ?? ""))
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  async function setDeptImageByIndex(idx, file) {
    const key = DEPT_KEYS[idx]
    if (!file) {
      setConcerns((prev) => ({ ...prev, [key]: { ...prev[key], image: null } }))
      return
    }
    const data = await fileToDataURL(file)
    setConcerns((prev) => ({ ...prev, [key]: { ...prev[key], image: data } }))
  }

  function saveAll() {
    const payload = {
      lang,
      personal,
      chosenFlow: flow,
      ratings:
        flow === "feedback"
          ? T[lang].feedback.services.map((label, idx) => ({
              key: SERVICE_KEYS[idx],
              label,
              rating: ratings[SERVICE_KEYS[idx]],
            }))
          : undefined,
      concerns:
        flow === "concerns"
          ? T[lang].concerns.depts.map((label, idx) => {
              const key = DEPT_KEYS[idx]
              return { key, label, text: concerns[key].text, image: concerns[key].image }
            })
          : undefined,
      savedAt: new Date().toISOString(),
    }
    console.log("WIZARD_SAVE", payload)
    setSavedNote(t.savedNote)
    setTimeout(() => setSavedNote(""), 3500)
  }

const startRecording = async (key) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const recorder = new MediaRecorder(stream)

    audioChunksRef.current = []

    recorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data)
    }

    recorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
      const audioURL = URL.createObjectURL(audioBlob)
      audioChunksRef.current = []
      
      setConcerns((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          audio: audioURL
        },
      }))
    }

    recorder.start()
    setMediaRecorder(recorder)
    setIsRecording(true)
    setRecordingDept(key)
  } catch (err) {
    alert("Microphone access denied or error occurred.")
    console.error(err)
  }
}


const stopRecording = () => {
  if (mediaRecorder) {
    mediaRecorder.stop()
    setIsRecording(false)
    setRecordingDept(null)
  }
}


  // UI primitives
  function Shell({ children }) {
    return (
      <main className="min-h-dvh w-full font-Poppins bg-neutral-50">
        <div className="mx-auto max-w-[700px] px-4 py-8">
          <section className="relative mx-auto w-full max-w-4xl rounded-3xl border border-red-200 bg-white/90 p-6 sm:p-8 md:p-8 shadow-[0_10px_30px_rgba(244,63,94,0.10)] overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-red-200 blur-3xl opacity-60" />
              <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-rose-200 blur-3xl opacity-60" />
              {/* <div className="absolute inset-x-10 top-1/3 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" /> */}
            </div>
            <div className="relative">{children}</div>
          </section>

          <div className="mt-5 flex items-center justify-center gap-2">
            {[0, 1, 2, 3].map((i) => {
              const active = i === step
              return (
                <button
                  key={i}
                  aria-label={`Go to step ${i + 1}`}
                  onClick={() => setStep(i)}
                  className={active ? "h-2.5 w-6 rounded-full bg-red-600" : "h-2.5 w-2.5 rounded-full bg-neutral-300"}
                />
              )
            })}
          </div>

          {savedNote ? (
            <div className="mx-auto mt-4 max-w-4xl rounded-[10px] border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800">
              {savedNote}
            </div>
          ) : null}
        </div>
      </main>
    )
  }

  function Title({ children }) {
    return <h1 className="text-2xl font-semibold text-neutral-900">{children}</h1>
  }

  function Lead({ children }) {
    return <p className="mt- text-[14px] max-w-[400px] text-center text-neutral-600">{children}</p>
  }

  function PrimaryButton({ className = "", ...rest }) {
    return (
      <button
        {...rest}
        className={
          "inline-flex items-center justify-center  rounded-[7px] bg-red-600 px-5 py-2 text-white text-sm font-[500] hover:bg-red-500 active:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500 " +
          className
        }
      />
    )
  }

  function GhostButton({ className = "", ...rest }) {
    return (
      <button
        {...rest}
        className={
          "inline-flex items-center justify-center rounded-[7px] border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-red-500 " +
          className
        }
      />
    )
  }

  function Input({ label, value, onChange, placeholder, type = "text" ,iconClass }) {
      const [isFocused, setIsFocused] = useState(false);
    return (
 <label className="relative block w-full">
      {/* Floating Label */}
      <span
        className={`absolute transition-all duration-300 text-neutral-500 
          ${isFocused || value
            ? "top-[-10px] px-[6px] left-[18px]  border border-red-500 rounded-[10px] text-[10px] bg-white text-red-500"
            : "top-[10px] left-10 cursor-text  text-sm"}`}
      >
        {label}
      </span>

      {/* Icon */}
      {iconClass && (
        <span className="absolute left-3 top-1/2 text-[#ff4d4d] -translate-y-1/2 ">
          <i className={iconClass}></i>
        </span>
      )}

      {/* Input */}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=""
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full rounded-[10px] border border-neutral-300 bg-white pl-10 pr-3 h-[40px] text-sm text-neutral-900 focus:outline-none focus:ring-[1px] focus:ring-red-500"
      />
    </label>
    )
  }

function RatingChips({ label, value, onChange }) {
  const maxStars = 5

  return (
    <div className="w-full">
      <div className="mb-1 text-sm font-semibold text-neutral-800">{label}</div>
      <div className="flex gap-1">
        {[...Array(maxStars)].map((_, index) => {
          const isFilled = value && index < value
          return (
            <button
              key={index}
              onClick={() => onChange(value === index + 1 ? null : index + 1)}
              className="text-xl transition"
              aria-label={`Rate ${index + 1} star${index + 1 > 1 ? 's' : ''}`}
            >
              <i
                className={
                  isFilled
                    ? "fa-solid fa-star text-yellow-400"
                    : "fa-regular fa-star text-neutral-400 hover:text-yellow-500"
                }
              ></i>
            </button>
          )
        })}
      </div>
    </div>
  )
}

  // Steps
  function StepLanguage() {
    return (
      <Shell>
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-center">

            <img src={logo} alt="Giriraj Hospital logo" className="h-14 w-auto md:h-[80px]" />
          </div>

          <h1 className="mt-3 text-center text-2xl md:text-2xl font-semibold text-neutral-900">
            {"Welcome to SHREE GIRIRAJ HOSPITAL"}
          </h1>

          <div className="mt-4 space-y-4">
            <p className="text-base md:text-[17px] leading-7 md:leading-[26px] text-neutral-800">
              {
                "With passion, commitment and experience the team at shree giriraj hospital focuses on serving their patients with the utmost possible care and compassion."
              }
            </p>
            <p className="text-base md:text-[17px] leading-7 md:leading-[26px] text-neutral-800">
              {
                "We are glad to hear you out. Your feedback matters to us and helps us improve our services. Let us know by providing a quick review on our services."
              }
            </p>
          </div>
        </div>

        <div className="my-6 h-px bg-neutral-200" />

        <div className="grid gap-4">
          <div className="text-sm font-semibold text-neutral-800">{t.languageSelect}</div>
          <div className="flex flex-wrap gap-2">
            {["en", "hi", "gu"].map((lk) => {
              const active = lk === lang
              const label = lk === "en" ? "English" : lk === "hi" ? "हिंदी" : "ગુજરાતી"
              return active ? (
                <PrimaryButton key={lk} onClick={() => setLang(lk)} aria-pressed className="px-3 py-[3px]">
                  {label}
                </PrimaryButton>
              ) : (
                <GhostButton key={lk} onClick={() => setLang(lk)} className="px-3 py-[8px]">
                  {label}
                </GhostButton>
              )
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end">
          <PrimaryButton onClick={() => setStep(1)}>{t.start}  <i className="fa-solid ml-[10px] fa-arrow-right"></i></PrimaryButton>
        </div>
      </Shell>
    )
  }

  function StepPersonal() {
    return (
      <Shell>
        <header className="mb-6">
          <Title>{t.personalDetails}</Title>
        </header>

        <div className="grid gap-4">
          <Input
            label={t.patientName}
            value={personal.patientName}
  onChange={(v) => handlePersonalChange("patientName", v)}
              iconClass="fa-regular fa-users-medical"
             

          />
          <Input
            label={t.relativeName}
            value={personal.relativeName}
            onChange={(v) => setPersonal((s) => ({ ...s, relativeName: v }))}
                          iconClass="fa-regular fa-user"

          />
          <Input
            label={t.contactNo}
            value={personal.contactNo}
            type="tel"
            onChange={(v) => setPersonal((s) => ({ ...s, contactNo: v }))}
                  iconClass="fa-regular fa-phone-volume"

          />
          <Input
           label={t.bedNo} value={personal.bedNo} onChange={(v) => setPersonal((s) => ({ ...s, bedNo: v }))} 
                  iconClass="fa-regular fa-bed"
       
           />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <GhostButton onClick={() => setStep(0)}>  <i className="fa-solid mr-[10px] fa-arrow-left"></i>{t.back}</GhostButton>
          <PrimaryButton onClick={() => setStep(2)}>{t.next}  <i className="fa-solid ml-[10px] fa-arrow-right"></i></PrimaryButton>
        </div>
      </Shell>
    )
  }

  function StepChoose() {
    return (
      <Shell>
        <div className="grid grid-cols-2 mt-[0px] gap-10">
          <div className="grid  border-[1.4px] bg-[#fff] border-[#e81515]  rounded-[10px] p-[14px] gap-4">
            <p className="text-base sm:text-[15px]  text-neutral-700">{t.choose.feedbackLead}</p>
            <div className=" flex mt-[20px] ">
              <PrimaryButton
                onClick={() => {
                  setFlow("feedback")
                  setStep(3)
                }}
                aria-label="Open Feedback form"
              >
                <i className="fa-regular  text-[17px]  mr-[6px] fa-comments"></i> {t.choose.feedbackBtn}
              </PrimaryButton>
            </div>
          </div>

                   <div className="grid  border-[1.4px] bg-[#fff] border-[#e81515]  rounded-[10px] p-[14px] gap-4">
         
            <p className="text-base sm:text-[15px]  text-neutral-700"> {t.choose.concernsLead}</p>
            <div className="  mt-[20px]">
              <PrimaryButton
                onClick={() => {
                  setFlow("concerns")
                  setStep(3)
                }}
                aria-label="Open Concerns form"
              >
               <i className="fa-regular text-[18px] mr-[6px]  fa-notes-medical"></i>  {t.choose.concernsBtn}
              </PrimaryButton>
            </div>
          </div>

          <div className="flex items-center  ">
            <GhostButton onClick={() => setStep(1)}> <i className="fa-solid fa-arrow-left mr-[10px]"></i>{t.back}</GhostButton>
          </div>
        </div>
      </Shell>
    )
  }

  function StepForm() {
    if (flow === "feedback") {
      return (
        <Shell>
          <header className="mb-6 flex-col flex">
            <Title>{t.feedback.title}</Title>
            <Lead>{t.feedback.lead}</Lead>
          </header>

          <div className="grid gap-5">
            {t.feedback.services.map((label, idx) => (
              <RatingChips
                key={label}
                label={label}
                value={ratings[SERVICE_KEYS[idx]]}
                onChange={(v) => setRatingByIndex(idx, v)}
              />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <GhostButton
              onClick={() => {
                setFlow(null)
                setStep(2)
              }}
            >
            <i className="fa-solid mr-[6px] fa-arrow-left"></i>
              {t.back}
            </GhostButton>
            <PrimaryButton onClick={saveAll}> <i className="fa-regular mr-[6px] fa-floppy-disk"></i> {t.save}</PrimaryButton>
          </div>
        </Shell>
      )
    }

    if (flow === "concerns") {
      return (
        <Shell>
          <header className="mb-8 flex w-fit mx-auto flex-col">
            <Title>{t.concerns.title}</Title>
            <Lead className="text-center">{t.concerns.lead}</Lead>
          </header>

          <div className="grid gap-6">
            {t.concerns.depts.map((label, idx) => {
              const key = DEPT_KEYS[idx]
              const item = concerns[key]
              return (
                <div key={String(key)} className="grid gap-2">
                  <div className="text-sm font-semibold text-neutral-800">{label}</div>
                  <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                    <textarea
                      className="min-h-[84px] w-full rounded-[10px] border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-[1p] focus:ring-red-500"
                      placeholder={t.concerns.addText}
                      value={item.text}
                      onChange={(e) =>
                        setConcerns((prev) => ({
                          ...prev,
                          [key]: { ...prev[key], text: e.target.value },
                        }))
                      }
                    />
                    <div className="flex sm:flex-col gap-2">
                      <label className="inline-flex cursor-pointer items-center justify-center rounded-[7px] border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 focus-within:ring-2 focus-within:ring-red-500">
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => setDeptImageByIndex(idx, e.target.files?.[0])}
                        />
                                          <i className="fa-regular mr-[6px] fa-image"></i>
                        {t.concerns.addImage}
                      </label>
<PrimaryButton
  type="button"
  onClick={() =>
    isRecording && recordingDept === key ? stopRecording() : startRecording(key)
  }
  className="px-4 py-2"
>
  <i
    className={`text-[15px] mr-[6px] fa-regular ${
      isRecording && recordingDept === key ? 'fa-stop' : 'fa-microphone-lines'
    }`}
  ></i>
  {isRecording && recordingDept === key ? "Stop" : t.concerns.record}
</PrimaryButton>


                    </div>
                  </div>

                  {item.image ? (
                    <div className="mt-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image || "/placeholder.svg?height=112&width=112&query=uploaded%20concern%20preview"}
                        alt="Uploaded preview"
                        className="h-28 w-28 rounded-lg object-cover border border-neutral-200"
                      />
                    </div>
                  ) : null}
{item.audio && (
  <div className="mt-2">
    <audio controls src={item.audio}></audio>
  </div>
)}

                  <div className="h-px bg-neutral-200 mt-2" />
                </div>
              )
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <GhostButton
              onClick={() => {
                setFlow(null)
                setStep(2)
              }}
            >
            <i className="fa-solid mr-[6px] fa-arrow-left"></i>
              {t.back}
            </GhostButton>
            <PrimaryButton onClick={saveAll}> <i className="fa-solid mr-[6px] fa-floppy-disk"></i> {t.save}</PrimaryButton>
          </div>
        </Shell>
      )
    }

    return StepChoose()
  }

let View = null
if (step === 0) View = <StepLanguage />
else if (step === 1) View = <StepPersonal />
else if (step === 2) View = <StepChoose />
else View = <StepForm />
  return View
}
