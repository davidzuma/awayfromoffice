'use client'

import React, { useState } from 'react'
import { Plane, MapPin, Clock, Calendar, Users, ArrowRight } from 'lucide-react'
import TravelPlanner from '@/components/TravelPlanner'

export default function Home() {
  const [showPlanner, setShowPlanner] = useState(false)

  if (showPlanner) {
    return <TravelPlanner />
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <Plane className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Away From Office
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Already have your destination and dates confirmed? Get your complete pre-arrival and post-arrival guide with AI
            </p>
            <button
              onClick={() => setShowPlanner(true)}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Plan My Trip
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                For Travelers with Confirmed Destinations
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Optimize your trip with smart pre-arrival preparation guides and post-arrival strategies
              </p>
            </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pre-Arrival Guide</h3>
              <p className="text-gray-600">Final preparation, packing strategies and personalized cultural briefing</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Post-Arrival Plan</h3>
              <p className="text-gray-600">First 72 hours optimized according to your travel purpose</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Updated Information</h3>
              <p className="text-gray-600">Real-time data on weather, transportation and local events</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Group Customized</h3>
              <p className="text-gray-600">Recommendations adapted to your group size and purpose</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Optimize Your Travel Experience?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of travelers who trust Away From Office for smart planning
          </p>
          <button
            onClick={() => setShowPlanner(true)}
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  )
}
