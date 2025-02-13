import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('resume');

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer);

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `Please analyze this resume and provide detailed feedback on:
            1. Overall presentation and format
            2. Content effectiveness and impact
            3. Key strengths
            4. Areas for improvement
            Please be specific and provide actionable suggestions.`;

        const pdf = {
            inlineData: {
                data: Buffer.from(bytes).toString('base64'),
                mimeType: "application/pdf"
            }
        };

        const result = await model.generateContent([prompt, pdf]);
        const response = await result.response;

        return NextResponse.json({
            feedback: response.text()
        });
    } catch (error) {
        console.error('Error processing resume:', error);
        return NextResponse.json(
            { error: 'Failed to process resume' },
            { status: 500 }
        );
    }
}