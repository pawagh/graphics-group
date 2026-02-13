import { NextResponse } from 'next/server';
import pastResearchProjects from '@/data/past-research.json';

export async function GET() {
  return NextResponse.json(pastResearchProjects);
}
