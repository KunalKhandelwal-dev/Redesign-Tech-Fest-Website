import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  User,
  Phone,
  Building2,
  Send,
  CheckCircle,
  Loader2,
  Bug,
  Search,
  Gamepad2,
  Monitor,
  TrendingUp,
  Image,
  HelpCircle,
  Gamepad,
  Code,
  FolderOpen,
  Hash,
  Briefcase,
  BookOpen,
  IndianRupee,
  Check,
  Users,
} from "lucide-react";

export default function Register() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const successRef = useRef<HTMLDivElement>(null);

  /* -----------------------------
     EVENT INFO CONFIG
  ----------------------------- */
  const eventInfo: Record<
    string,
    {
      type: "individual" | "team";
      fee: number;
      maxTeam?: number;
      whatsapp: string;
    }
  > = {
    "Debug It": {
      type: "individual",
      fee: 100,
      whatsapp: "https://chat.whatsapp.com/BWVnE4wjQeM3yRTMdCm5e1",
    },
    "Tech Treasure": {
      type: "team",
      fee: 100,
      maxTeam: 4,
      whatsapp: "https://chat.whatsapp.com/Ee7oNF4JvkwKuIdomRRxpj",
    },
    BGMI: {
      type: "team",
      fee: 100,
      maxTeam: 4,
      whatsapp: "https://chat.whatsapp.com/Busn9D6I7wa14z5VbI8W4A",
    },
    "Tech Show": {
      type: "team",
      fee: 100,
      maxTeam: 3,
      whatsapp: "https://chat.whatsapp.com/LoMClqq4vGa90vNYV2IDt7",
    },
    "Startup Bid": {
      type: "team",
      fee: 100,
      maxTeam: 4,
      whatsapp: "https://chat.whatsapp.com/HypSXtHqVcY18mKmKBcIdZ",
    },
    "Poster Making": {
      type: "team",
      fee: 100,
      maxTeam: 2,
      whatsapp: "https://chat.whatsapp.com/Lt04XGiL4E7L83yMVAOFgN",
    },
    "Tech Quiz": {
      type: "team",
      fee: 100,
      maxTeam: 2,
      whatsapp: "https://chat.whatsapp.com/F0YqBqx65x69tTzd1ASrpL",
    },
    "Tekken 7": {
      type: "individual",
      fee: 100,
      whatsapp: "https://chat.whatsapp.com/CMuQzhMFln6KsXRHVCly8M",
    },
    "Code Relay": {
      type: "team",
      fee: 100,
      maxTeam: 2,
      whatsapp: "https://chat.whatsapp.com/CC17GJQQ6buDc00EGDBOr2",
    },
    "Project Exhibition": {
      type: "team",
      fee: 100,
      maxTeam: 3,
      whatsapp: "https://chat.whatsapp.com/LdlXwMnUD7L8URzB9PXV9Y",
    },
  };

  /* -----------------------------
     ICON MAP (for toast & buttons)
  ----------------------------- */
  const icons: Record<string, any> = {
    "Debug It": Bug,
    "Tech Treasure": Search,
    BGMI: Gamepad2,
    "Tech Show": Monitor,
    "Startup Bid": TrendingUp,
    "Poster Making": Image,
    "Tech Quiz": HelpCircle,
    "Tekken 7": Gamepad,
    "Code QueRelayst": Code,
    "Project Exhibition": FolderOpen,
  };

  /* -----------------------------
     STATE
  ----------------------------- */
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    department: "",
    semester: "",
    mobileNumber: "",
    college: "",
    eventType: [] as string[],
    teamName: "",
    teamMembers: [""],
    paymentReceipt: null as File | null,
    teamType: "",
    upiId: "",
    transactionId: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastRegisteredEvent, setLastRegisteredEvent] = useState<string | null>(
    null
  );

  // For toast popup (slide up + fade out)
  const [toast, setToast] = useState<{ label: string; Icon?: any } | null>(null);

  const [totalFee, setTotalFee] = useState(0);

  // Preview URL for uploaded image (if image)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Drag state for drop area
  const [isDragActive, setIsDragActive] = useState(false);

  /* -----------------------------
     FEE CALCULATION
  ----------------------------- */
  useEffect(() => {
    // Check if a team event is selected
    const teamEvent = formData.eventType.find((ev) => eventInfo[ev]?.type === "team");
    if (teamEvent) {
      setTotalFee(eventInfo[teamEvent].fee);
    } else {
      // Sum all individual event fees
      const total = formData.eventType.reduce((sum, ev) => {
        const info = eventInfo[ev];
        return info && info.type === "individual" ? sum + info.fee : sum;
      }, 0);
      setTotalFee(total);
    }
  }, [formData.eventType, eventInfo]);

  /* -----------------------------
     FLOATING TOAST (form only)
  ----------------------------- */
  const showFloatingToast = (msg: string) => {
    const toastEl = document.createElement("div");
    toastEl.textContent = msg;
    toastEl.style.position = "fixed";
    toastEl.style.bottom = "30px";
    toastEl.style.left = "50%";
    toastEl.style.transform = "translateX(-50%)";
    toastEl.style.background = "rgba(0, 180, 255, 0.15)";
    toastEl.style.color = "#00e6ff";
    toastEl.style.padding = "10px 22px";
    toastEl.style.borderRadius = "10px";
    toastEl.style.fontFamily = "Orbitron, sans-serif";
    toastEl.style.border = "1px solid rgba(0, 255, 255, 0.3)";
    toastEl.style.boxShadow = "0 0 12px rgba(0,255,255,0.3)";
    toastEl.style.zIndex = "9999";
    toastEl.style.fontSize = "14px";
    toastEl.style.backdropFilter = "blur(8px)";
    toastEl.style.transition = "opacity 0.5s ease";
    document.body.appendChild(toastEl);
    setTimeout(() => (toastEl.style.opacity = "0"), 1500);
    setTimeout(() => toastEl.remove(), 2000);
  };

  /* -----------------------------
     TOGGLE EVENT (form click only)
  ----------------------------- */
  const toggleEvent = (label: string, isExternal = false) => {
    const info = eventInfo[label];
    if (!info) return;

    const currentlySelected = formData.eventType.includes(label);

    // 🔒 Show glow/toast only if user clicked from form (not external)
    if (!isExternal) {
      const actionText = currentlySelected ? "deselected ❌" : "selected ✅";
      showFloatingToast(`${label} ${actionText}`);
    }

    setFormData((prev) => {
      if (currentlySelected) {
        const newEventType = prev.eventType.filter((e) => e !== label);
        const newTeamType =
          newEventType.some((e) => eventInfo[e]?.type === "team")
            ? "team"
            : "individual";
        if (info.type === "team") {
          return {
            ...prev,
            eventType: newEventType,
            teamName: "",
            teamMembers: [""],
            teamType: newTeamType,
          };
        }
        return { ...prev, eventType: newEventType, teamType: newTeamType };
      }

      if (info.type === "team") {
        return {
          ...prev,
          eventType: [label],
          teamName: prev.teamName,
          teamMembers: [""],
          teamType: "team",
        };
      }

      return {
        ...prev,
        eventType: [label],
        teamName: "",
        teamMembers: [""],
        teamType: "individual",
      };
    });
  };

  /* -----------------------------
     INPUT CHANGE
  ----------------------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* -----------------------------
     FILE HANDLING (upload + drag/drop)
     - centralized handler to set file & preview
     - enforce fixed preview size, and stable layout so Remove stays inside
  ----------------------------- */
  const handleFile = useCallback(
    (file: File | null) => {
      // revoke previous preview
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      if (!file) {
        setFormData((prev) => ({ ...prev, paymentReceipt: null }));
        setPreviewUrl(null);
        return;
      }

      setFormData((prev) => ({ ...prev, paymentReceipt: file }));

      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    },
    [previewUrl]
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement | HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files?.[0] || null;
    if (file) {
      handleFile(file);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  // Remove file helper
  const removeFile = () => {
    setFormData((prev) => ({ ...prev, paymentReceipt: null }));
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    const input = document.getElementById("paymentReceiptInput") as HTMLInputElement | null;
    if (input) input.value = "";
  };

  // cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  /* -----------------------------
     VALIDATION
     - constraints for UPI/UTR and Transaction ID
     - show floating pop for first error (similar to event selection)
  ----------------------------- */
  const validate = (data: typeof formData) => {
    const newErrors: Record<string, string> = {};
    if (!data.name.trim()) newErrors.name = "Full name is required.";
    if (!data.rollNumber.trim()) newErrors.rollNumber = "Roll number is required.";
    if (!data.department.trim()) newErrors.department = "Department is required.";
    if (!data.semester.trim()) newErrors.semester = "Semester is required.";
    if (!/^[0-9]{10}$/.test(data.mobileNumber))
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
    if (!data.college.trim()) newErrors.college = "College/University is required.";
    if (data.eventType.length === 0) newErrors.eventType = "Select at least one event.";
    if (!data.paymentReceipt) newErrors.paymentReceipt = "Please upload your payment receipt.";

    // UPI / UTR and Transaction ID constraints
    if (data.eventType.length > 0) {
      const upi = data.upiId.trim();
      const tx = data.transactionId.trim();

      if (!upi) {
        newErrors.upiId = "UPI ID/UTR ID is required.";
      } else {
        // accept typical UPI id formats like name@bank and also numeric UTR-like strings
        const upiRegex = /^[\w.\-]{2,}@[a-zA-Z]{2,}$/;
        const utrLike = /^[0-9A-Za-z]{6,40}$/;
        if (!upiRegex.test(upi) && !utrLike.test(upi)) {
          newErrors.upiId = "Enter a valid UPI ID (e.g. name@bank) or a valid UTR/ID.";
        }
      }

      if (!tx) {
        newErrors.transactionId = "Transaction ID is required.";
      } else {
        // transaction id usually alphanumeric; require reasonable length
        const txRegex = /^[A-Za-z0-9\-_]{6,40}$/;
        if (!txRegex.test(tx)) {
          newErrors.transactionId = "Transaction ID looks invalid (alphanumeric, 6-40 chars).";
        }
      }
    }

    // If team event selected -> require team fields
    const teamSelected = data.eventType.some((e) => eventInfo[e]?.type === "team");
    if (teamSelected) {
      if (!data.teamName.trim()) newErrors.teamName = "Team name is required.";
      // ensure no empty team member names
      if (data.teamMembers.some((m) => !m.trim())) newErrors.teamMembers = "All team member names are required.";

      // validate max team size
      const max = Math.max(...data.eventType.map((e) => eventInfo[e]?.maxTeam || 1));
      if (data.teamMembers.length > max - 1)
        newErrors.teamMembers = `Maximum ${max - 1} members (excluding you) allowed.`;
    }

    setErrors(newErrors);

    // show a floating pop for the first error (similar UX to event selection)
    const errorMessages = Object.values(newErrors);
    if (errorMessages.length > 0) {
      showFloatingToast(errorMessages[0]);
    }

    return Object.keys(newErrors).length === 0;
  };

  /* -----------------------------
     SUBMIT HANDLER
  ----------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(formData)) return;
    setLoading(true);

    // ✅ Backend URL (you can replace with your Render/Netlify backend later)
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

    try {
      // ✅ Build multipart form data
      const form = new FormData();

      // Append text fields (arrays are joined)
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          form.append(key, value.join(", "));
        } else if (value) {
          form.append(key, value.toString());
        }
      });

      // Append payment file only if selected
      if (formData.paymentReceipt instanceof File) {
        // Optionally set a custom filename for the uploaded file (server receives this name)
        // Use team name if team event else user's name; fallback to original filename
        const isTeam = formData.eventType.some((e) => eventInfo[e]?.type === "team");
        const baseName = isTeam ? (formData.teamName || formData.name || "team") : (formData.name || "participant");
        const extMatch = formData.paymentReceipt.name.match(/\.[a-zA-Z0-9]+$/);
        const ext = extMatch ? extMatch[0] : "";
        // Append with custom filename
        form.append("paymentReceipt", formData.paymentReceipt, `${baseName}${ext}`);
      }

      // Send data to backend
      const res = await fetch(`${backendUrl}/submit`, {
        method: "POST",
        body: form, // Browser sets the proper multipart headers automatically
      });

      const resultText = await res.text();

      if (res.ok) {
        console.log("✅ Registration Response:", resultText);
        setSubmitted(true);

        // Store the event name before resetting formData
        setLastRegisteredEvent(formData.eventType[0] || null);

        // Scroll to the success popup
        setTimeout(() => {
          successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);

        // Reset form fields
        setFormData({
          name: "",
          rollNumber: "",
          department: "",
          semester: "",
          mobileNumber: "",
          college: "",
          eventType: [],
          teamName: "",
          teamMembers: [""],
          paymentReceipt: null,
          teamType: "",
          upiId: "",
          transactionId: "",
        });

        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        setErrors({});
        setTimeout(() => setSubmitted(false), 15000);
      } else {
        console.error("❌ Server returned error:", resultText);
        alert("⚠️ Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("❌ Network or server error:", err);
      alert("⚠️ Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------
     Helper: is team event selected
  ----------------------------- */
  const isTeamEventSelected = formData.eventType.some((e) => eventInfo[e]?.type === "team");

  const events = Object.keys(eventInfo).map((label) => {
    const Icon = icons[label] || Code;
    return { label, Icon };
  });

  // Split events into individual and team
  const individualEvents = events.filter((e) => eventInfo[e.label]?.type === "individual");
  const teamEvents = events.filter((e) => eventInfo[e.label]?.type === "team");

  
  /* -----------------------------
     External event selection (from event cards)
  ----------------------------- */
  useEffect(() => {
    const handleEventSelect = (e: CustomEvent<string>) => {
      toggleEvent(e.detail);
    };
    window.addEventListener("eventSelected", handleEventSelect as EventListener);
    return () => window.removeEventListener("eventSelected", handleEventSelect as EventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  /* -----------------------------
     Helpers for UI display name
     - fileDisplayName: show teamName (if team event) or user name; fallback to original file name
  ----------------------------- */
  const fileDisplayName = (() => {
    if (!formData.paymentReceipt) return "No file selected";
    const origName = formData.paymentReceipt.name;
    const extMatch = origName.match(/(\.[a-zA-Z0-9]+)$/);
    const ext = extMatch ? extMatch[0] : "";
    if (isTeamEventSelected) {
      const name = formData.teamName?.trim() || formData.name?.trim() || origName.replace(ext, "");
      return `${name}${ext}`;
    } else {
      const name = formData.name?.trim() || origName.replace(ext, "");
      return `${name}${ext}`;
    }
  })();

  const fileSizeKB = formData.paymentReceipt ? `${(formData.paymentReceipt.size / 1024).toFixed(1)} KB` : "";

  /* -----------------------------
     UI
  ----------------------------- */
  return (
    <section id="register" className="relative py-16" ref={ref}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full blur-3xl opacity-8" />

      <div className="container mx-auto px-4 relative z-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="px-4 py-2 glass rounded-full text-sm text-cyan-400 inline-block mb-4">
            Registration
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-orbitron mb-2">
            <span className="gradient-text">Join</span> YUGANTRAN2.0 2025
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-sm">
            Register now to secure your spot at the most exciting tech fest of
            the year! Fill details & upload payment receipt to complete.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto glass p-6 md:p-12 rounded-2xl glow-blue">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Two-column grid for inputs on md+ to reduce vertical length */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  error={errors.name}
                  icon={<User className="text-cyan-400" />}
                />
                <InputField
                  label="Roll Number"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  placeholder="Enter roll number"
                  error={errors.rollNumber}
                  icon={<Hash className="text-cyan-400" />}
                />
                <InputField
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Enter department"
                  error={errors.department}
                  icon={<Briefcase className="text-cyan-400" />}
                />
                <InputField
                  label="Semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  placeholder="Enter semester"
                  error={errors.semester}
                  icon={<BookOpen className="text-cyan-400" />}
                />
                <InputField
                  label="Mobile Number"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="9876543210"
                  error={errors.mobileNumber}
                  icon={<Phone className="text-cyan-400" />}
                />
                <InputField
                  label="College / University"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Enter college"
                  error={errors.college}
                  icon={<Building2 className="text-cyan-400" />}
                />
              </div>

              {/* Event Selection */}
              <div className="mt-6 bg-[#0a0f1c]/70 border border-cyan-500/20 rounded-2xl p-8 shadow-lg shadow-cyan-500/10 backdrop-blur-md">
                <h3 className="text-xl font-semibold text-center mb-8 text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]">
                  Select Your Events
                </h3>

                {/* Stack vertically */}
                <div className="flex flex-col gap-8">
                  {/* ✅ MOBILE VERSION */}
                  <div className="block sm:hidden space-y-8">
                    {/* Individual Events (Mobile) */}
                    <div className="border border-cyan-500/30 rounded-xl p-4 bg-[#0b1220]/60">
                      <h4 className="text-base font-semibold mb-4 text-cyan-300 text-center">
                        Individual Events
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {individualEvents.map(({ label, Icon }) => {
                          const selected = formData.eventType.includes(label);
                          const selectedStyle = selected
                            ? "bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-400 text-white"
                            : "bg-[#0f1724] border-cyan-500/20 text-gray-300 hover:border-cyan-400/40";
                          return (
                            <motion.button
                              key={label}
                              type="button"
                              onClick={() => toggleEvent(label)}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg border text-xs font-medium ${selectedStyle}`}
                            >
                              {selected ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <Icon className="w-3 h-3 text-cyan-300" />
                              )}
                              {label}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Team Events (Mobile) */}
                    <div className="border border-cyan-500/30 rounded-xl p-4 bg-[#0b1220]/60">
                      <h4 className="text-base font-semibold mb-4 text-cyan-300 text-center">
                        Team Events
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {teamEvents.map(({ label, Icon }) => {
                          const selected = formData.eventType.includes(label);
                          const selectedStyle = selected
                            ? "bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-400 text-white"
                            : "bg-[#0f1724] border-cyan-500/20 text-gray-300 hover:border-cyan-400/40";
                          return (
                            <motion.button
                              key={label}
                              type="button"
                              onClick={() => toggleEvent(label)}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              className={`flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-lg border text-xs font-medium ${selectedStyle}`}
                            >
                              {selected ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <Icon className="w-3 h-3 text-cyan-300" />
                              )}
                              {label}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* 💻 LAPTOP VERSION (your old layout) */}
                  <div className="hidden sm:flex flex-col gap-8">
                    {/* Individual Events */}
                    <div className="border border-cyan-500/30 rounded-xl p-6 bg-[#0b1220]/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all">
                      <h4 className="text-lg font-semibold mb-5 text-cyan-300 text-center">
                        Individual Events
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-2">
                        {individualEvents.map(({ label, Icon }) => {
                          const selected = formData.eventType.includes(label);
                          const selectedStyle = selected
                            ? "bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-400 text-white"
                            : "bg-[#0f1724] border-cyan-500/20 text-gray-300 hover:border-cyan-400/40";
                          return (
                            <motion.button
                              key={label}
                              type="button"
                              onClick={() => toggleEvent(label)}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              className={`flex items-center justify-center gap-2 py-3 px-5 rounded-lg border text-sm font-medium ${selectedStyle}`}
                            >
                              {selected ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Icon className="w-4 h-4 text-cyan-300" />
                              )}
                              {label}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Team Events */}
                    <div className="border border-cyan-500/30 rounded-xl p-6 bg-[#0b1220]/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all">
                      <h4 className="text-lg font-semibold mb-5 text-cyan-300 text-center">
                        Team Events
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-2">
                        {teamEvents.map(({ label, Icon }) => {
                          const selected = formData.eventType.includes(label);
                          const selectedStyle = selected
                            ? "bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-400 text-white"
                            : "bg-[#0f1724] border-cyan-500/20 text-gray-300 hover:border-cyan-400/40";
                          return (
                            <motion.button
                              key={label}
                              type="button"
                              onClick={() => toggleEvent(label)}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              className={`flex items-center justify-center gap-2 py-3 px-5 rounded-lg border text-sm font-medium ${selectedStyle}`}
                            >
                              {selected ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Icon className="w-4 h-4 text-cyan-300" />
                              )}
                              {label}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {errors.eventType && (
                  <p className="text-red-400 text-sm mt-3 text-center">
                    {errors.eventType}
                  </p>
                )}
              </div>

              {/* Info text below the event selection box */}
              <p className="text-sm mt-6 text-center text-cyan-300/90 font-medium tracking-wide drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]">
                ⚡ Choose individual event or a team event.
              </p>

              {/* Team Section */}
              {isTeamEventSelected && (
                <div className="p-3 border border-cyan-500/20 rounded-xl bg-[#0f1724] space-y-3">
                  <InputField
                    label="Team Name"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleChange}
                    placeholder="Enter team name"
                    error={errors.teamName}
                    icon={<Users className="text-cyan-400" />}
                  />

                  <div>
                    <label className="block text-sm mb-2 text-gray-300">
                      Team Members (excluding yourself)
                    </label>
                    {formData.teamMembers.map((member, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={member}
                          onChange={(e) => {
                            const updated = [...formData.teamMembers];
                            updated[i] = e.target.value;
                            setFormData({ ...formData, teamMembers: updated });
                          }}
                          placeholder={`Member ${i + 1}`}
                          className="w-full bg-[#0f1724] border border-cyan-500/20 rounded-lg px-4 py-2 text-white"
                        />
                        {i > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = formData.teamMembers.filter((_, idx) => idx !== i);
                              setFormData({ ...formData, teamMembers: updated });
                            }}
                            className="px-3 text-red-400 hover:text-red-300"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const max = Math.max(...formData.eventType.map((e) => eventInfo[e]?.maxTeam || 1));
                        if (formData.teamMembers.length < max - 1) {
                          setFormData({ ...formData, teamMembers: [...formData.teamMembers, ""] });
                        } else {
                          alert(`Maximum ${max} members allowed.`);
                        }
                      }}
                      className="text-cyan-400 text-sm hover:underline"
                    >
                      + Add Member
                    </button>
                    {errors.teamMembers && <p className="text-red-400 text-sm mt-1">{errors.teamMembers}</p>}
                  </div>
                </div>
              )}

              {/* Payment Section */}
              {formData.eventType.length > 0 && (
                <div className="p-3 rounded-xl border border-cyan-500/20 bg-[#0f1724] text-center space-y-3">
                  <p className="text-gray-300 flex items-center justify-center gap-2">
                    <IndianRupee className="w-5 h-5 text-cyan-400" />
                    <span className="text-md font-medium">Total Registration Fee: ₹{totalFee}</span>
                  </p>

                  <div>
                    <p className="text-gray-400 text-sm">Scan the QR below to pay</p>
                    <img
                      src="/images/bot/yashQR.jpg"
                      alt="Payment QR"
                      className="mx-auto w-36 h-36 rounded-lg border border-cyan-500/20"
                    />
                  </div>

                  {/* ========== STYLED FILE UPLOAD + DRAG & DROP ========== */}
                  <div className="text-left w-full max-w-xl mx-auto">
                    <label className="block text-sm mb-2 text-gray-300">Upload Payment Receipt</label>

                    {/* Hidden native input */}
                    <input
                      id="paymentReceiptInput"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    {/* Visible upload card with responsive layout so "Browse" and filename don't overflow on small screens */}
                    <label
                      htmlFor="paymentReceiptInput"
                      onDrop={onDrop}
                      onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      className={`group cursor-pointer block w-full border-2 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between bg-[#071025] border-cyan-500/30 hover:border-cyan-400 transition ${isDragActive ? "bg-cyan-600/5 border-cyan-400" : ""}`}
                      title="Click or drop a file here to upload payment receipt (image or PDF)"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-md flex items-center justify-center bg-gradient-to-tr from-cyan-600 to-blue-600 text-white shadow-md flex-shrink-0">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M12 16V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="3" y="12" width="18" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-medium text-white">Click or drop screenshot / PDF here</div>
                          <div className="text-xs text-gray-400">Accepted: JPG, PNG, PDF.</div>
                        </div>
                      </div>

                      {/* Right side - file info and browse pill.
                          On small screens this will wrap below the left block because of flex-col, preventing overflow. */}
                      <div className="flex items-center gap-3 sm:gap-4 sm:flex-row flex-col sm:flex-nowrap">
                        {formData.paymentReceipt ? (
                          <div className="text-right max-w-[220px] sm:max-w-[220px]">
                            <div className="text-sm font-medium text-cyan-300 truncate">{fileDisplayName}</div>
                            <div className="text-xs text-gray-400">{fileSizeKB} • {formData.paymentReceipt?.type.split("/")[1]}</div>
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400">No file selected</div>
                        )}
                        <div className="px-3 py-2 rounded-md bg-cyan-600/10 text-cyan-300 text-xs font-semibold whitespace-nowrap">
                          Browse
                        </div>
                      </div>
                    </label>

                    {/* Drag overlay hint */}
                    {isDragActive && (
                      <div className="mt-2 text-xs text-cyan-300">Release to upload the file</div>
                    )}

                    {/* Preview area with fixed dimensions and Remove inside preview container */}
                    {formData.paymentReceipt && (
                      <div className="mt-4">
                        <div className="relative w-full max-w-full rounded-md border border-cyan-500/30 overflow-hidden bg-[#071025]">
                          <div className="flex flex-col sm:flex-row items-stretch">
                            {/* Fixed preview area (prevents overflow) - responsive widths:
                                - mobile: full width, fixed height
                                - desktop: fixed width and height */}
                            <div className="flex-shrink-0 w-full sm:w-[480px] h-44 sm:h-[220px] overflow-hidden bg-[#0b1220]">
                              {previewUrl ? (
                                <img src={previewUrl} alt="Receipt preview" className="w-full h-full object-cover block" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs p-2 text-center">PDF Document</div>
                              )}
                            </div>

                            {/* Metadata area below the image on mobile, right of it on desktop */}
                            <div className="flex-1 p-4 flex flex-col justify-center min-w-0">
                              <div className="text-sm font-semibold text-white truncate">{fileDisplayName}</div>
                              <div className="text-xs text-gray-400 mt-1">{fileSizeKB}</div>
                              {errors.paymentReceipt && <p className="text-red-400 text-sm mt-2">{errors.paymentReceipt}</p>}
                            </div>
                          </div>

                          {/* Remove button overlaid inside preview container (always visible and inside viewport) */}
                          <button
                            type="button"
                            onClick={removeFile}
                            className="absolute top-3 right-3 bg-black/50 text-red-400 hover:text-red-300 px-3 py-1 rounded text-sm backdrop-blur-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {formData.eventType.length > 0 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="UPI ID / UTR ID"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleChange}
                      placeholder="Enter your UPI ID or UTR ID"
                      error={errors.upiId}
                      icon={<IndianRupee className="text-cyan-400" />}
                    />
                    <InputField
                      label="Transaction ID"
                      name="transactionId"
                      value={formData.transactionId}
                      onChange={handleChange}
                      placeholder="Enter your Transaction ID"
                      error={errors.transactionId}
                      icon={<Hash className="text-cyan-400" />}
                    />
                  </div>
                </>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                disabled={
                  loading ||
                  !formData.paymentReceipt ||
                  !formData.upiId.trim() ||
                  !formData.transactionId.trim()
                }
                className={`w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-orbitron text-white flex items-center justify-center gap-2 mt-2 ${
                  (!formData.paymentReceipt ||
                    !formData.upiId.trim() ||
                    !formData.transactionId.trim() ||
                    loading)
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Register Now
                  </>
                )}
              </motion.button>
            </form>
          ) : (
            <motion.div ref={successRef} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
              <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
              <h3 className="text-3xl font-orbitron gradient-text mb-4">Registration Successful!</h3>
              <p className="text-gray-400 mb-6">Thank you for registering! Your payment receipt has been received.</p>
              {/* WhatsApp group link and message */}
              {(() => {
                // Get the event name (should be only one in eventType)
                const eventName = lastRegisteredEvent;
                const whatsapp = eventName ? eventInfo[eventName]?.whatsapp : null;
                return whatsapp ? (
                  <div className="mt-6 flex flex-col items-center gap-3">
                    <p className="text-cyan-300 font-medium">
                      Join the WhatsApp group for <span className="font-bold">{eventName}</span> to get all updates and announcements!
                    </p>
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow transition">
                      <svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><path d="M16.001 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.47 1.74 6.41l-1.84 6.73a1.6 1.6 0 0 0 1.96 1.96l6.73-1.84a12.74 12.74 0 0 0 6.41 1.74c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.8-12.8-12.8zm0 23.04c-2.07 0-4.1-.54-5.87-1.56l-.42-.24-5.01 1.37 1.37-5.01-.24-.42a10.23 10.23 0 0 1-1.56-5.87c0-5.66 4.6-10.24 10.24-10.24s10.24 4.58 10.24 10.24-4.6 10.24-10.24 10.24zm5.61-7.67c-.31-.16-1.83-.91-2.11-1.01-.28-.1-.48-.16-.68.16-.2.31-.77 1.01-.94 1.21-.17.2-.35.23-.66.08-.31-.16-1.31-.48-2.5-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.13-.63.13-.13.31-.35.47-.53.16-.18.21-.31.31-.51.10-.2.05-.38-.03-.53-.08-.16-.68-1.63-.93-2.23-.24-.58-.48-.5-.68-.51-.18-.01-.38-.01-.58-.01-.2 0-.53.08-.81.38-.28.31-1.07 1.05-1.07 2.56 0 1.51 1.09 2.97 1.24 3.18.15.2 2.14 3.28 5.19 4.47.73.31 1.3.5 1.74.64.73.23 1.39.2 1.91.12.58-.09 1.83-.75 2.09-1.48.26-.73.26-1.36.18-1.48-.08-.12-.28-.2-.59-.36z"/></svg>
                      Join WhatsApp Group
                    </a>
                    <p className="text-xs text-gray-400 mt-2">Please join the group to receive important event updates and instructions.</p>
                  </div>
                ) : null;
              })()}
            </motion.div>
          )}
        </div>
      </div>

      {/* -----------------------------
           Toast popup (slide up + fade out)
           positioned bottom-center
        ----------------------------- */}
      <div className="pointer-events-none fixed inset-0 flex items-end justify-center px-4 pb-8 z-50">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={toast ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 700, damping: 30, duration: 0.25 }}
          className={`min-w-[220px] max-w-sm pointer-events-auto`}
          aria-live="polite"
        >
          {toast && (
            <div className="bg-[#071023] border border-cyan-500/30 rounded-full px-4 py-2 flex items-center gap-3 shadow-lg">
              <div className="w-8 h-8 flex items-center justify-center bg-cyan-600/10 rounded-full">
                {toast.Icon ? <toast.Icon className="w-5 h-5 text-cyan-300" /> : <Search className="w-5 h-5 text-cyan-300" />}
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-white">{toast.label} selected!</div>
                <div className="text-xs text-gray-400">Added to your registration</div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* -----------------------------
   INPUT FIELD COMPONENT
   - kept simple, validation happens on submit (and shows floating pop)
----------------------------- */
function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  icon,
}: {
  label: string;
  name: string;
  value: string;
  onChange: any;
  placeholder: string;
  error?: string;
  icon?: JSX.Element;
}) {
  return (
    <div className="w-full">
      <label className="block text-xs md:text-sm mb-1 text-gray-300 font-medium tracking-wide">
        {label}
      </label>

      <div className="relative group">
        {/* Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 group-focus-within:text-cyan-300 transition-colors duration-200 w-5 h-5 flex items-center justify-center">
            {icon}
          </div>
        )}

        {/* Input Field */}
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-transparent border border-cyan-500/40 rounded-lg py-3 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 ${icon ? "pl-12 pr-4" : "px-4"
            }`}
        />
      </div>

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}