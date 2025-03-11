import React from 'react';

interface Project {
    id: number;
    title: string;
    description: string;
}

const projects: Project[] = [
    { id: 1, title: "Project 1", description: "A brief overview of Project 1." },
    { id: 2, title: "Project 2", description: "A brief overview of Project 2." },
    { id: 3, title: "Project 3", description: "A brief overview of Project 3." },
];

export default function Projects() {
    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold">Projects</h1>
                <p className="text-lg text-gray-600">
                    Welcome to the projects page. Here you’ll find some of our featured projects.
                </p>
            </header>
            <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="border rounded-lg shadow hover:shadow-lg transition p-4"
                    >
                        <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                        <p>{project.description}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}
