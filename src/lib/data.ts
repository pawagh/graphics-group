import fs from 'fs';
import path from 'path';
import type { Person, Publication, ResearchProject, NewsItem } from './types';

function readJSON<T>(filename: string): T[] {
  const filepath = path.join(process.cwd(), 'data', filename);
  const content = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(content) as T[];
}

export function getPeople(): Person[] {
  return readJSON<Person>('people.json');
}

export function getPeopleByRole(): Record<string, Person[]> {
  const people = getPeople();
  const grouped: Record<string, Person[]> = {};
  for (const person of people) {
    if (!grouped[person.role]) grouped[person.role] = [];
    grouped[person.role].push(person);
  }
  return grouped;
}

export function getPublications(): Publication[] {
  const pubs = readJSON<Publication>('publications.json');
  return pubs.sort((a, b) => b.year - a.year);
}

export function getPublicationsByYear(): Record<number, Publication[]> {
  const pubs = getPublications();
  const grouped: Record<number, Publication[]> = {};
  for (const pub of pubs) {
    if (!grouped[pub.year]) grouped[pub.year] = [];
    grouped[pub.year].push(pub);
  }
  return grouped;
}

export function getPublicationById(id: string): Publication | undefined {
  return getPublications().find(p => p.id === id);
}

export function getResearch(): ResearchProject[] {
  const projects = readJSON<ResearchProject>('research.json');
  return projects.sort((a, b) => {
    if (a.active !== b.active) return a.active ? -1 : 1;
    return a.order - b.order;
  });
}

export function getResearchById(id: string): ResearchProject | undefined {
  return getResearch().find(r => r.id === id);
}

export function getNews(): NewsItem[] {
  const news = readJSON<NewsItem>('news.json');
  return news.sort((a, b) => b.date.localeCompare(a.date));
}
