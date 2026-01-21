'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface Member {
  id: string
  name: string | null
  email: string
  role: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [pendingMembers, setPendingMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'pending' | 'active'>('pending')

  useEffect(() => {
    fetchMembers()
  }, [])

  async function fetchMembers() {
    setIsLoading(true)
    try {
      const [pendingRes, activeRes] = await Promise.all([
        fetch('/api/members?status=pending'),
        fetch('/api/members?status=active'),
      ])

      if (pendingRes.ok) {
        const pending = await pendingRes.json()
        setPendingMembers(pending)
      }

      if (activeRes.ok) {
        const active = await activeRes.json()
        setMembers(active)
      }
    } catch (error) {
      console.error('Error fetching members:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function approveMember(id: string) {
    try {
      const res = await fetch(`/api/members/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: true }),
      })

      if (res.ok) {
        fetchMembers()
      }
    } catch (error) {
      console.error('Error approving member:', error)
    }
  }

  async function rejectMember(id: string) {
    if (!confirm('Are you sure you want to reject and delete this member request?')) {
      return
    }

    try {
      const res = await fetch(`/api/members/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchMembers()
      }
    } catch (error) {
      console.error('Error rejecting member:', error)
    }
  }

  async function deactivateMember(id: string) {
    if (!confirm('Are you sure you want to deactivate this member?')) {
      return
    }

    try {
      const res = await fetch(`/api/members/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: false }),
      })

      if (res.ok) {
        fetchMembers()
      }
    } catch (error) {
      console.error('Error deactivating member:', error)
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bronze-500" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-espresso">
          Member Management
        </h1>
        <p className="mt-2 text-warm-600">
          Approve pending registrations and manage active members
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-warm-200">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === 'pending'
              ? 'text-bronze-600'
              : 'text-warm-500 hover:text-warm-700'
          }`}
        >
          Pending Requests
          {pendingMembers.length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-bronze-500 text-white rounded-full">
              {pendingMembers.length}
            </span>
          )}
          {activeTab === 'pending' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-bronze-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 font-medium transition-colors relative ${
            activeTab === 'active'
              ? 'text-bronze-600'
              : 'text-warm-500 hover:text-warm-700'
          }`}
        >
          Active Members
          <span className="ml-2 text-warm-400">({members.length})</span>
          {activeTab === 'active' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-bronze-500" />
          )}
        </button>
      </div>

      {/* Pending Members */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {pendingMembers.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-warm-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-espresso">
                  No pending requests
                </h3>
                <p className="mt-2 text-warm-500">
                  All member registration requests have been processed.
                </p>
              </CardContent>
            </Card>
          ) : (
            pendingMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-espresso">
                        {member.name || 'No name provided'}
                      </h3>
                      <p className="text-sm text-warm-600">{member.email}</p>
                      <p className="text-xs text-warm-400 mt-1">
                        Registered: {formatDate(member.createdAt)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => approveMember(member.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => rejectMember(member.id)}
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Active Members */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {members.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-warm-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-espresso">
                  No active members
                </h3>
                <p className="mt-2 text-warm-500">
                  Approved members will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Active Members</CardTitle>
                <CardDescription>
                  Members with access to the SABMA Registry
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-warm-100">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                    >
                      <div>
                        <h3 className="font-medium text-espresso">
                          {member.name || 'No name provided'}
                        </h3>
                        <p className="text-sm text-warm-600">{member.email}</p>
                        <p className="text-xs text-warm-400 mt-1">
                          Member since: {formatDate(member.createdAt)}
                        </p>
                      </div>
                      <Button
                        onClick={() => deactivateMember(member.id)}
                        variant="outline"
                        size="sm"
                        className="text-warm-500 hover:text-red-600 hover:border-red-300"
                      >
                        Deactivate
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
