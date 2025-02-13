'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ResumeFeedback() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (event: any) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError('');
        } else {
            setError('Please upload a PDF file');
            setFile(null);
        }
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!file) return;

        try {
            setLoading(true);
            setError('');
            setFeedback('');

            const formData = new FormData();
            formData.append('resume', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 504) {
                    throw new Error(
                        'The analysis took too long. Please try with a smaller PDF or try again later.',
                    );
                }
                throw new Error(data.error || 'Failed to analyze resume');
            }
            setFeedback(data.feedback);
        } catch (err: any) {
            setError(
                err.message || 'Error analyzing resume. Please try again.',
            );
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">
                Resume Feedback Generator
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium">
                        Upload your resume (PDF)
                    </label>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
                    />
                </div>

                <button
                    type="submit"
                    disabled={!file || loading}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md
            hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {loading ? 'Analyzing...' : 'Get Feedback'}
                </button>
            </form>

            {error && (
                <Alert variant="destructive" className="mt-6">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {feedback && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">
                        Resume Feedback
                    </h2>
                    <div className="space-y-4 text-gray-700">
                        <ReactMarkdown>{feedback}</ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    );
}
