# Resume Feedback App

A Next.js application that uses Google's Gemini 2.0 Flash model to analyze resumes and provide detailed feedback. Upload your PDF resume and get instant, AI-powered feedback on format, content, strengths, and areas for improvement.

Check the app at [Resume Feedback App](https://resume-feedback-app.vercel.app/).

## Features

- PDF resume upload and validation
- AI-powered resume analysis using Google Gemini Pro Vision
- Detailed feedback on:
  - Overall presentation and format
  - Content effectiveness and impact
  - Key strengths
  - Areas for improvement

## Tech Stack

- Next.js 14
- React
- Google Generative AI SDK
- Tailwind CSS
- Vercel (deployment)

## Prerequisites

- Node.js 18.17 or later
- Google AI API key (Gemini Pro Vision access)
- NPM or Yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Meet1903/Resume-Feedback-App.git
cd resume-feedback-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add:
```
GOOGLE_AI_API_KEY=your_api_key_here
```

4. Install shadcn/ui:
```bash
npx shadcn@latest init
```
Choose your preferred style options when prompted.

5. Add required shadcn/ui components:
```bash
npx shadcn@latest add alert
```

## Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The app is configured for deployment on Vercel. To deploy:

1. Push your code to a GitHub repository
2. Connect the repository to Vercel
3. Add your `GOOGLE_AI_API_KEY` to Vercel's environment variables
4. Deploy!

## File Structure

```
resume-feedback-app/
├── app/
│   ├── api/
│   │   └── upload/
│   │       └── route.js
│   └── page.tsx
├── components/
│   └── ui/
├── public/
├── .env.local
├── vercel.json
└── package.json
```

## Support

For support, email meet.diwan@nyu.edu or open an issue in the GitHub repository.