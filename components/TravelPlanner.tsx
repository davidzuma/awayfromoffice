'use client'

import React, { useState } from 'react'
import { Search, MapPin, Calendar, Clock, Plane, Car, Home, ArrowLeft, Loader2, Users, Info } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface TravelPlan {
  preArrival: string
  postArrival: string
  weatherInfo: string
  localTips: string
  essentialInfo: string
  transportation: string
}

export default function TravelPlanner() {
  const [destination, setDestination] = useState('')
  const [arrivalDate, setArrivalDate] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [travelPurpose, setTravelPurpose] = useState('')
  const [groupSize, setGroupSize] = useState('1')
  const [loading, setLoading] = useState(false)
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null)
  const [activeTab, setActiveTab] = useState<'pre' | 'post' | 'info'>('pre')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/travel-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination,
          arrivalDate,
          departureDate,
          travelPurpose,
          groupSize,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setTravelPlan(data)
      } else {
        console.error('Failed to fetch travel plan')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetPlanner = () => {
    setTravelPlan(null)
    setDestination('')
    setArrivalDate('')
    setDepartureDate('')
    setTravelPurpose('')
    setGroupSize('1')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={resetPlanner}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Travel Planner</h1>
          <p className="text-gray-600">Optimize your trip with AI-powered personalized guides</p>
        </div>

        {!travelPlan ? (
          /* Planning Form */
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Your Destination is Confirmed
                </h2>
                <p className="text-gray-600">
                  Complete the details to generate your personalized travel guide
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="e.g. Paris, France"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Purpose *
                  </label>
                  <div className="relative">
                    <Info className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <select
                      value={travelPurpose}
                      onChange={(e) => setTravelPurpose(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select purpose</option>
                      <option value="leisure">Tourism/Leisure</option>
                      <option value="business">Business</option>
                      <option value="family">Family Visit</option>
                      <option value="education">Education/Studies</option>
                      <option value="medical">Medical</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Arrival Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departure Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group Size *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <select
                      value={groupSize}
                      onChange={(e) => setGroupSize(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="1">Solo (1 person)</option>
                      <option value="2">Couple (2 people)</option>
                      <option value="3-4">Small group (3-4 people)</option>
                      <option value="5-8">Medium group (5-8 people)</option>
                      <option value="9+">Large group (9+ people)</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Your Travel Guide...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Generate Personalized Guide
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Travel Plan Results */
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-xl p-2">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('pre')}
                  className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-colors ${
                    activeTab === 'pre'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Clock className="w-5 h-5 inline mr-2" />
                  Pre-Arrival
                </button>
                <button
                  onClick={() => setActiveTab('post')}
                  className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-colors ${
                    activeTab === 'post'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <MapPin className="w-5 h-5 inline mr-2" />
                  Post-Arrival
                </button>
                <button
                  onClick={() => setActiveTab('info')}
                  className={`flex-1 py-3 px-4 rounded-lg text-center font-medium transition-colors ${
                    activeTab === 'info'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Info className="w-5 h-5 inline mr-2" />
                  Essential Info
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {activeTab === 'pre' ? (
                <div className="space-y-6">
                  <div className="flex items-center mb-6">
                    <Clock className="w-6 h-6 text-blue-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Pre-Arrival Preparation
                    </h2>
                  </div>
                  
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-gray-900 mb-4" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-xl font-semibold text-gray-800 mb-3" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-lg font-medium text-gray-800 mb-2" {...props} />,
                        p: ({node, ...props}) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                        li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                        em: ({node, ...props}) => <em className="italic text-gray-600" {...props} />,
                        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4" {...props} />,
                        code: ({node, ...props}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono" {...props} />,
                        pre: ({node, ...props}) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto" {...props} />,
                      }}
                    >
                      {travelPlan.preArrival}
                    </ReactMarkdown>
                  </div>

                  <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">
                      Weather Information
                    </h3>
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({node, ...props}) => <p className="mb-3 text-blue-800 leading-relaxed" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-3 space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-3 space-y-1" {...props} />,
                        li: ({node, ...props}) => <li className="text-blue-800" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-semibold text-blue-900" {...props} />,
                      }}
                    >
                      {travelPlan.weatherInfo}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : activeTab === 'post' ? (
                <div className="space-y-6">
                  <div className="flex items-center mb-6">
                    <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Post-Arrival Guide
                    </h2>
                  </div>
                  
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-gray-900 mb-4" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-xl font-semibold text-gray-800 mb-3" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-lg font-medium text-gray-800 mb-2" {...props} />,
                        p: ({node, ...props}) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                        li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                        em: ({node, ...props}) => <em className="italic text-gray-600" {...props} />,
                        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4" {...props} />,
                        code: ({node, ...props}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono" {...props} />,
                        pre: ({node, ...props}) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto" {...props} />,
                      }}
                    >
                      {travelPlan.postArrival}
                    </ReactMarkdown>
                  </div>

                  <div className="mt-8 p-6 bg-green-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">
                      Local Tips
                    </h3>
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({node, ...props}) => <p className="mb-3 text-green-800 leading-relaxed" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-3 space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-3 space-y-1" {...props} />,
                        li: ({node, ...props}) => <li className="text-green-800" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-semibold text-green-900" {...props} />,
                      }}
                    >
                      {travelPlan.localTips}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center mb-6">
                    <Info className="w-6 h-6 text-blue-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Essential Information
                    </h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-purple-50 rounded-lg">
                      <h3 className="text-lg font-semibold text-purple-900 mb-3">
                        Transportation
                      </h3>
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({node, ...props}) => <p className="mb-3 text-purple-800 leading-relaxed" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-3 space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-3 space-y-1" {...props} />,
                          li: ({node, ...props}) => <li className="text-purple-800" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-semibold text-purple-900" {...props} />,
                        }}
                      >
                        {travelPlan.transportation}
                      </ReactMarkdown>
                    </div>
                    
                    <div className="p-6 bg-orange-50 rounded-lg">
                      <h3 className="text-lg font-semibold text-orange-900 mb-3">
                        Essential Services
                      </h3>
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({node, ...props}) => <p className="mb-3 text-orange-800 leading-relaxed" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-3 space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-3 space-y-1" {...props} />,
                          li: ({node, ...props}) => <li className="text-orange-800" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-semibold text-orange-900" {...props} />,
                        }}
                      >
                        {travelPlan.essentialInfo}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={resetPlanner}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Plan Another Trip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
