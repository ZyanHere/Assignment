"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Header from "@/components/home/Header"
import toast from "react-hot-toast"
import {
  initializeCashfree,
  createCashfreePaymentConfig,
  handleCashfreePaymentResponse,
  processCashfreeCheckout,
  getCashfreeEnvironment,
} from "@/lib/utils/cashfree"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Lock, Ticket, CreditCard, Store, Film, CircleHelp } from "lucide-react"
import { cn } from "@/lib/utils"

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (typeof window !== "undefined"
    ? window.location.origin.includes("localhost")
      ? "http://localhost:4000"
      : window.location.origin
    : "http://localhost:4000")

const API = (p) => `${API_BASE}/lmd/api/v1${p}`

export default function ShowSeatPage() {
  const params = useParams()
  const id = params?.id
  const router = useRouter()

  const [seatData, setSeatData] = useState(null)
  const [selected, setSelected] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [lockInfo, setLockInfo] = useState(null)

  const token = useMemo(
    () =>
      typeof window !== "undefined"
        ? localStorage.getItem("customer_access_token") || localStorage.getItem("admin_token")
        : "",
    [],
  )

  useEffect(() => {
    const fetchSeats = async () => {
      setIsLoading(true)
      try {
        const r = await fetch(API(`/movies/seats/shows/${id}/seats`))
        const d = await r.json()
        if (!r.ok || !d?.success) throw new Error(d?.message || "Failed to load seats")
        setSeatData(d.data)
      } catch (e) {
        toast.error(e.message)
      } finally {
        setIsLoading(false)
      }
    }
    if (id) fetchSeats()
  }, [id])

  const toggleSeat = (seat) => {
    if (seat.status !== "available") return
    setSelected((prev) => {
      const exists = prev.find((s) => s.id === seat.id)
      if (exists) return prev.filter((s) => s.id !== seat.id)
      return [...prev, seat]
    })
  }

  const lockSeats = async () => {
    if (selected.length === 0) {
      toast.error("Select seats")
      return
    }
    try {
      const r = await fetch(API(`/movies/seats/shows/${id}/seats/lock`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seatIds: selected.map((s) => s.id) }),
      })
      const d = await r.json()
      if (!r.ok || !d?.success) throw new Error(d?.message || "Failed to lock seats")
      setLockInfo(d.data)
      toast.success("Seats locked for a few minutes")
    } catch (e) {
      toast.error(e.message)
    }
  }

  const bookSeats = async () => {
    if (!token) {
      toast.error("Login required")
      return
    }
    if (selected.length === 0) {
      toast.error("Select seats")
      return
    }
    try {
      const r = await fetch(API(`/movies/seats/shows/${id}/seats/book`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          seatIds: selected.map((s) => s.id),
          paymentMethod: "upi",
        }),
      })
      const d = await r.json()
      if (!r.ok || !d?.success) throw new Error(d?.message || "Booking failed")
      toast.success("Booking created")
      router.push(`/home/movie/booking/${d.data.bookingId}`)
    } catch (e) {
      toast.error(e.message)
    }
  }

  const payNow = async () => {
    if (!token) {
      toast.error("Login required")
      return
    }
    if (selected.length === 0) {
      toast.error("Select seats")
      return
    }
    try {
      const r = await fetch(API(`/movies/seats/shows/${id}/seats/book`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          seatIds: selected.map((s) => s.id),
          paymentMethod: "cashfree",
        }),
      })
      const d = await r.json()
      if (!r.ok || !d?.success) throw new Error(d?.error || d?.message || "Booking failed")

      const bookingId = d.data.bookingId
      const amount = d.data.totalAmount

      const pr = await fetch(`/api/payments/cashfree/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
          currency: "INR",
          orderId: `movie_booking_${bookingId}`,
          customerDetails: {},
          orderNote: "Movie ticket booking",
          orderTags: { booking_id: bookingId, show_id: id },
        }),
      })
      const pd = await pr.json()
      if (!pr.ok || pd?.status !== "success") throw new Error(pd?.message || "Failed to initialize Cashfree")

      const cashfree = await initializeCashfree(getCashfreeEnvironment())
      const checkoutOptions = createCashfreePaymentConfig(pd.data, {}, { redirectTarget: "_modal" })
      const result = await processCashfreeCheckout(cashfree, checkoutOptions)
      const processed = handleCashfreePaymentResponse(result, pd.data)
      if (!processed.success) {
        throw new Error(processed.error || "Payment failed")
      }

      const cr = await fetch(API(`/movies/seats/bookings/${bookingId}/confirm-payment`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          transactionId: processed.data.reference_id,
          orderId: pd.data.order_id,
          referenceId: processed.data.reference_id,
          paymentSessionId: pd.data.payment_session_id,
          status: processed.data.payment_status,
          gateway: "cashfree",
          raw: { result, processed },
        }),
      })
      const cd = await cr.json()
      if (!cr.ok || !cd?.success) throw new Error(cd?.error || cd?.message || "Payment confirm failed")

      toast.success("Payment successful")
      router.push(`/home/movie/booking/${bookingId}`)
    } catch (e) {
      toast.error(e.message)
    }
  }

  if (!seatData) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-slate-100">
        <Header />
        <div className="max-w-6xl mx-auto p-6">
          <Card className="border-none shadow-sm bg-white/70 backdrop-blur">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 text-slate-500">
                <Film className="h-5 w-5" />
                <p className="text-sm">{isLoading ? "Loading seats..." : "No data"}</p>
              </div>
              {isLoading && (
                <div className="mt-6 grid gap-3">
                  <div className="h-6 w-48 bg-slate-200/70 rounded animate-pulse" />
                  <div className="h-32 w-full bg-slate-200/70 rounded animate-pulse" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const rows = Array.from(new Set(seatData.seats.map((s) => s.row))).sort((a, b) => a.localeCompare(b))
  const midCol = Math.ceil((seatData.columns || 0) / 2)
  const typeSet = Array.from(new Set(seatData.seats.map((s) => s.type)))
  const priceByType = seatData.pricing || {}

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen bg-[radial-gradient(60%_60%_at_50%_0%,rgba(16,185,129,0.08)_0%,rgba(255,255,255,1)_70%)]">
        <Header />
        <main className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600">
                Select Your Seats
              </h1>
              <p className="text-sm text-slate-500 mt-1">Choose the best view and continue to book or pay now.</p>
            </div>
            <Badge variant="secondary" className="rounded-full text-slate-700 bg-slate-100 border-slate-200">
              <CircleHelp className="h-3.5 w-3.5 mr-1.5" />
              Secure booking
            </Badge>
          </div>

          <Card className="border-slate-200 shadow-[0_2px_30px_-10px_rgba(15,23,42,0.15)] bg-white/80 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-base md:text-lg text-slate-800">Pricing</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                {typeSet.map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="border-slate-200 bg-slate-50/80 text-slate-700 rounded-full px-3 py-1.5 text-sm"
                  >
                    ₹{priceByType?.[t] ?? 0} {t.toUpperCase()}
                  </Badge>
                ))}

                <div className="ml-auto flex items-center gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded border border-slate-300 bg-white shadow-sm" aria-hidden />
                    Available
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded bg-emerald-600 shadow-sm" aria-hidden />
                    Selected
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded bg-yellow-400 shadow-sm" aria-hidden />
                    Locked
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded bg-slate-400 shadow-sm" aria-hidden />
                    Booked
                  </div>
                </div>
              </div>

              <Separator className="my-5" />

              <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                <ScrollArea className="w-full">
                  <div className="min-w-[860px] p-6">
                    <div className="space-y-2 flex flex-col items-center">
                      {rows.map((row) => (
                        <div key={row} className="flex items-center gap-2 w-full justify-center">
                          <div className="w-6 text-[11px] text-slate-500 text-right pr-1">{row}</div>
                          <div className="flex gap-1.5 justify-center w-full">
                            {seatData.seats
                              .filter((s) => s.row === row)
                              .sort((a, b) => a.column - b.column)
                              .map((seat) => {
                                const isSelected = selected.some((s) => s.id === seat.id)
                                const style =
                                  seat.status === "booked"
                                    ? "bg-slate-400 text-white cursor-not-allowed"
                                    : seat.status === "locked"
                                      ? "bg-amber-400 text-slate-900"
                                      : isSelected
                                        ? "bg-emerald-600 text-white ring-1 ring-emerald-700"
                                        : "bg-white text-slate-700 border border-slate-300 hover:bg-emerald-50 hover:border-emerald-400"
                                const addGap = seat.column === midCol

                                const seatEl = (
                                  <button
                                    key={seat.id}
                                    onClick={() => toggleSeat(seat)}
                                    disabled={seat.status !== "available"}
                                    className={cn(
                                      "h-8 w-8 text-[10px] rounded-md flex items-center justify-center transition-colors shadow-sm",
                                      style,
                                      addGap ? "mr-6" : "",
                                    )}
                                    title={`Row ${seat.row} Seat ${seat.column} • ${seat.type} • ₹${seat.price}`}
                                    aria-label={`Seat ${seat.column} in row ${seat.row}, ${seat.type}, ₹${seat.price}, ${seat.status}`}
                                  >
                                    {String(seat.column).padStart(2, "0")}
                                  </button>
                                )

                                return seat.status === "available" ? (
                                  <Tooltip key={seat.id}>
                                    <TooltipTrigger asChild>{seatEl}</TooltipTrigger>
                                    <TooltipContent side="top" className="text-xs">
                                      Row {seat.row} • Seat {seat.column} • {seat.type.toUpperCase()} • ₹{seat.price}
                                    </TooltipContent>
                                  </Tooltip>
                                ) : (
                                  seatEl
                                )
                              })}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 flex justify-center">
                      <div className="w-2/3 text-center">
                        <div className="mx-auto h-2 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full shadow-inner" />
                        <div className="text-[11px] text-slate-500 mt-1 tracking-[0.3em]">SCREEN</div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white/80 backdrop-blur shadow-[0_2px_30px_-10px_rgba(15,23,42,0.15)]">
            <CardContent className="p-4 md:p-5">
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                <div className="text-sm text-slate-700">
                  Selected:
                  <span className="font-medium text-emerald-700 ml-2">
                    {selected.map((s) => s.id).join(", ") || "None"}
                  </span>
                </div>

                <div className="md:ml-auto flex flex-wrap items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={lockSeats}
                    className="border-slate-300 hover:bg-slate-100 bg-transparent"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Lock
                  </Button>
                  <Button onClick={bookSeats} className="bg-amber-400 hover:bg-amber-500 text-slate-900">
                    <Ticket className="h-4 w-4 mr-2" />
                    Book
                  </Button>
                  <Button onClick={payNow} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Now
                  </Button>
                  <Button
                    onClick={async () => {
                      if (!token) {
                        toast.error("Login required")
                        return
                      }
                      if (selected.length === 0) {
                        toast.error("Select seats")
                        return
                      }
                      try {
                        const r = await fetch(API(`/movies/seats/shows/${id}/seats/book`), {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({
                            seatIds: selected.map((s) => s.id),
                            paymentMethod: "pay_at_counter",
                          }),
                        })
                        const d = await r.json()
                        if (!r.ok || !d?.success) throw new Error(d?.error || d?.message || "Booking failed")
                        toast.success("Booking reserved. Pay at counter.")
                        router.push(`/home/movie/booking/${d.data.bookingId}`)
                      } catch (e) {
                        toast.error(e.message)
                      }
                    }}
                    variant="secondary"
                    className="bg-slate-800 hover:bg-slate-900 text-white"
                  >
                    <Store className="h-4 w-4 mr-2" />
                    Pay at Counter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </TooltipProvider>
  )
}
