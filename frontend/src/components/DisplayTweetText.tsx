import React, { useState } from 'react'
import { Copy, Check, Twitter } from "lucide-react";

const tweets = ["Kamala Harris's new policy on education reform is impressive.",
    "Donald Trump's latest speech on the economy was well-received.",
    "Jill Stein's environmental policies are a step in the right direction.",
    "Robert Kennedy's independent run brings fresh perspectives to the race.",
    "Chase Oliver's stance on gun rights is unwavering.",
    'Kamala Harris is making strides in healthcare accessibility.',
    "Trump's tax cuts are benefiting small businesses.",
    'Jill Stein promotes the adoption of electric vehicles to combat pollution.',
    "Robert Kennedy's policies blend diverse ideological perspectives.",
    "Chase Oliver's economic plans focus on maximizing individual choice.",
    'Kamala Harris continues to advocate for affordable housing solutions.',
    "Trump's economic policies are under scrutiny from various sectors.",
    'Jill Stein is leading the charge on climate change legislation.',
    'Robert Kennedy offers a unique perspective outside the mainstream parties.',
    'Chase Oliver advocates for the protection of gun rights.',
    'Kamala Harris is addressing wage gaps in her latest policy proposal.',
    "Trump's tax cuts are seen as favoring the wealthy.",
    'Jill Stein promotes the use of electric vehicles to lower emissions.',
    "Robert Kennedy's policies blend diverse ideological perspectives.",
    "Chase Oliver's economic plans focus on maximizing individual choice.",
    'Kamala Harris continues to inspire with her leadership.',
    "Trump's trade approach is creating new international dynamics.",
    "Jill Stein's solar energy plans are set to revolutionize the sector.",
    'Robert Kennedy remains neutral on several contentious issues.',
    'Chase Oliver is strengthening his support among libertarians.',
    "Kamala Harris's foreign policy initiatives are gaining global recognition.",
    "Trump's healthcare policies continue to divide the nation.",
    'Jill Stein is advocating for zero-waste cities nationwide.',
    'Robert Kennedy is emphasizing the need for bipartisan cooperation.',
    'Chase Oliver supports eliminating the IRS to enhance personal freedoms.',
    "Kamala Harris's climate change initiatives are setting new goals.",
    "Trump's latest tax reforms are criticized for corporate favoritism.",
    "Jill Stein's policies aim to make urban areas more sustainable.",
    "Robert Kennedy's independent stance is attracting a diverse electorate.",
    "Chase Oliver's commitment to liberty is resonating with many voters.",
    "Jill Stein's new recycling initiative is receiving widespread praise.",
    'Kamala Harris is rolling out new education reforms aimed at inclusivity.',
    "Trump's trade agreements are boosting certain American industries.",
    'Robert Kennedy is working to unite various voter factions.',
    "Chase Oliver's advocacy for free speech is gaining momentum.",
    "Kamala Harris's healthcare policies are making significant impacts.",
    "Trump's tax reforms are encouraging business investments.",
    'Jill Stein envisions a sustainable future with green technologies.',
    'Robert Kennedy maintains a balanced stance on controversial issues.',
    'Chase Oliver is a strong advocate for individual rights and freedoms.',
    'Kamala Harris is a symbol of progressive leadership.',
    "Trump's economic strategies are showing mixed results.",
    "Jill Stein's solar projects are leading the way in renewable energy.",
    'Robert Kennedy offers pragmatic solutions outside the party lines.',
    'Chase Oliver is expanding his base among libertarian voters.']



const DisplayTweetText = () => {
    const [page, setPage] = useState(1);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const tweetsPerPage = 10;

    const startIndex = (page - 1) * tweetsPerPage;
    const currentTweets = tweets.slice(startIndex, startIndex + tweetsPerPage);
    const totalPages = Math.ceil(tweets.length / tweetsPerPage);

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000); // ترجع للأيقونة الأصلية بعد ثانيتين
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md font-sans">
            <div className="flex space-x-2 items-center mb-6">
                <Twitter className='text-blue-400 w-7 h-7' />
                <h2 className="text-2xl font-bold text-gray-800">  Tweets de Test pour le Modèle            </h2>
            </div>
            <ul className="space-y-4">
                {currentTweets.map((tweet, idx) => {
                    const absoluteIndex: number = startIndex + idx;
                    return (
                        <li
                            key={absoluteIndex}
                            className="bg-white p-4 rounded shadow flex justify-between items-center"
                        >
                            <p className="text-gray-900 flex-1 pr-4">{tweet}</p>
                            <button
                                onClick={() => copyToClipboard(tweet, absoluteIndex)}
                                className=" cursor-pointer text-gray-500 hover:text-blue-600 transition-colors"
                                title="Copy tweet"
                            >
                                {copiedIndex === absoluteIndex ? (
                                    <Check className="h-6 w-6 text-green-500" />
                                ) : (

                                    <Copy className="h-6 w-6" />
                                )}
                            </button>
                        </li>
                    );
                })}
            </ul>

            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-4">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className=" cursor-pointer px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="px-4 py-2 text-gray-700">
                    Page {page} / {totalPages}
                </span>
                <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="cursor-pointer px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DisplayTweetText;
