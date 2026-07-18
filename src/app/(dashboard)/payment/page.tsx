"use client"

import { useState } from "react"
import { CreditCard, ShieldCheck, Sparkles, Check } from "lucide-react"
import { Button } from "@/components/common/Button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function PaymentMockupPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const handlePayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      toast.success("Payment successful!", {
        description: "Your job has been promoted to Premium."
      })
      router.push("/manage-jobs")
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Promote Your Job Post</h1>
        <p className="text-muted-foreground">Reach 10x more top-tier candidates with Premium AI Matching.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Plan Details */}
        <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Premium Job Boost</h2>
              <p className="text-sm text-primary font-semibold">$49.00 / job</p>
            </div>
          </div>
          
          <ul className="space-y-4">
            {["Featured at the top of search results", "AI-powered candidate matching", "Highlighted 'Premium' badge", "Instant alerts to top 5% matched candidates"].map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Checkout Form */}
        <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            <span className="font-medium">Secure Checkout</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Card Information</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="4242 4242 4242 4242" 
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                  defaultValue="4242 4242 4242 4242"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Expiry Date</label>
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  className="w-full px-3 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                  defaultValue="12/28"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">CVC</label>
                <input 
                  type="text" 
                  placeholder="123" 
                  className="w-full px-3 py-2.5 rounded-lg border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                  defaultValue="123"
                />
              </div>
            </div>

            <div className="pt-4 space-y-4 border-t mt-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span>$49.00</span>
              </div>
              <Button 
                className="w-full" 
                size="lg" 
                onClick={handlePayment} 
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Pay $49.00"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                This is a mockup. No real charges will be made.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
