import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { User, Phone, Building2, Send, CheckCircle, Loader2 } from "lucide-react";

export default function Register() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    department: "",
    semester: "",
    mobileNumber: "",
    college: "",
    eventType: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const events = [
    "Code Quest",
    "Debug-It",
    "Tech Quiz",
    "Poster/Project Showcase",
    "Innovation Expo",
    "Fun Tech Zone",
  ];

  // Validate form inputs
  const validate = (data: typeof formData) => {
    const newErrors: Record<string, string> = {};
    if (!data.name.trim()) newErrors.name = "Full name is required.";
    if (!data.rollNumber.trim()) newErrors.rollNumber = "Roll number is required.";
    if (!data.department.trim()) newErrors.department = "Department is required.";
    if (!data.semester.trim()) newErrors.semester = "Semester is required.";
    if (!/^[0-9]{10}$/.test(data.mobileNumber))
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
    if (data.eventType.length === 0)
      newErrors.eventType = "Select at least one event.";
    if (!data.college.trim())
      newErrors.college = "College/University name is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setFormData((prev) => {
      if (type === "checkbox") {
        const updatedEvents = checked
          ? [...prev.eventType, value]
          : prev.eventType.filter((ev) => ev !== value);
        return { ...prev, eventType: updatedEvents };
      }
      return { ...prev, [name]: value };
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = validate(formData);
    if (!valid) return;

    setLoading(true);

    const payload = {
      ...formData,
      eventType: formData.eventType.join(", "),
    };

    const backendUrl =
      import.meta.env.VITE_BACKEND_URL || "https://server-cr2m.onrender.com";

    try {
      const res = await fetch(`${backendUrl}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          rollNumber: "",
          department: "",
          semester: "",
          mobileNumber: "",
          college: "",
          eventType: [],
        });
        setErrors({});
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        alert("❌ Something went wrong. Try again.");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("⚠️ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="register" className="relative py-24 overflow-visible" ref={ref}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full blur-3xl opacity-10" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 glass rounded-full text-sm text-cyan-400">
              Registration
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron mb-6">
            <span className="gradient-text">Join</span> YUGANTRAN2.0 2025
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Register now to secure your spot at the most exciting tech fest of
            the year!
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass rounded-2xl p-8 md:p-12 glow-blue">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <InputField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  error={errors.name}
                  icon={<User className="text-cyan-400" />}
                />

                {/* Roll Number */}
                <InputField
                  label="Roll Number"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  placeholder="Enter your roll number"
                  error={errors.rollNumber}
                />

                {/* Department */}
                <InputField
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Enter your department"
                  error={errors.department}
                />

                {/* Semester */}
                <InputField
                  label="Semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  placeholder="Enter your semester (e.g., 5th)"
                  error={errors.semester}
                />

                {/* Mobile Number */}
                <InputField
                  label="Mobile Number"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  error={errors.mobileNumber}
                  icon={<Phone className="text-cyan-400" />}
                />

                {/* College */}
                <InputField
                  label="College / University"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Enter your institution name"
                  error={errors.college}
                  icon={<Building2 className="text-cyan-400" />}
                />

                {/* Event Selection */}
                <div>
                  <label className="block text-sm mb-2 text-gray-300">
                    Select Events (choose one or more)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-gray-300">
                    {events.map((event) => (
                      <label
                        key={event}
                        className="flex items-center space-x-2 bg-[#111827] border border-cyan-500/20 rounded-lg px-3 py-2 cursor-pointer hover:border-cyan-400/50 transition"
                      >
                        <input
                          type="checkbox"
                          name="eventType"
                          value={event}
                          checked={formData.eventType.includes(event)}
                          onChange={handleChange}
                          className="accent-cyan-400"
                        />
                        <span className="text-sm">{event}</span>
                      </label>
                    ))}
                  </div>
                  {errors.eventType && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.eventType}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-orbitron text-white flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Register Now
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
                <h3 className="text-3xl font-orbitron gradient-text mb-4">
                  Registration Successful!
                </h3>
                <p className="text-gray-400">
                  Thank you for registering. You'll receive confirmation soon!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// 🔹 Reusable Input Component
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
    <div>
      <label className="block text-sm mb-2 text-gray-300">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2">{icon}</span>
        )}
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-[#1a1a2e] border border-cyan-500/30 rounded-lg ${
            icon ? "pl-12" : "pl-4"
          } pr-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20`}
        />
      </div>
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
