import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import { server } from "../../main";

const Profile = () => {
  const { user, setUser } = UserData();

  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (user) setName(user.name || "");
  }, [user]);

  const processFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const imageHandler = (e) => processFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  const avatarSrc = preview
    ? preview
    : user?.avatar?.url
    ? `${server}${user.avatar.url}`
    : null;

  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name.trim()) { toast.error("Name cannot be empty"); return; }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", name.trim());
    if (image) formData.append("file", image);

    try {
      const { data } = await axios.put(
        `${server}/api/user/update-profile`,
        formData,
        { headers: { token: localStorage.getItem("token") } }
      );
      setUser(data.user);
      setImage(null);
      toast.success(data.message || "Profile updated!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-white flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-lg">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-blue-100/60 border border-blue-50 overflow-hidden">

          {/* Top banner */}
          <div className="h-24 bg-linear-to-r from-blue-700 to-blue-500 relative">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
            />
          </div>

          <div className="px-6 pb-8">

            {/* Avatar — overlaps banner */}
            <div className="flex flex-col items-center -mt-14 mb-6">
              <label
                htmlFor="avatar-upload"
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`relative cursor-pointer group rounded-full transition-all duration-200
                  ${dragging ? "scale-105 ring-4 ring-blue-400 ring-offset-2" : ""}`}
              >
                {/* Avatar image or initials */}
                <div className={`w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden
                  flex items-center justify-center text-3xl font-black text-white select-none
                  ${!avatarSrc ? "bg-linear-to-br from-blue-600 to-blue-400" : ""}`}
                >
                  {avatarSrc
                    ? <img src={avatarSrc} alt="Avatar" className="w-full h-full object-cover" />
                    : initials
                  }
                </div>

                {/* Edit overlay */}
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100
                  transition-opacity duration-200 flex flex-col items-center justify-center gap-0.5">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/>
                  </svg>
                  <span className="text-white text-xs font-semibold">Change</span>
                </div>

                {/* New badge */}
                {image && (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs font-bold
                    px-2 py-0.5 rounded-full border-2 border-white shadow">
                    New
                  </div>
                )}
              </label>

              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={imageHandler}
                className="hidden"
              />

              <p className="text-xs text-gray-400 mt-2 font-medium">
                Click or drag & drop to change photo
              </p>
              {image && (
                <button
                  type="button"
                  onClick={() => { setImage(null); setPreview(null); }}
                  className="text-xs text-red-400 hover:text-red-600 mt-1 transition-colors font-medium"
                >
                  ✕ Remove new photo
                </button>
              )}
            </div>

            {/* Form */}
            <form onSubmit={submitHandler} className="space-y-4">

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full pl-9 pr-4 py-3 border-2 border-gray-100 rounded-xl text-sm font-medium
                      text-gray-800 bg-gray-50 focus:bg-white focus:border-blue-400 focus:outline-none
                      transition-all duration-200 placeholder-gray-300"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full pl-9 pr-4 py-3 border-2 border-gray-100 rounded-xl text-sm font-medium
                      text-gray-400 bg-gray-50 cursor-not-allowed"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center">
                    <span className="text-xs bg-gray-100 text-gray-400 font-semibold px-2 py-0.5 rounded-full">
                      Fixed
                    </span>
                  </div>
                </div>
              </div>

              {/* Role badge */}
              {user?.role && (
                <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl">
                  <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                  <span className="text-sm text-blue-700 font-semibold capitalize">{user.role}</span>
                  <span className="text-xs text-blue-400 font-medium ml-auto">Verified Account</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed
                  text-white font-bold py-3 rounded-xl transition-all duration-200 text-sm
                  shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5
                  flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    Update Profile
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-4 font-medium">
          Your data is safe 🔒 · Max image size: 5MB
        </p>
      </div>
    </div>
  );
};

export default Profile;