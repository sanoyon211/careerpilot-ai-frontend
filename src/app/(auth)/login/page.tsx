"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/common/Button"
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react"
import { useLoginMutation, useSocialLoginMutation } from "@/redux/api/authApi"
import { useAppDispatch } from "@/redux/hooks"
import { setCredentials } from "@/redux/slices/authSlice"
import { auth } from "@/firebase/firebase.config"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { toast } from "sonner"
import { baseApi } from "@/redux/api/baseApi"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation()
  const [socialLogin, { isLoading: isSocialLoading }] = useSocialLoginMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")
    
    toast.promise(
      login({ email, password }).unwrap(),
      {
        loading: 'Signing in...',
        success: (response) => {
          dispatch(baseApi.util.resetApiState()) // Clear any stale cache
          dispatch(setCredentials({
            user: response.data.user,
            accessToken: response.data.accessToken
          }))
          document.cookie = `accessToken=${response.data.accessToken}; path=/; max-age=604800; SameSite=Lax`;
          router.push("/dashboard")
          return `Welcome back, ${response.data.user.name}!`
        },
        error: (err) => {
          const msg = err?.data?.message || "Failed to login"
          setErrorMsg(msg)
          return msg
        }
      }
    )
  }

  const handleGoogleLogin = async () => {
    setErrorMsg("")
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      toast.promise(
        socialLogin({
          email: user.email,
          name: user.displayName || "Google User",
          photoURL: user.photoURL,
        }).unwrap(),
        {
          loading: 'Signing in with Google...',
          success: (response) => {
            dispatch(baseApi.util.resetApiState())
            dispatch(setCredentials({
              user: response.data.user,
              accessToken: response.data.accessToken
            }))
            document.cookie = `accessToken=${response.data.accessToken}; path=/; max-age=604800; SameSite=Lax`;
            router.push("/dashboard")
            return `Welcome back, ${response.data.user.name}!`
          },
          error: (err) => {
            const msg = err.message || err.data?.message || "Failed to login with Google"
            setErrorMsg(msg)
            return msg
          }
        }
      )
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to initialize Google login")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute top-[80%] right-[5%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-card border rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block mb-4">
                <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  CareerPilot AI
                </span>
              </Link>
              <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
              <p className="text-sm text-muted-foreground mt-2">
                Enter your credentials to access your account
              </p>
            </div>
            {errorMsg && (
              <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md mb-4 text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <Button type="submit" disabled={isLoading} className="flex-1 gap-2">
                  <LogIn className="h-4 w-4" /> {isLoading ? "Signing in..." : "Sign In"}
                </Button>
                <Button 
                  type="button" 
                  variant="secondary"
                  disabled={isLoading} 
                  className="flex-1 gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setEmail("johndoe@example.com");
                    setPassword("password123");
                    // We can just set them, user can then click Sign In, or we can auto submit
                  }}
                >
                  Demo Credentials
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="outline" type="button" className="w-full" onClick={handleGoogleLogin} disabled={isSocialLoading || isLoading}>
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Google
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-muted/50 p-4 text-center border-t text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-primary hover:underline inline-flex items-center">
              Sign up <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
