# Away From Office - Travel Planner

A Next.js travel planning application that uses the Perplexity API to provide comprehensive travel guidance for before departure and after arrival at your destination.

---

## Updated Features (2025)

- **English-Only UI**: The entire application interface and all AI prompts are now in English.
- **Confirmed Destination & Dates Only**: The app is focused exclusively on users who already have a destination and travel dates.
- **Pre-Arrival & Post-Arrival Guidance**: Get actionable, AI-powered guidance for both before and after arrival at your destination.
- **Modern Markdown Output**: All AI-generated content is rendered with full markdown support for better readability.
- **Robust Perplexity Integration**: Improved backend parsing ensures no repeated or broken sections in the travel plan output.

## How to Use (2025)

1. **Enter Travel Details**
   - Destination
   - Arrival date
   - Departure date
   - Travel purpose
   - Group size
2. **Generate Your Plan**
   - Click "Generate Personalized Guide"
   - Review your Pre-Arrival, Post-Arrival, and Essential Info tabs
3. **Enjoy Clean, Actionable Output**
   - All sections are formatted and free of repetition or broken content

---

## Features

- 🎯 **Pre-Departure Planning**: Get weather forecasts, packing lists, document requirements, and cultural insights
- 🗺️ **Post-Arrival Guide**: Immediate help with transportation, local attractions, food, and cultural norms
- 🌤️ **Weather Integration**: Real-time weather information and seasonal considerations
- 🔍 **Local Insights**: Insider tips, hidden gems, and local experiences
- 📱 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 🤖 **AI-Powered**: Leverages Perplexity AI for up-to-date travel information

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   - Your Perplexity API key is already configured in the `.env` file
   - Make sure the `.env` file contains:
     ```
     PPX_API_KEY='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'
     ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **Open the Application**
   - Navigate to `http://localhost:3000`
   - Start planning your trip!

## API Integration

The application uses the Perplexity API to provide:
- Real-time weather information
- Current local events and festivals
- Up-to-date transportation options
- Recent cultural insights and tips
- Current pricing and availability information

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **Perplexity AI**: AI-powered search and information retrieval

## Project Structure

```
awayfromoffice/
├── app/
│   ├── api/travel-plan/route.ts    # API endpoint for Perplexity integration
│   ├── globals.css                 # Global styles
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Home page
├── components/
│   └── TravelPlanner.tsx          # Main travel planning component
├── .env                           # Environment variables
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.