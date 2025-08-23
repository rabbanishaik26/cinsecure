import React, { useMemo, useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertTriangle } from "lucide-react";

type ServiceValue =
  | "onsite-unarmed-guard"
  | "onsite-armed-guard"
  | "k9-canine-security"
  | "mobile-patrol"
  | "construction-site-security"
  | "residential-security"
  | "retail-loss-prevention"
  | "event-security"
  | "executive-protection"
  | "secure-transport"
  | "alarm-response-keyholding"
  | "cctv-monitoring"
  | "surveillance"
  | "private-investigation"
  | "risk-assessment"
  | "threat-vulnerability"
  | "other";

type FormData = {
  name: string;
  email: string;
  phone: string;
  service: ServiceValue | "";
  message: string;

  // Conditional fields
  eventDate?: string;
  eventLocation?: string;
  propertyAddress?: string;
  escortFrom?: string;
  escortTo?: string;

  // Honeypot
  company?: string;
};

const SERVICE_GROUPS: { label: string; options: { value: ServiceValue; label: string }[] }[] = [
  {
    label: "On-Site Security",
    options: [
      { value: "onsite-unarmed-guard", label: "On-Site Guard (Unarmed)" },
      { value: "onsite-armed-guard", label: "On-Site Guard (Armed)" },
      { value: "k9-canine-security", label: "K9 / Canine Security" },
      { value: "mobile-patrol", label: "Mobile Patrol" },
      { value: "construction-site-security", label: "Construction / Commercial Site Security" },
      { value: "residential-security", label: "Residential Security" },
      { value: "retail-loss-prevention", label: "Retail Loss Prevention" },
      { value: "event-security", label: "Event / Crowd Control" }
    ]
  },
  {
    label: "Executive & Escorts",
    options: [
      { value: "executive-protection", label: "Executive Protection / Bodyguard" },
      { value: "secure-transport", label: "Secure Transport / Escort" },
      { value: "alarm-response-keyholding", label: "Alarm Response & Key Holding" }
    ]
  },
  {
    label: "Monitoring & Intelligence",
    options: [
      { value: "cctv-monitoring", label: "CCTV Monitoring" },
      { value: "surveillance", label: "Discrete Surveillance" },
      { value: "private-investigation", label: "Private Investigation" }
    ]
  },
  {
    label: "Advisory",
    options: [
      { value: "risk-assessment", label: "Risk Assessment & Security Audit" },
      { value: "threat-vulnerability", label: "Threat & Vulnerability Assessment" }
    ]
  }
];

