import { useState } from "react";

export default function TestDriveForm({ car, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", phone: "", date: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-xl font-semibold text-white mb-2">Request Sent!</h3>
        <p className="text-gray-400 mb-6">The dealer will contact you shortly.</p>
        <button onClick={onClose} className="btn-primary">Close</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-2">
        Book Test Drive — {car?.car} {car?.car_model}
      </h3>

      <input
        className="input-field"
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        className="input-field"
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        required
      />
      <input
        type="date"
        className="input-field"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />
      <textarea
        className="input-field resize-none"
        rows={3}
        placeholder="Additional message (optional)"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primary flex-1">Submit Request</button>
        <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button>
      </div>
    </form>
  );
}
