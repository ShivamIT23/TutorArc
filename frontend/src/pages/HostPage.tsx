import { Play, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

interface Session {
  unique_id: string
  type: string
  userurl: string
}

function HostPage() {

  const navigate = useNavigate()

  const handleStartSession = async () => {
    if (prevSession) {
        localStorage.removeItem("session")
        setPrevSession(null)
    }

    const res = await axios.post("https://api.shivam23.me/api/start-session");
    console.log(res.data.unique_id)
    localStorage.setItem("session", JSON.stringify(res.data))
    navigate(`/session/${res.data.unique_id}`)
  }

  const handleContinueSession = async () => {
    navigate(`/session/${prevSession?.unique_id}`)
  }

  const [prevSession, setPrevSession] = useState<Session | null>(null)
  useEffect(() => {
    const session = localStorage.getItem("session")
    if (session) {
      setPrevSession(JSON.parse(session) as Session)
    }
  }, [])

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-40 animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-40 animate-pulse animation-delay-2000" />
        </div>

        <div className="relative z-10 text-center space-y-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-4">
            <Sparkles size={16} />
            <span className="text-sm font-medium">Premium Video Experience</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Begin Your Session
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Experience seamless video playback with professional-grade controls. Enjoy stunning quality and
              intuitive navigation.
            </p>
          </div>

          <button
            onClick={handleStartSession}
            className="group relative px-8 py-4 text-lg font-semibold text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-100 group-hover:opacity-110 transition-opacity" />

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            </div>

            <div className="relative flex items-center gap-3 justify-center">
              <Play size={24} className="fill-current" />
              <span>START SESSION</span>
            </div>
          </button>
          {prevSession && <button
            onClick={handleContinueSession}
            className="group relative px-8 ml-3 py-4 text-lg font-semibold text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-white opacity-100 group-hover:opacity-110 transition-opacity" />

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            </div>

            <div className="relative flex items-center gap-3 justify-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              <Play size={24} className="text-primary group-hover:text-accent transition-colors" />
              <span>Continue SESSION</span>
            </div>
          </button>}

          <div className="grid grid-cols-3 gap-6 pt-12 text-sm">
            {[
              { label: "4K Support", value: "Ultra HD" },
              { label: "Controls", value: "Full Suite" },
              { label: "Quality", value: "Adaptive" },
            ].map((feature) => (
              <div key={feature.label} className="space-y-2">
                <p className="text-muted-foreground">{feature.label}</p>
                <p className="font-semibold text-foreground">{feature.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default HostPage
