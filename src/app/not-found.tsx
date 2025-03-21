import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-gradient-to-b from-emerald-50 to-white px-4">
      <div className="max-w-md text-center space-y-6 z-20">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-emerald-500/20 blur-xl"></div>
            <div className="relative bg-emerald-100 rounded-full p-4">
              <AlertCircle className="h-16 w-16 text-emerald-600" />
            </div>
          </div>
        </div>

        <h1 className="text-6xl font-bold text-emerald-700">404</h1>
        <h2 className="text-2xl font-semibold text-emerald-800">Page Not Found</h2>

        <p className="text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>

        <div className="pt-4">
          <Link href="/">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer z-50">Back to Home</Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-emerald-100">
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  )
}

