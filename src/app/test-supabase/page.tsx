'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestConnection() {
    const [status, setStatus] = useState<string>('Testing...')
    const [errorDetails, setErrorDetails] = useState<string | null>(null)

    useEffect(() => {
        const testConnection = async () => {
            try {
                // نستخدم جدول UserInfo بدلاً من expenses لأنه موجود في الـ schema الخاصة بك
                const { data, error } = await supabase.from('UserInfo').select('count', { count: 'exact' })

                if (error) {
                    console.error('Supabase Error:', error)
                    setStatus('Failed')
                    setErrorDetails(error.message)
                } else {
                    console.log('Connection: Success', data)
                    setStatus('Success')
                }
            } catch (err: any) {
                console.error('Unexpected Error:', err)
                setStatus('Failed')
                setErrorDetails(err.message)
            }
        }

        testConnection()
    }, [])

    return (
        <div className="p-8 font-sans">
            <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
            <div className={`p-4 rounded-lg border ${status === 'Success' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'}`}>
                Status: <strong>{status}</strong>
            </div>
            {errorDetails && (
                <div className="mt-4 p-4 bg-gray-100 rounded border border-gray-300 text-sm font-mono whitespace-pre-wrap">
                    Error: {errorDetails}
                </div>
            )}
            <div className="mt-8 text-sm text-gray-500">
                Check your browser console (F12) for more details.
            </div>
        </div>
    )
}
