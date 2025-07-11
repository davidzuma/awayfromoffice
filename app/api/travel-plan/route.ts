import { NextRequest, NextResponse } from 'next/server'

const PPX_API_KEY = process.env.PPX_API_KEY

interface TravelRequest {
  destination: string
  arrivalDate: string
  departureDate: string
  travelPurpose: string
  groupSize: string
}

export async function POST(request: NextRequest) {
  try {
    const { destination, arrivalDate, departureDate, travelPurpose, groupSize }: TravelRequest = await request.json()

    if (!PPX_API_KEY) {
      return NextResponse.json({ error: 'PPX API key not configured' }, { status: 500 })
    }

    // Pre-arrival planning query - focused on preparation before reaching destination
    const preArrivalPrompt = `Create a comprehensive pre-arrival preparation guide for ${groupSize} traveler(s) going to ${destination} for ${travelPurpose}, arriving on ${arrivalDate} and departing on ${departureDate}. Include:

1. Final week checklist before travel
2. Specific packing recommendations for climate and travel purpose
3. Cultural preparation and local etiquette tips
4. Important documents and health/visa requirements
5. Airport transportation planning
6. Safety tips and emergency numbers
7. Useful apps and offline maps to download
8. Local currency and payment methods information

Make it practical and specific for the travel dates.`

    // Post-arrival planning query - focused on immediate needs after arriving
    const postArrivalPrompt = `Create a detailed post-arrival action plan for ${groupSize} traveler(s) who just arrived in ${destination} for ${travelPurpose}. Focus on:

1. First 2 hours after arrival (airport to accommodation)
2. Essential first 24 hours (services, orientation)
3. Priority activities for the first 3 days
4. Cultural integration and important local customs
5. Safety information and emergency procedures
6. Local transportation and getting around
7. Places to eat and local gastronomic experiences
8. Essential services (pharmacy, hospital, ATM)

Prioritize immediate practical needs over tourist attractions.`

    // Essential information query - transportation and services
    const essentialInfoPrompt = `Provide essential information for travelers in ${destination} from ${arrivalDate} to ${departureDate}:

1. Public transportation systems and updated costs
2. Essential services (health, banking, internet, communication)
3. Current weather information and seasonal considerations
4. Local money-saving tips and discounts
5. Cultural events and festivals during these dates
6. Useful mobile apps for the city
7. Tipping customs and social etiquette
8. Emergency contact information and embassies

Focus on practical and current information for these specific dates.`

    // Make API calls to Perplexity
    const headers = {
      'Authorization': `Bearer ${PPX_API_KEY}`,
      'Content-Type': 'application/json',
    }

    const makePerplexityCall = async (prompt: string) => {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: 'sonar',
          messages: [
            {
              role: 'system',
              content: 'You are a knowledgeable travel assistant. Provide detailed, practical, and current travel advice. Format your response in clear sections with actionable information.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1500,
          temperature: 0.2,
          top_p: 0.9,
          stream: false,
          presence_penalty: 0,
          frequency_penalty: 0.1
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Perplexity API error:', response.status, errorText)
        throw new Error(`Perplexity API error: ${response.status}`)
      }

      const data = await response.json()
      return data.choices[0].message.content
    }

    try {
      // Execute all three queries
      const [preArrivalResponse, postArrivalResponse, essentialInfoResponse] = await Promise.all([
        makePerplexityCall(preArrivalPrompt),
        makePerplexityCall(postArrivalPrompt),
        makePerplexityCall(essentialInfoPrompt)
      ])

      // Improved parsing: extract each section by matching numbered headings and their content
      const sectionRegex = /\d+\.\s([\w\s\-\/\(\)]+):?\n?([\s\S]*?)(?=\n\d+\.|$)/g
      const sectionMap: Record<string, string> = {}
      let match
      while ((match = sectionRegex.exec(essentialInfoResponse)) !== null) {
        const title = match[1].trim().toLowerCase()
        sectionMap[title] = match[2].trim()
      }

      const weatherInfo = sectionMap['current weather information and seasonal considerations'] || sectionMap['weather information'] || 'Weather information will be updated based on your travel dates.'
      const localTips = sectionMap['local money-saving tips and discounts'] || sectionMap['local tips'] || 'Local tips and recommendations will be provided.'
      const transportation = sectionMap['public transportation systems and updated costs'] || sectionMap['transportation'] || 'Transportation options will be detailed.'
      const essentialServices = sectionMap['essential services (health, banking, internet, communication)'] || sectionMap['essential services'] || 'Essential services information will be provided.'

      return NextResponse.json({
        preArrival: preArrivalResponse,
        postArrival: postArrivalResponse,
        weatherInfo,
        localTips,
        transportation,
        essentialInfo: essentialServices
      })
    } catch (apiError) {
      console.error('API call failed:', apiError)
      
      // Fallback response with basic information
      return NextResponse.json({
        preArrival: `Pre-arrival preparation for ${destination}:\n\n1. Check weather forecast and pack appropriately\n2. Confirm passport and visa requirements\n3. Exchange currency or ensure card compatibility\n4. Download offline maps and translation apps\n5. Research local customs and cultural etiquette\n6. Book airport transportation\n7. Get travel insurance\n8. Notify bank of travel plans\n9. Pack medications and essential items\n10. Save emergency contacts`,
        postArrival: `Post-arrival guide for ${destination}:\n\n1. Get from airport to accommodation safely\n2. Find nearest ATM and exchange money\n3. Get local SIM card or WiFi access\n4. Locate nearest supermarket and pharmacy\n5. Learn basic public transportation\n6. Find essential services (hospital, police)\n7. Try local cuisine and specialties\n8. Visit main attractions and landmarks\n9. Connect with locals or join tours\n10. Stay safe and aware of surroundings`,
        weatherInfo: `Weather information for ${destination} during your stay will vary by season. Check current forecasts before departure and pack layers for temperature changes.`,
        localTips: `Local tips for ${destination}: Research local customs, tipping practices, and cultural norms. Download helpful apps, learn basic phrases, and ask locals for recommendations.`,
        transportation: `Transportation in ${destination}: Research public transport options, taxi services, and ride-sharing apps. Consider getting a local transport card for convenience.`,
        essentialInfo: `Essential services in ${destination}: Locate hospitals, pharmacies, banks, and tourist information centers. Keep emergency numbers handy and know your embassy contact information.`
      })
    }

  } catch (error) {
    console.error('Error generating travel plan:', error)
    return NextResponse.json(
      { error: 'Failed to generate travel plan' },
      { status: 500 }
    )
  }
}
