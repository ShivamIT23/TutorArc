import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import WebcamPlayer from "../components/WebcamPlayer"
import { toast } from "sonner"


function StudentPage() {
  const { unique_id } = useParams()
  const navigate = useNavigate()
  const [session, setSession] = useState<any>(null)
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/session/${unique_id}`)
        if (res.data.message == "Session not found") {
          toast.error("Session not found, please start a new session")
          navigate("/")
        } else {
          setSession(res.data)
        }
      }
      catch (error) {
        toast.error("Error fetching session")
        navigate("/")
      }
    }
    fetchSession()
  }, [unique_id])


  if (!session) return <div>Loading...</div>
  const handleShareSession = () => {
    navigator.clipboard.writeText(session.userurl)
    toast.success("Session URL copied to clipboard")
  }
  return (
    <div className="w-full h-full h-fit" style={{
      background:
        "radial-gradient(1200px 600px at 10% -10%, #1e293b 0%, rgba(17,24,39,0) 60%), radial-gradient(1200px 600px at 110% 110%, #0ea5e9 0%, rgba(17,24,39,0) 60%), #0b1220",
    }}>
      <div className="w-full h-full flex justify-end max-h-[6vh] items-center pt-3 px-3">
        <button className="text-white border border-white rounded-full px-4 py-2 w-fit ml-auto" onClick={handleShareSession}>
          Share Session
        </button>
      </div>
      <WebcamPlayer />
    </div>
  )
}

export default StudentPage