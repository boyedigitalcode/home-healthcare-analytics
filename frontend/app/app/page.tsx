'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AppDashboard() {
  const [patients, setPatients] = useState<number | null>(null)
  const [visits, setVisits] = useState<number | null>(null)
  const [clinicians, setClinicians] = useState<number | null>(null)
  const [branches, setBranches] = useState<number | null>(null)

  useEffect(() => {
    const fetchKPIs = async () => {
      const [{ count: p }, { count: v }, { count: c }, { count: b }] =
        await Promise.all([
          supabase.from('patients').select('*', { count: 'exact', head: true }),
          supabase
            .from('visits')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'completed'),
          supabase.from('clinicians').select('*', { count: 'exact', head: true }),
          supabase.from('branches').select('*', { count: 'exact', head: true })
        ])

      setPatients(p ?? 0)
      setVisits(v ?? 0)
      setClinicians(c ?? 0)
      setBranches(b ?? 0)
    }

    fetchKPIs()
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-6 font-semibold text-lg">
          Home Health Analytics
        </div>

        <nav className="px-4 space-y-2 text-sm">
          <div className="p-2 rounded bg-gray-100">Dashboard</div>
          <div className="p-2 rounded hover:bg-gray-100 cursor-pointer">Patients</div>
          <div className="p-2 rounded hover:bg-gray-100 cursor-pointer">Clinicians</div>
          <div className="p-2 rounded hover:bg-gray-100 cursor-pointer">Finance</div>
          <div className="p-2 rounded hover:bg-gray-100 cursor-pointer">Reports</div>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">
          Dashboard
        </h1>

        {/* KPI cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KpiCard label="Total Patients" value={patients} />
          <KpiCard label="Completed Visits" value={visits} />
          <KpiCard label="Active Clinicians" value={clinicians} />
          <KpiCard label="Branches" value={branches} />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm h-64 flex items-center justify-center text-gray-400">
          Charts coming next
        </div>
      </main>
    </div>
  )
}

function KpiCard({
  label,
  value
}: {
  label: string
  value: number | null
}) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold mt-2">
        {value === null ? 'Loading…' : value}
      </p>
    </div>
  )
}