const REQUIRED_BY_SERVICE: Partial<Record<ServiceValue, (keyof FormData)[]>> = {
  "event-security": ["eventDate", "eventLocation"],
  "construction-site-security": ["propertyAddress"],
  "residential-security": ["propertyAddress"],
  "secure-transport": ["escortFrom", "escortTo"]
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    company: "" // honeypot
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const activeRequired = useMemo(() => {
    if (!formData.service) return [];
    return REQUIRED_BY_SERVICE[formData.service] ?? [];
  }, [formData.service]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => {
      const { [name]: _omit, ...rest } = prev;
      return rest;
    });
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};

    if (!formData.name.trim()) next.name = "Full name is required.";
    if (!formData.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = "Enter a valid email.";

    if (!formData.service) next.service = "Please select a service.";
    if (!formData.message.trim()) next.message = "Please describe your needs.";

    for (const field of activeRequired) {
      const v = (formData[field] as string) || "";
      if (!v.trim()) {
        const labelMap: Record<string, string> = {
          eventDate: "Event date",
          eventLocation: "Event location",
          propertyAddress: "Property address",
          escortFrom: "Pickup location",
          escortTo: "Drop-off location"
        };
        next[field] = `${labelMap[field] || field} is required for the selected service.`;
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    // Honeypot check
    if (formData.company && formData.company.trim()) {
      setStatus({ ok: true, msg: "Thanks! We’ll be in touch shortly." });
      setFormData({ name: "", email: "", phone: "", service: "", message: "", company: "" });
      return;
    }

    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/manbznpy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          ...formData,
          _subject: "New Security Inquiry",
          _gotcha: formData.company
        })
      });

      if (res.ok) {
        setStatus({ ok: true, msg: "Thanks! Your request has been sent. We’ll reply within 24 hours." });
        setFormData({ name: "", email: "", phone: "", service: "", message: "", company: "" });
      } else {
        const data = await res.json().catch(() => ({} as any));
        setStatus({
          ok: false,
          msg: data?.error || "Something went wrong sending your message. Please try again or call our 24/7 line."
        });
      }
    } catch {
      setStatus({ ok: false, msg: "Network error. Please check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const showEventFields = formData.service === "event-security";
  const showPropertyField =
    formData.service === "construction-site-security" || formData.service === "residential-security";
  const showEscortFields = formData.service === "secure-transport";

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Get In Touch</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Ready to discuss your security needs? Contact us for a free consultation and custom quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <a
                      href="mailto:Cins8288@gmail.com"
                      className="text-slate-300 hover:text-blue-500 transition-colors"
                    >
                      cins8288@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Phone</div>
                    <div className="text-slate-300">Available 24/7 for emergencies</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                    <Clock className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Response Time</div>
                    <div className="text-slate-300">Emergency: &lt;15 minutes</div>
                    <div className="text-slate-300">Standard: Within 24 hours</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Service Area</div>
                    <div className="text-slate-300">Available for local and travel assignments</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="font-semibold text-blue-500 mb-2">Emergency Contact</div>
                <div className="text-sm text-slate-300">
                  For immediate security assistance, call our 24/7 emergency line.
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-slate-50 rounded-2xl p-8" noValidate>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Request a Quote</h3>

              {status && (
                <div
                  className={`mb-6 flex items-start gap-3 rounded-lg border p-4 ${
                    status.ok
                      ? "border-green-200 bg-green-50 text-green-800"
                      : "border-amber-200 bg-amber-50 text-amber-800"
                  }`}
                  role="alert"
                >
                  {status.ok ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5" />
                  ) : (
                    <AlertTriangle className="mt-0.5 h-5 w-5" />
                  )}
                  <p className="text-sm">{status.msg}</p>
                </div>
              )}

              {/* Honeypot (hidden) */}
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.name ? "border-rose-400" : "border-slate-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-rose-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.email ? "border-rose-400" : "border-slate-300"
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-rose-600">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-slate-700 mb-2">
                    Service Needed *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    aria-invalid={!!errors.service}
                    aria-describedby={errors.service ? "service-error" : undefined}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.service ? "border-rose-400" : "border-slate-300"
                    }`}
                  >
                    <option value="">Select a service</option>
                    {SERVICE_GROUPS.map(group => (
                      <optgroup key={group.label} label={group.label}>
                        {group.options.map(opt => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="other">Other</option>
                  </select>
                  {errors.service && (
                    <p id="service-error" className="mt-1 text-sm text-rose-600">
                      {errors.service}
                    </p>
                  )}
                </div>
              </div>

              {/* Conditional fields */}
              {showEventFields && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-semibold text-slate-700 mb-2">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate || ""}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.eventDate}
                      aria-describedby={errors.eventDate ? "eventDate-error" : undefined}
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.eventDate ? "border-rose-400" : "border-slate-300"
                      }`}
                    />
                    {errors.eventDate && (
                      <p id="eventDate-error" className="mt-1 text-sm text-rose-600">
                        {errors.eventDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="eventLocation" className="block text-sm font-semibold text-slate-700 mb-2">
                      Event Location (City/Address) *
                    </label>
                    <input
                      type="text"
                      id="eventLocation"
                      name="eventLocation"
                      value={formData.eventLocation || ""}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.eventLocation}
                      aria-describedby={errors.eventLocation ? "eventLocation-error" : undefined}
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.eventLocation ? "border-rose-400" : "border-slate-300"
                      }`}
                      placeholder="Where is your event?"
                    />
                    {errors.eventLocation && (
                      <p id="eventLocation-error" className="mt-1 text-sm text-rose-600">
                        {errors.eventLocation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {showPropertyField && (
                <div className="mb-6">
                  <label htmlFor="propertyAddress" className="block text-sm font-semibold text-slate-700 mb-2">
                    Property Address *
                  </label>
                  <input
                    type="text"
                    id="propertyAddress"
                    name="propertyAddress"
                    value={formData.propertyAddress || ""}
                    onChange={handleInputChange}
                    aria-invalid={!!errors.propertyAddress}
                    aria-describedby={errors.propertyAddress ? "propertyAddress-error" : undefined}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      errors.propertyAddress ? "border-rose-400" : "border-slate-300"
                    }`}
                    placeholder="Street, City, State"
                  />
                  {errors.propertyAddress && (
                    <p id="propertyAddress-error" className="mt-1 text-sm text-rose-600">
                      {errors.propertyAddress}
                    </p>
                  )}
                </div>
              )}

              {showEscortFields && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="escortFrom" className="block text-sm font-semibold text-slate-700 mb-2">
                      Pickup Location *
                    </label>
                    <input
                      type="text"
                      id="escortFrom"
                      name="escortFrom"
                      value={formData.escortFrom || ""}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.escortFrom}
                      aria-describedby={errors.escortFrom ? "escortFrom-error" : undefined}
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.escortFrom ? "border-rose-400" : "border-slate-300"
                      }`}
                      placeholder="Origin address or location"
                    />
                    {errors.escortFrom && (
                      <p id="escortFrom-error" className="mt-1 text-sm text-rose-600">
                        {errors.escortFrom}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="escortTo" className="block text-sm font-semibold text-slate-700 mb-2">
                      Drop-off Location *
                    </label>
                    <input
                      type="text"
                      id="escortTo"
                      name="escortTo"
                      value={formData.escortTo || ""}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.escortTo}
                      aria-describedby={errors.escortTo ? "escortTo-error" : undefined}
                      className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        errors.escortTo ? "border-rose-400" : "border-slate-300"
                      }`}
                      placeholder="Destination address or location"
                    />
                    {errors.escortTo && (
                      <p id="escortTo-error" className="mt-1 text-sm text-rose-600">
                        {errors.escortTo}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                    errors.message ? "border-rose-400" : "border-slate-300"
                  }`}
                  placeholder="Please describe your security needs, event details, timeline, and any specific requirements..."
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-rose-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" />
                {submitting ? "Sending..." : "Send Message"}
              </button>

              <p className="text-sm text-slate-600 mt-4 text-center">
                We'll respond to your inquiry within 24 hours. For emergencies, please call directly.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
