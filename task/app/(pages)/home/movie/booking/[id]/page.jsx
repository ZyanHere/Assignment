"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/home/Header";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || (typeof window !== 'undefined' ? (window.location.origin.includes('localhost') ? 'http://localhost:4000' : window.location.origin) : 'http://localhost:4000');
const API = (p) => `${API_BASE}/lmd/api/v1${p}`;

export default function BookingDetailsPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useMemo(() => (typeof window !== 'undefined' ? localStorage.getItem('customer_access_token') || localStorage.getItem('admin_token') : ''), []);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const r = await fetch(API(`/movies/seats/bookings/${id}`), { headers });
        const d = await r.json();
        if (!r.ok || !d?.success) throw new Error(d?.message || 'Failed to load booking');
        setData(d.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    if (id) run();
  }, [id, token]);

  return (
    <div className="flex-1">
      <Header />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
        {loading && <p>Loading...</p>}
        {!token && <p className="text-yellow-600 mb-2">Please login to view your booking details.</p>}
        {error && <p className="text-red-500">{error.message}</p>}
        {data && (
          <div className="space-y-2">
            <div className="font-medium">Booking ID: {data.bookingId}</div>
            <div>Movie: {data.movie?.title}</div>
            <div>Theater: {data.theater?.name}</div>
            <div>Screen: {data.screen?.name}</div>
            <div>Seats: {data.seats?.map((s)=> s.seatNumber).join(', ')}</div>
            <div>Total Amount: ₹{data.totalAmount}</div>
            <div>Status: {data.status} • Payment: {data.paymentStatus}</div>
          </div>
        )}
      </div>
    </div>
  );
}


