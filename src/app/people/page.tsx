import React from 'react';

export default function People() {
    return (
        <div className="m-20">
            <h1 className="text-3xl font-bold mb-6">People</h1>
            <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded hover:shadow-md transition-shadow">
                    <h2 className="text-xl font-semibold">Person 1</h2>
                    <p>Example detail for person 1.</p>
                </div>
                <div className="p-4 border rounded hover:shadow-md transition-shadow">
                    <h2 className="text-xl font-semibold">Person 2</h2>
                    <p>Example detail for person 2.</p>
                </div>
                <div className="p-4 border rounded hover:shadow-md transition-shadow">
                    <h2 className="text-xl font-semibold">Person 3</h2>
                    <p>Example detail for person 3.</p>
                </div>
                <div className="p-4 border rounded hover:shadow-md transition-shadow">
                    <h2 className="text-xl font-semibold">Person 4</h2>
                    <p>Example detail for person 4.</p>
                </div>
            </div>
        </div>
    );
}
