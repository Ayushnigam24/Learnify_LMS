import { createContext, useContext, useState } from "react";
import axios from 'axios'
import { server } from "../main";
const UserContext = createContext();
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from "react";

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [isAuth, setIsAuth] = useState(false)
    const [btnLoding, setBtnLoding] = useState(false)
    const [loding, setLoding] = useState(true)

    async function loginUser(email, password, navigate,fetchMyCourse) {
        setBtnLoding(true)
        try {
            const { data } = await axios.post(`${server}/api/user/login`, { email, password })

            toast.success(data.message);
            localStorage.setItem("token", data.token)
            setUser(data.user)
            setIsAuth(true)
            setBtnLoding(false)
            navigate('/')
            fetchMyCourse();
        } catch (error) {
            setBtnLoding(false)
            setIsAuth(false)
            toast.error(error.response.data.message)

        }
    }



    async function registerUser(name, email, password, navigate) {
        setBtnLoding(true)
        try {
            const { data } = await axios.post(`${server}/api/user/register`, { name, email, password })

            toast.success(data.message);
            localStorage.setItem("activationToken", data.activationToken)
            setBtnLoding(false)
            navigate('/verify')
        } catch (error) {
            setBtnLoding(false)
            toast.error(error.response.data.message)

        }
    }

    async function verifyOtp(otp, navigate) {
        setBtnLoding(true)
        const activationToken = localStorage.getItem("activationToken")
        try {
            const { data } = await axios.post(`${server}/api/user/verifyUser`, { otp, activationToken })

            toast.success(data.message);
            navigate('/login')
            setBtnLoding(false)
            localStorage.clear()
        } catch (error) {
            setBtnLoding(false)
            toast.error(error.response.data.message)
        }
    }
    async function fetchUser() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setIsAuth(false);
      setLoding(false);
      return;
    }

    const { data } = await axios.get(`${server}/api/user/me`, {
      headers: {
        token: token, // tumhara backend yahi expect karta hai
      },
    });

    setIsAuth(true);
    setUser(data.user);
  } catch (error) {
    console.log("Fetch user failed:", error);

    // 🔥 MOST IMPORTANT PART
    localStorage.removeItem("token");
    setUser(null);
    setIsAuth(false);
  } finally {
    setLoding(false);
  }
}

   useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    fetchUser();
  } else {
    setLoding(false);
  }
}, []);
    return <UserContext.Provider value={{ user, setUser, isAuth, setIsAuth, loginUser, btnLoding, loding, registerUser ,verifyOtp,fetchUser }}>
        {children}
        <Toaster />
    </UserContext.Provider>
}

export const UserData = () => useContext(UserContext)