'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AppDashboard() {
  const [orgCount, setOrgCount] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { count, error } = await supabase
        .from('organizations')
        .select('*', { count: 'exact', head: true })

      if (error) {
        console.error(error)
      } else {
        setOrgCount(count)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">
        Dashboard (MVP)
      </h1>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <p className="text-sm text-gray-600">
          Supabase connection confirmed.
        </p>
        <p className="mt-2">
          Organizations table rows:{' '}
          {orgCount === null ? 'Loading...' : orgCount}
        </p>
      </div>
    </div>
  )
}
