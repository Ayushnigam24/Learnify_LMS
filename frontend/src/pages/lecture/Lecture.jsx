import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { server } from '../../main';
import Loding from '../loding/Loding';
import toast from 'react-hot-toast';
import { TiTickOutline } from "react-icons/ti";
import { QuizModal, CertificateModal } from '../quiz/QuizAndCertificateModals';

const Lecture = ({ user }) => {
    const [lectures, setLectures] = useState([]);
    const [lecture, setLecture] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lecLoading, setLecLoading] = useState(false);
    const [show, setShow] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [discription, setDiscription] = useState("")
    const [video, setVideo] = useState("")
    const [videoPrev, setVideoPrev] = useState("")
    const [btnLoading, setBtnLoading] = useState(false)

    const [completed, setCompleted] = useState(0)
    const [completedLec, setCompletedLec] = useState(0)
    const [lectureLength, setLectureLength] = useState(0)
    const [progress, setProgress] = useState([])

    const [quizStatus, setQuizStatus] = useState(null)
    const [quizData, setQuizData] = useState(null)
    const [attemptData, setAttemptData] = useState(null)
    const [showQuiz, setShowQuiz] = useState(false)
    const [showCert, setShowCert] = useState(false)
    const [generating, setGenerating] = useState(false)
    const [courseTitle, setCourseTitle] = useState("")

    if (user && user.userType !== 'admin' && !user.subscription.includes(params.id)) {
        return navigate('/')
    }

    const allCompleted = lectureLength > 0 && completedLec >= lectureLength

    async function fetchLectures() {
        try {
            const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
                headers: { token: localStorage.getItem("token") }
            })
            setLectures(data.lectures)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    async function fetchCourseTitle() {
        try {
            const { data } = await axios.get(`${server}/api/course/${params.id}`, {
                headers: { token: localStorage.getItem("token") }
            })
            setCourseTitle(data.course?.title || data.title || "")
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchCourseTitle() {
        try {
            const { data } = await axios.get(`${server}/api/course/${params.id}`, {
                headers: { token: localStorage.getItem("token") }
            })
            setCourseTitle(data.course?.title || data.title || "")
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchLecture(id) {
        setLecLoading(true)
        try {
            const { data } = await axios.get(`${server}/api/lecture/${id}`, {
                headers: { token: localStorage.getItem("token") }
            })
            setLecture(data.lecture)
            setLecLoading(false)
        } catch (error) {
            console.log(error);
            setLecLoading(false)
        }
    }

    async function fetchProgress() {
        try {
            const { data } = await axios.get(`${server}/api/user/progress?course=${params.id}`, {
                headers: { token: localStorage.getItem("token") }
            })
            setCompleted(data.courseProgressPercentage);
            setCompletedLec(data.completedLectures);
            setLectureLength(data.allLectures);
            setProgress(data.progress)
        } catch (error) {
            console.log(error);
        }
    }

    const addProgress = async (id) => {
        try {
            const { data } = await axios.post(
                `${server}/api/user/progress?course=${params.id}&lectureId=${id}`, {},
                { headers: { token: localStorage.getItem("token") } }
            )
            console.log(data.message);
            fetchProgress()
        } catch (error) {
            console.log(error);
        }
    }

    async function checkAttemptStatus() {
        try {
            const { data } = await axios.get(`${server}/api/quiz/attempt/${params.id}`, {
                headers: { token: localStorage.getItem("token") }
            })
            if (data.attempted) {
                setAttemptData(data.attempt)
                setQuizStatus(data.passed ? "attempted_pass" : "attempted_fail")
            } else {
                setQuizStatus("available")
            }
        } catch {
            setQuizStatus("available")
        }
    }

    async function handleTakeQuiz() {
        setGenerating(true)
        try {
            await axios.post(`${server}/api/quiz/generate/${params.id}`, {}, {
                headers: { token: localStorage.getItem("token") }
            })
            const { data } = await axios.get(`${server}/api/quiz/${params.id}`, {
                headers: { token: localStorage.getItem("token") }
            })
            setQuizData(data.quiz)
            setShowQuiz(true)
        } catch {
            toast.error("Quiz load karne mein error. Dobara try karein.")
        } finally {
            setGenerating(false)
        }
    }

    async function handleQuizSubmit(answers) {
        try {
            const { data } = await axios.post(
                `${server}/api/quiz/submit/${quizData._id}`,
                { answers },
                { headers: { token: localStorage.getItem("token") } }
            )
            setAttemptData(data.attempt)
            setQuizStatus(data.passed ? "attempted_pass" : "attempted_fail")
            setShowQuiz(false)
            if (data.passed) {
                toast.success(`🎉 Quiz Pass! Score: ${data.score}%`)
            } else {
                toast.error(`Score: ${data.score}% — 70% chahiye tha. Retry karein!`)
            }
        } catch {
            toast.error("Submit error. Dobara try karein.")
        }
    }

    const changeVideoHandler = e => {
        const file = e.target.files[0];
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setVideoPrev(reader.result)
            setVideo(file);
        }
    }

    const submitHandler = async function (e) {
        setBtnLoading(true)
        e.preventDefault();
        const myFrom = new FormData()
        myFrom.append("title", title)
        myFrom.append("discription", discription)
        myFrom.append("file", video)
        try {
            const { data } = await axios.post(`${server}/admin/course/${params.id}`, myFrom, {
                headers: { token: localStorage.getItem("token") }
            })
            toast.success(data.message)
            setBtnLoading(false)
            setShow(false)
            fetchLectures()
            setTitle(""); setDiscription(""); setVideo(""); setVideoPrev("")
        } catch (error) {
            toast.error(error.response.data.message)
            setBtnLoading(false)
        }
    }

    const deleteHandler = async (id) => {
        if (confirm("Are You Sure?")) {
            try {
                const { data } = await axios.delete(`${server}/admin/lecture/${id}`, {
                    headers: { token: localStorage.getItem("token") }
                })
                toast.success(data.message)
                fetchLectures()
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
    }

    useEffect(() => {
        fetchLectures()
        fetchProgress()
        fetchCourseTitle()
    }, [])

    useEffect(() => {
        if (allCompleted) {
            checkAttemptStatus()
        }
    }, [allCompleted])

    return (
        <>
            {loading ? <Loding /> : (
                <div className="min-h-screen bg-white text-gray-900">

                    {/* ── Top Progress Bar ── */}
                    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm px-4 py-3">
                        <div className="max-w-7xl mx-auto flex items-center gap-4 flex-wrap">
                            <span className="text-sm font-bold text-blue-800 whitespace-nowrap">
                                📚 {completedLec} / {lectureLength} Lectures
                            </span>
                            <div className="flex-1 min-w-[120px] h-2 bg-blue-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-700 rounded-full transition-all duration-700"
                                    style={{ width: `${completed}%` }}
                                />
                            </div>
                            <span className="text-sm font-bold text-blue-800 whitespace-nowrap">
                                {completed}%
                            </span>
                        </div>
                    </div>

                    {/* ── Main Grid ── */}
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_360px] min-h-screen">

                        {/* ── LEFT: Video Player ── */}
                        <div className="flex flex-col border-r border-gray-200">
                            {lecLoading ? <Loding /> : (
                                <>
                                    {lecture.video ? (
                                        <div className="flex flex-col">
                                            <div className="bg-black w-full aspect-video">
                                                <video
                                                    className="w-full h-full"
                                                    src={`${server}/${lecture.video}`}
                                                    controls
                                                    controlsList="nodownload noremoteplayback"
                                                    disablePictureInPicture
                                                    disableRemotePlayback
                                                    autoPlay
                                                    onEnded={() => addProgress(lecture._id)}
                                                />
                                            </div>
                                            <div className="p-6 border-b border-gray-100">
                                                <h1 className="text-2xl font-bold text-blue-900 mb-2">
                                                    {lecture.title}
                                                </h1>
                                                <p className="text-gray-600 text-sm leading-relaxed">
                                                    {lecture.discription}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center flex-1 p-10 text-center gap-4">
                                            <span className="text-6xl">🎬</span>
                                            <p className="text-2xl font-bold text-blue-900">
                                                Koi lecture select karein
                                            </p>
                                            <p className="text-gray-500 text-sm">
                                                Right side se lecture click karein
                                            </p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* ── RIGHT: Lecture List ── */}
                        <div className="flex flex-col bg-gray-50 border-l border-gray-200">

                            {/* Right Header */}
                            <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
                                <h2 className="font-bold text-blue-900 text-sm">Course Lectures</h2>
                                {user && user.userType === "admin" && (
                                    <button
                                        onClick={() => setShow(!show)}
                                        className="text-xs px-3 py-1.5 rounded-lg bg-blue-800 hover:bg-blue-700 text-white font-semibold transition-colors"
                                    >
                                        {show ? "✕ Close" : "+ Add Lecture"}
                                    </button>
                                )}
                            </div>

                            {/* Admin Add Lecture Form */}
                            {show && (
                                <div className="p-4 border-b border-gray-200 bg-blue-50">
                                    <h3 className="font-bold text-blue-900 mb-3 text-sm">New Lecture</h3>
                                    <form onSubmit={submitHandler} className="flex flex-col gap-3">
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                            className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Description"
                                            value={discription}
                                            onChange={(e) => setDiscription(e.target.value)}
                                            required
                                            className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                                        />
                                        <input
                                            type="file"
                                            accept="video/*"
                                            required
                                            onChange={changeVideoHandler}
                                            className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-sm text-gray-500 file:mr-3 file:bg-blue-800 file:text-white file:border-none file:rounded file:px-2 file:py-1 file:text-xs cursor-pointer"
                                        />
                                        {videoPrev && (
                                            <video src={videoPrev} className="w-full rounded-lg h-28 object-cover" controls />
                                        )}
                                        <button
                                            disabled={btnLoading}
                                            type="submit"
                                            className="bg-blue-800 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm py-2 rounded-lg transition-colors"
                                        >
                                            {btnLoading ? "Uploading..." : "Upload Lecture"}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* Lectures List */}
                            <div className="flex-1 overflow-y-auto">
                                {lectures && lectures.length > 0 ? (
                                    lectures.map((e, i) => {
                                        const isActive = lecture._id === e._id
                                        const isDone = progress[0]?.completedLectures?.includes(e._id)
                                        return (
                                            <div key={e._id} className="border-b border-gray-100">
                                                <div
                                                    onClick={() => fetchLecture(e._id)}
                                                    className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-all ${
                                                        isActive
                                                            ? "bg-blue-800 border-l-4 border-blue-600"
                                                            : "hover:bg-blue-50 border-l-4 border-transparent"
                                                    }`}
                                                >
                                                    {/* Number / Tick */}
                                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                                                        isDone
                                                            ? "bg-green-100 border border-green-500 text-green-600"
                                                            : isActive
                                                            ? "bg-white text-blue-800"
                                                            : "bg-blue-100 text-blue-800"
                                                    }`}>
                                                        {isDone ? <TiTickOutline size={14} /> : i + 1}
                                                    </div>

                                                    {/* Title */}
                                                    <span className={`text-sm flex-1 leading-tight font-medium ${
                                                        isActive
                                                            ? "text-white"
                                                            : isDone
                                                            ? "text-gray-500"
                                                            : "text-gray-800"
                                                    }`}>
                                                        {e.title}
                                                    </span>

                                                    {isActive && (
                                                        <span className="text-[10px] bg-white/20 text-white border border-white/30 rounded px-1.5 py-0.5 font-semibold">
                                                            PLAYING
                                                        </span>
                                                    )}
                                                </div>

                                                {user && user.userType === "admin" && (
                                                    <div className="px-4 pb-2">
                                                        <button
                                                            onClick={() => deleteHandler(e._id)}
                                                            className="text-xs text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-2 py-0.5 rounded transition-colors"
                                                        >
                                                            🗑 Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-16 text-center">
                                        <span className="text-4xl mb-3">📭</span>
                                        <p className="text-gray-500 font-semibold">Koi lecture nahi hai abhi</p>
                                    </div>
                                )}
                            </div>

                            {/* ── Quiz / Certificate Section ── */}
                            {allCompleted && (
                                <div className="border-t-2 border-blue-200 p-4 bg-white">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-5 h-5 rounded-full bg-green-100 border border-green-500 text-green-600 text-[10px] flex items-center justify-center font-bold">✓</span>
                                        <p className="text-xs font-bold text-green-700">Sab Lectures Complete!</p>
                                    </div>

                                    {/* Score — attempt ke baad dikhao */}
                                    {(quizStatus === "attempted_pass" || quizStatus === "attempted_fail") && (
                                        <p className="text-xs text-gray-600 mb-3">
                                            🎯 Score: <span className="text-blue-800 font-bold">{attemptData?.score}%</span>
                                        </p>
                                    )}

                                    {/* Take Quiz — sirf pehli baar */}
                                    {quizStatus === "available" && (
                                        <button
                                            onClick={handleTakeQuiz}
                                            disabled={generating}
                                            className="w-full py-3 rounded-xl bg-blue-800 hover:bg-blue-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm transition-all shadow-md mb-2"
                                        >
                                            {generating ? "⏳ AI Quiz Bana Raha Hai..." : "📝 Take Quiz"}
                                        </button>
                                    )}

                                    {/* Certificate + Retry — attempt ke baad hamesha */}
                                    {(quizStatus === "attempted_pass" || quizStatus === "attempted_fail") && (
                                        <div className="flex flex-col gap-2">
                                            <button
                                                onClick={() => setShowCert(true)}
                                                className="w-full py-3 rounded-xl bg-blue-800 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm transition-all shadow-md border-2 border-yellow-400"
                                            >
                                                🏆 Get Your Certificate
                                            </button>
                                            <button
                                                onClick={handleTakeQuiz}
                                                disabled={generating}
                                                className="w-full py-2.5 rounded-xl border-2 border-blue-800 text-blue-800 hover:bg-blue-50 active:scale-95 disabled:opacity-60 font-bold text-sm transition-all"
                                            >
                                                {generating ? "⏳ Generating..." : "🔄 Retry Quiz"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showQuiz && quizData && (
                <QuizModal
                    quiz={quizData}
                    onSubmit={handleQuizSubmit}
                    onClose={() => setShowQuiz(false)}
                />
            )}

            {showCert && (
                <CertificateModal
                    userName={user?.name}
                    courseName={courseTitle || "Course"}
                    score={attemptData?.score}
                    date={new Date(attemptData?.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "long", year: "numeric"
                    })}
                    onClose={() => setShowCert(false)}
                />
            )}
        </>
    )
}

export default Lecture