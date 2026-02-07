'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'

export default function AppDashboard() {
  const router = useRouter()

  const [kpis, setKpis] = useState({
    patients: 0,
    visits: 0,
    clinicians: 0,
    branches: 0
  })

  useEffect(() => {
    const fetchKPIs = async () => {
      const results = await Promise.all([
        supabase.from('patients').select('*', { count: 'exact', head: true }),
        supabase
          .from('visits')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'completed'),
        supabase.from('clinicians').select('*', { count: 'exact', head: true }),
        supabase.from('branches').select('*', { count: 'exact', head: true })
      ])

      const realDataExists = results.some(r => (r.count ?? 0) > 0)

      if (realDataExists) {
        setKpis({
          patients: results[0].count ?? 0,
          visits: results[1].count ?? 0,
          clinicians: results[2].count ?? 0,
          branches: results[3].count ?? 0
        })
      } else {
        setKpis({
          patients: 128,
          visits: 1342,
          clinicians: 42,
          branches: 6
        })
      }
    }

    fetchKPIs()
  }, [])

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="px-6 py-5 border-b">
          <div className="text-lg font-semibold text-gray-900">
            Home Health Analytics
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Executive Dashboard
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 text-sm">
          <SidebarItem label="Dashboard" active onClick={() => router.push('/app')} />
          <SidebarItem label="Patients" onClick={() => router.push('/app/patients')} />
          <SidebarItem label="Clinicians" onClick={() => router.push('/app/clinicians')} />
          <SidebarItem label="Finance" onClick={() => router.push('/app/finance')} />
          <SidebarItem label="Reports" onClick={() => router.push('/app/reports')} />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        
        {/* Header */}
        <div className="px-10 py-6 border-b bg-white">
          <h1 className="text-2xl font-semibold text-gray-900">
            Performance Overview
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Key operational and clinical metrics for your agency
          </p>
        </div>

        {/* Content */}
        <div className="px-10 py-8">
          
          {/* KPIs */}
          <div className="grid grid-cols-4 gap-6 mb-12">
            <KpiCard title="Total Patients" value={kpis.patients} />
            <KpiCard title="Completed Visits" value={kpis.visits} />
            <KpiCard title="Active Clinicians" value={kpis.clinicians} />
            <KpiCard title="Branches" value={kpis.branches} />
          </div>

          {/* Chart placeholder */}
          <div className="bg-white rounded-xl h-[420px] shadow-sm flex items-center justify-center text-gray-400">
            Charts and insights will appear here
          </div>

        </div>
      </main>
    </div>
  )
}

function SidebarItem({
  label,
  active,
  onClick
}: {
  label: string
  active?: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-md font-medium ${
        active
          ? 'bg-blue-50 text-blue-700'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  )
}

function KpiCard({
  title,
  value
}: {
  title: string
  value: number
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="text-sm text-gray-500">
        {title}
      </div>
      <div className="text-3xl font-semibold text-gray-900 mt-3">
        {value.toLocaleString()}
      </div>
    </div>
  )
}
