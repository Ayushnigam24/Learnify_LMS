import { useState, useRef } from "react";

// ═══════════════════════════════════════════════════════
//  QuizModal — White bg, Blue/Black text (Tailwind)
// ═══════════════════════════════════════════════════════

export function QuizModal({ quiz, onSubmit, onClose }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(Array(quiz.questions.length).fill(null));
    const [submitting, setSubmitting] = useState(false);

    const q = quiz.questions[current];
    const totalQ = quiz.questions.length;
    const answered = selected.filter((s) => s !== null).length;
    const progress = ((current + 1) / totalQ) * 100;
    const optionLetters = ["A", "B", "C", "D"];

    const handleSelect = (idx) => {
        const updated = [...selected];
        updated[current] = idx;
        setSelected(updated);
    };

    const handleSubmit = async () => {
        if (answered < totalQ) {
            const go = window.confirm(`${totalQ - answered} sawaal chhoot gaye. Phir bhi submit karein?`);
            if (!go) return;
        }
        setSubmitting(true);
        await onSubmit(selected.map((s) => (s === null ? -1 : s)));
        setSubmitting(false);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-blue-800">
                    <div>
                        <h2 className="text-base font-bold text-white">📝 Quiz Time</h2>
                        <p className="text-xs text-blue-200 mt-0.5">
                            Question {current + 1} of {totalQ}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-colors flex items-center justify-center"
                    >
                        ✕
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="h-1.5 bg-blue-100">
                    <div
                        className="h-full bg-blue-700 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-5">

                    {/* Question Dots */}
                    <div className="flex flex-wrap gap-1.5">
                        {quiz.questions.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`w-7 h-7 rounded-md text-xs font-bold transition-all border ${
                                    i === current
                                        ? "bg-blue-800 text-white border-blue-800"
                                        : selected[i] !== null
                                        ? "bg-blue-100 text-blue-800 border-blue-300"
                                        : "bg-white text-gray-500 border-gray-300 hover:border-blue-400"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    {/* Question */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4">
                        <p className="text-sm font-semibold text-blue-900 leading-relaxed">
                            {q.question}
                        </p>
                    </div>

                    {/* Options */}
                    <div className="flex flex-col gap-2.5">
                        {q.options.map((opt, i) => {
                            const isSelected = selected[current] === i;
                            return (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(i)}
                                    className={`flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-150 ${
                                        isSelected
                                            ? "bg-blue-800 border-blue-800 text-white"
                                            : "bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50"
                                    }`}
                                >
                                    <span className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                                        isSelected
                                            ? "bg-white text-blue-800"
                                            : "bg-blue-100 text-blue-800"
                                    }`}>
                                        {optionLetters[i]}
                                    </span>
                                    <span className="text-sm font-medium">{opt}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Nav */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                    <button
                        onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                        disabled={current === 0}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm hover:border-blue-400 hover:text-blue-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        ← Prev
                    </button>

                    <span className="text-xs text-gray-500 font-medium">
                        {answered}/{totalQ} answered
                    </span>

                    {current < totalQ - 1 ? (
                        <button
                            onClick={() => setCurrent((c) => Math.min(totalQ - 1, c + 1))}
                            className="px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
                        >
                            Next →
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-sm font-bold transition-colors shadow-md"
                        >
                            {submitting ? "Submitting..." : "Submit Quiz ✓"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}


// ═══════════════════════════════════════════════════════
//  CertificateModal — White bg, Blue/Black theme
// ═══════════════════════════════════════════════════════

export function CertificateModal({ userName, courseName, score, date, onClose }) {
    const certRef = useRef(null);
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        setDownloading(true);
        try {
            const html2canvas = (await import("html2canvas")).default;
            const canvas = await html2canvas(certRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
            });
            const link = document.createElement("a");
            link.download = `${userName.replace(/\s+/g, "_")}_Certificate.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        } catch {
            alert("Download mein error. Dobara try karein.");
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-2xl flex flex-col items-center gap-4 py-6">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="self-end px-4 py-1.5 rounded-lg border border-gray-300 text-gray-500 hover:text-gray-800 hover:border-gray-400 text-sm transition-colors bg-white"
                >
                    ✕ Close
                </button>

                {/* ── Certificate Card ── */}
                <div
                    ref={certRef}
                    className="w-full bg-white rounded-2xl p-10 text-center relative overflow-hidden"
                    style={{ border: "3px solid #1e3a8a", boxShadow: "0 8px 40px rgba(30,58,138,0.15)" }}
                >
                    {/* Corner decorations */}
                    <div className="absolute top-3 left-3 w-14 h-14 border-t-2 border-l-2 border-blue-800 rounded-tl-xl opacity-40" />
                    <div className="absolute bottom-3 right-3 w-14 h-14 border-b-2 border-r-2 border-blue-800 rounded-br-xl opacity-40" />

                    {/* Top accent line */}
                    <div className="h-1 bg-gradient-to-r from-white via-blue-800 to-white mb-8 rounded-full" />


                    {/* Seal */}
                    {/* Logo */}
                    <div className="flex justify-center mb-4">
                        <img src="/logo.png" alt="Logo" className="h-14 object-contain" />
                    </div>

                    <div className="text-4xl mb-3">🏆</div>

                    <p className="text-xs tracking-[4px] text-blue-800 font-bold mb-5 uppercase">
                        Certificate of Completion
                    </p>

                    <p className="text-sm text-gray-500 mb-3">This is to proudly certify that</p>

                    {/* User Name */}
                    <h1
                        className="text-4xl font-bold text-blue-900 mb-2 leading-tight"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        {userName}
                    </h1>
                    <div className="h-0.5 w-48 mx-auto bg-blue-800 opacity-30 mb-5" />

                    <p className="text-sm text-gray-500 mb-3">has successfully completed the course</p>

                    {/* Course Name */}
                    <h2 className="text-xl font-bold text-gray-900 mb-7 leading-snug px-4">
                        {courseName}
                    </h2>

                    {/* Footer */}
                    <div className="flex items-center justify-center gap-10 mb-6">
                        <div className="flex flex-col gap-1 text-center">
                            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Date Issued</span>
                            <span className="text-sm font-bold text-gray-800">{date}</span>
                        </div>
                        <div className="w-px h-8 bg-gray-200" />
                        <div className="flex flex-col gap-1 text-center">
                            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Status</span>
                            <span className="text-sm font-bold text-green-600">✓ Verified</span>
                        </div>
                    </div>

                    {/* Bottom accent line */}
                    <div className="h-1 bg-gradient-to-r from-white via-blue-800 to-white rounded-full" />
                </div>

                {/* Download Button */}
                <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="px-8 py-3 rounded-xl bg-blue-800 hover:bg-blue-700 active:scale-95 disabled:opacity-60 text-white font-bold text-sm transition-all shadow-lg"
                >
                    {downloading ? "Downloading..." : "⬇ Download Certificate (PNG)"}
                </button>
            </div>
        </div>
    );
}