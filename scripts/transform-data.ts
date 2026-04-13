/**
 * Transforms scraped telepresence.web.unc.edu data into final schema.
 * Includes hardcoded fallback data extracted from the site to supplement
 * unreliable WordPress HTML parsing.
 *
 * Usage: npx ts-node scripts/transform-data.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Person {
  id: string;
  name: string;
  role: 'faculty' | 'phd' | 'ms' | 'undergrad' | 'postdoc' | 'alumni' | 'visitor';
  title: string;
  email: string;
  photoPath: string;
  bio: string;
  website: string;
  googleScholar: string;
  github: string;
  twitter: string;
  interests: string[];
  alumniYear?: number;
  alumniPosition?: string;
}

interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  abstract: string;
  pdfPath: string;
  pdfUrl: string;
  doi: string;
  semanticScholarId: string;
  bibtex: string;
  keyContributions: string;
  tags: string[];
  featured: boolean;
}

interface ResearchProject {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  tags: string[];
  publicationIds: string[];
  active: boolean;
  order: number;
}

interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  link: string;
  type: 'award' | 'paper' | 'talk' | 'media' | 'hiring' | 'other';
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
}

function personSlug(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    const first = parts[0].replace(/[^a-z]/gi, '').toLowerCase();
    const last = parts[parts.length - 1].replace(/[^a-z]/gi, '').toLowerCase();
    return `${first}-${last}`;
  }
  return slugify(name);
}

const STOPWORDS = new Set([
  'a', 'an', 'the', 'towards', 'learning', 'deep', 'neural',
  'on', 'via', 'for', 'with', 'using', 'from', 'of', 'in',
  'and', 'to', 'by', 'at', 'as', 'or', 'its', 'into',
]);

function publicationSlug(title: string, authors: string[], year: number): string {
  const lastNameRaw = (authors[0] || 'unknown').split(/\s+/).pop() || 'unknown';
  const lastName = lastNameRaw.replace(/[^a-z]/gi, '').toLowerCase();

  const words = title.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
  const keyword = words.find(w => w.length > 2 && !STOPWORDS.has(w)) || words[0] || 'paper';

  return `${lastName}-${year}-${keyword}`;
}

function generateBibtex(pub: { id: string; title: string; authors: string[]; year: number; venue: string }): string {
  const authorStr = pub.authors.join(' and ');
  const venueLower = pub.venue.toLowerCase();

  let type = '@misc';
  let venueField = 'howpublished';
  if (venueLower.includes('transactions') || venueLower.includes('journal') || venueLower.includes('nature') || venueLower.includes('express')) {
    type = '@article';
    venueField = 'journal';
  } else if (venueLower.includes('cvpr') || venueLower.includes('siggraph') || venueLower.includes('neurips') ||
             venueLower.includes('iclr') || venueLower.includes('eccv') || venueLower.includes('iccv') ||
             venueLower.includes('chi') || venueLower.includes('ismar') || venueLower.includes('vr ') ||
             venueLower.includes('wacv') || venueLower.includes('iccp') || venueLower.includes('proceedings') ||
             venueLower.includes('conference') || venueLower.includes('symposium')) {
    type = '@inproceedings';
    venueField = 'booktitle';
  }

  return `${type}{${pub.id.replace(/-/g, '_')},
  title     = {${pub.title}},
  author    = {${authorStr}},
  ${venueField} = {${pub.venue}},
  year      = {${pub.year}}
}`;
}

function detectTags(venue: string, year: number): string[] {
  const tags: string[] = [String(year)];
  const v = venue.toLowerCase();

  if (v.includes('cvpr')) tags.push('Conference', 'CVPR');
  else if (v.includes('siggraph asia')) tags.push('Conference', 'SIGGRAPH Asia');
  else if (v.includes('siggraph')) tags.push('Conference', 'SIGGRAPH');
  else if (v.includes('neurips')) tags.push('Conference', 'NeurIPS');
  else if (v.includes('iclr')) tags.push('Conference', 'ICLR');
  else if (v.includes('eccv')) tags.push('Conference', 'ECCV');
  else if (v.includes('iccv')) tags.push('Conference', 'ICCV');
  else if (v.includes('chi')) tags.push('Conference', 'CHI');
  else if (v.includes('ismar')) tags.push('Conference', 'ISMAR');
  else if (v.includes('vr 20') || v.includes('ieee vr')) tags.push('Conference', 'IEEE VR');
  else if (v.includes('wacv')) tags.push('Conference', 'WACV');
  else if (v.includes('iccp')) tags.push('Conference', 'ICCP');
  else if (v.includes('transactions') || v.includes('tvcg')) tags.push('Journal', 'IEEE TVCG');
  else if (v.includes('nature')) tags.push('Journal', 'Nature');
  else if (v.includes('acm transactions on graphics')) tags.push('Journal', 'TOG');
  else if (v.includes('arxiv')) tags.push('ArXiv');
  else if (v.includes('spie')) tags.push('Conference', 'SPIE');
  else tags.push('Conference');

  return tags;
}

// ─── PEOPLE DATA (from telepresence.web.unc.edu/people/) ─────────────────────

function getPeopleData(): Person[] {
  const raw: Array<{
    name: string;
    role: Person['role'];
    title: string;
    email: string;
    photoUrl: string;
    website: string;
    institution?: string;
    alumniYear?: number;
    currentPosition?: string;
  }> = [
    // Faculty
    { name: 'Henry Fuchs', role: 'faculty', title: 'Federico Gil Distinguished Professor', email: 'fuchs@cs.unc.edu', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/fuchs_henry_11_002-wpcf_120x80.jpg', website: 'https://henryfuchs.web.unc.edu/' },

    // Staff
    { name: 'Praneeth Chakravarthula', role: 'faculty', title: 'Assistant Professor', email: 'cpk@cs.unc.edu', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/dp-wpcf_100x100.jpg', website: 'https://www.cs.unc.edu/~cpk/' },
    { name: 'Adrian Ilie', role: 'faculty', title: 'Senior Research Scientist', email: 'adyilie@cs.unc.edu', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/ilie-wpcf_67x100.png', website: 'http://www.cs.unc.edu/~adyilie/index.htm' },
    { name: 'Kurtis Keller', role: 'faculty', title: 'Research Associate and Engineer', email: 'keller@cs.unc.edu', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/Kurtis-wpcf_85x100.jpg', website: 'https://www.cs.unc.edu/~keller/' },
    { name: 'Jim Mahaney', role: 'faculty', title: 'Lab Manager', email: 'mahaney@cs.unc.edu', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/Mahaney-wpcf_120x160-wpcf_75x100.jpg', website: '' },
    { name: 'Andrei State', role: 'faculty', title: 'Senior Research Scientist', email: 'andrei@cs.unc.edu', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/andrei3-wpcf_120x97.jpg', website: 'http://www.cs.unc.edu/~andrei/' },

    // Graduate Students
    { name: 'Jade Kandel', role: 'phd', title: 'PhD Student', email: 'jadekandel@gmail.com', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2023/01/JadeKandel-wpcf_96x100.jpg', website: 'https://jadekandel.wixsite.com/jadesart' },
    { name: 'YoungJoong Kwon', role: 'phd', title: 'PhD Student', email: 'youngjoong@cs.unc.edu', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2019/08/YoungJoong-Kwon-wpcf_100x100.jpeg', website: 'https://youngjoongunc.github.io/' },
    { name: 'Conny Xinran Lu', role: 'phd', title: 'PhD Student', email: 'connylu@cs.unc.edu', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2018/02/connylu_100x100-wpcf_96x100.jpg', website: '' },
    { name: 'Chenyang Ma', role: 'phd', title: 'PhD Student', email: 'mach@cs.unc.edu', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2024/03/Chenyang-Ma-wpcf_100x100.jpg', website: 'https://www.chenyangma.com/' },
    { name: 'Emre Onemli', role: 'phd', title: 'PhD Student', email: 'emre@cs.unc.edu', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2023/02/emre-onemli-photo-wpcf_99x100.jpeg', website: '' },
    { name: 'Akshay Paruchuri', role: 'phd', title: 'PhD Student', email: 'aparuchuri@unc.edu', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2021/10/akshay-updated-wpcf_100x100.jpeg', website: 'https://www.cs.unc.edu/~akshaypa/' },
    { name: 'Ryan Schmelzle', role: 'phd', title: 'PhD Student', email: 'ryancschmelzle@gmail.com', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2023/01/RyanSchmelzle-wpcf_75x100.jpeg', website: '' },
    { name: 'Shengze Wang', role: 'phd', title: 'PhD Student', email: 'shengzew@email.unc.edu', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2021/10/ShengzeWang-wpcf_115x100.jpg', website: 'https://mcmvmc.github.io/' },
    { name: 'Qian Zhang', role: 'phd', title: 'PhD Student', email: 'qzane@cs.unc.edu', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2019/08/qian-zhang-wpcf_71x100.png', website: 'https://www.qzane.com/' },

    // Undergraduate Students
    { name: 'Jayden Lim', role: 'undergrad', title: 'Undergraduate Researcher', email: 'jaylim@unc.edu', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2024/04/Jayden_Lim-wpcf_100x100.png', website: '' },
    { name: 'Ashley Neall', role: 'undergrad', title: 'Undergraduate Researcher', email: 'aneall@unc.edu', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2023/01/Ashley-Neall-wpcf_95x100.jpg', website: 'https://aneall.github.io/' },

    // Alumni - Faculty
    { name: 'Anselmo Lastra', role: 'alumni', title: 'Professor', email: 'lastra@cs.unc.edu', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/lastra-wpcf_68x100.jpeg', website: 'https://lastra.web.unc.edu/home-page/', currentPosition: 'Professor, UNC Chapel Hill' },
    { name: 'Greg Welch', role: 'alumni', title: 'Florida Hospital Endowed Chair', email: 'welch@ucf.edu', photoUrl: '', website: 'https://www.ist.ucf.edu/Contact/StaffDirectory/GregoryWelch.aspx', currentPosition: 'Florida Hospital Endowed Chair, University of Central Florida' },

    // Alumni - PhD (selected notable ones)
    { name: 'Marc Levoy', role: 'alumni', title: 'PhD', email: '', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2017/03/marc-levoy-wpcf_100x100.jpg', website: 'https://en.wikipedia.org/wiki/Marc_Levoy', alumniYear: 1989, currentPosition: 'Distinguished Engineer, Google Research' },
    { name: 'Gregory Turk', role: 'alumni', title: 'PhD', email: '', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2017/03/gregory-turk-wpcf_82x100.jpg', website: 'http://www.cc.gatech.edu/~turk/', alumniYear: 1992, currentPosition: 'Professor, Georgia Tech' },
    { name: 'Ulrich Neumann', role: 'alumni', title: 'PhD', email: '', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2017/03/ulrich-neumann-wpcf_100x100.jpg', website: 'http://graphics.usc.edu/cgit/un.html', alumniYear: 1993, currentPosition: 'Professor, USC' },
    { name: 'Victoria Interrante', role: 'alumni', title: 'PhD', email: '', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2017/03/victoriaInterrante100x100-wpcf_96x100.jpg', website: 'http://www-users.cs.umn.edu/~interran/', alumniYear: 1996, currentPosition: 'Professor, University of Minnesota' },
    { name: 'Gary Bishop', role: 'alumni', title: 'PhD', email: 'gb@cs.unc.edu', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2017/03/garyBishop100x100.png', website: 'https://www.cs.unc.edu/~gb/', alumniYear: 1984, currentPosition: 'Professor, UNC Chapel Hill' },
    { name: 'Ramesh Raskar', role: 'alumni', title: 'PhD', email: '', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2017/03/ramesh-raskar-wpcf_72x100.jpg', website: 'http://web.media.mit.edu/~raskar/', alumniYear: 2002, currentPosition: 'Associate Professor, MIT' },
    { name: 'Andrew Maimone', role: 'alumni', title: 'PhD', email: '', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/andrew-maimone-wpcf_67x100.jpg', website: 'https://maimone.org', alumniYear: 2015, currentPosition: 'Research Scientist, Facebook Reality Labs' },
    { name: 'David Dunn', role: 'alumni', title: 'PhD', email: '', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2014/03/headshot_cropped-wpcf_100x100.jpg', website: 'http://www.qenops.com/', alumniYear: 2019, currentPosition: 'Disney Research - Los Angeles' },
    { name: 'Peter Lincoln', role: 'alumni', title: 'PhD', email: '', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/plincoln-wpcf_100x100.jpg', website: 'http://cs.unc.edu/~plincoln/', alumniYear: 2017, currentPosition: 'Google' },
    { name: 'Kishore Rathinavel', role: 'alumni', title: 'PhD', email: '', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/IMG_0652-wpcf_106x100.jpg', website: 'https://sites.google.com/site/kishorerathinavel/', alumniYear: 2013, currentPosition: '' },
    { name: 'Mingsong Dou', role: 'alumni', title: 'PhD', email: '', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/mingsongDou100x100.jpg', website: 'http://www.cs.unc.edu/~doums/', alumniYear: 2015, currentPosition: 'perceptiveIO Inc.' },
    { name: 'Rohan Chabra', role: 'alumni', title: 'PhD', email: '', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2017/02/pp-wpcf_100x100.jpg', website: 'http://cs.unc.edu/~rohanc/', alumniYear: 2014, currentPosition: '' },
    { name: 'Steven Molnar', role: 'alumni', title: 'PhD', email: '', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2017/03/steve-molnar-wpcf_67x100.jpg', website: 'http://www.cs.unc.edu/~molnar/', alumniYear: 1991, currentPosition: 'NVIDIA' },
    { name: 'Gregory Abram', role: 'alumni', title: 'PhD', email: '', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2017/03/gregAbram100x100.png', website: 'https://www.tacc.utexas.edu/about/directory/gregory-abram', alumniYear: 1986, currentPosition: 'Research Scientist, Texas Advanced Computing Center' },
    { name: 'Alex Blate', role: 'alumni', title: 'PhD', email: '', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2017/02/alexblate-wpcf_100x100.jpg', website: '', alumniYear: 2019, currentPosition: 'Chief Innovator, Aura Technologies' },
    { name: 'Wei-Chao Chen', role: 'alumni', title: 'PhD', email: '', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2017/03/wei-chaoChen100x100.jpg', website: 'https://www.cs.unc.edu/~ciao/', alumniYear: 2002, currentPosition: 'Co-Founder, Skywatch Innovation Inc.' },
    { name: 'Tabitha Peck', role: 'alumni', title: 'PhD', email: '', photoUrl: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2017/03/tabitha-peck-wpcf_100x100.jpg', website: 'https://www.davidson.edu/academics/mathematics-and-computer-science/faculty-and-staff/tabitha-peck', alumniYear: 2010, currentPosition: 'Assistant Professor, Davidson College' },
  ];

  return raw.map(p => ({
    id: personSlug(p.name),
    name: p.name,
    role: p.role,
    title: p.title,
    email: p.email,
    photoPath: p.photoUrl ? `/images/people/${personSlug(p.name)}.jpg` : '',
    bio: '',
    website: p.website,
    googleScholar: '',
    github: '',
    twitter: '',
    interests: [],
    ...(p.alumniYear ? { alumniYear: p.alumniYear } : {}),
    ...(p.currentPosition ? { alumniPosition: p.currentPosition } : {}),
  }));
}

// ─── PUBLICATIONS DATA (from telepresence.web.unc.edu/publications/) ──────────

function getPublicationsData(): Publication[] {
  const raw: Array<{
    title: string;
    authors: string[];
    year: number;
    venue: string;
    paperUrl: string;
    doi: string;
    awards: string;
    featured: boolean;
  }> = [
    // 2025
    { title: 'Present and Future of Everyday-Use Augmented Reality Eyeglasses', authors: ['Praneeth Chakravarthula'], year: 2025, venue: 'IEEE CVTG 2025', paperUrl: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=10964495', doi: '', awards: '', featured: false },
    { title: 'Multimodal Neural Acoustic Fields for Immersive Mixed Reality', authors: ['Guaneen Tong', 'Johnathan Chi-Ho Leung', 'Xi Peng', 'Haosheng Shi', 'Liujie Zheng', 'Shengze Wang', 'Arryn Carlos O\'Brien', 'Ashley Paula-Ann Neall', 'Grace Fei', 'Martim Gaspar', 'Praneeth Chakravarthula'], year: 2025, venue: 'IEEE TVCG 2025', paperUrl: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=10938352', doi: '', awards: '', featured: false },
    { title: 'DOF-GS: Adjustable Depth-of-Field 3D Gaussian Splatting for Post-Capture Refocusing, Defocus Rendering and Blur Removal', authors: ['Yujie Wang', 'Praneeth Chakravarthula', 'Baoquan Chen'], year: 2025, venue: 'CVPR 2025', paperUrl: 'https://openaccess.thecvf.com/content/CVPR2025/papers/Wang_DOF-GS_Adjustable_Depth-of-Field_3D_Gaussian_Splatting_for_Post-Capture_Refocusing_Defocus_CVPR_2025_paper.pdf', doi: '', awards: '', featured: true },
    { title: 'Event Fields: Capturing Light Fields at High Speed, Resolution, and Dynamic Range', authors: ['Ziyuan Qu', 'Zihao Zou', 'Vivek Boominathan', 'Praneeth Chakravarthula', 'Adithya Pediredla'], year: 2025, venue: 'CVPR 2025', paperUrl: 'https://openaccess.thecvf.com/content/CVPR2025/papers/Qu_Event_Fields_Capturing_Light_Fields_at_High_Speed_Resolution_and_CVPR_2025_paper.pdf', doi: '', awards: '', featured: true },
    { title: 'Perceptually-Guided Acoustic Foveation', authors: ['Xi Peng', 'Kenneth Chen', 'Iran Roman', 'Juan Pablo Bello', 'Qi Sun', 'Praneeth Chakravarthula'], year: 2025, venue: 'IEEE VR 2025', paperUrl: 'https://www.cs.unc.edu/~cpk/data/papers/Perceptually_Guided_Acoustic_Foveation.pdf', doi: '', awards: '', featured: false },
    { title: 'FlatTrack: Eye-Tracking with Ultra-Thin Lensless Cameras', authors: ['Purvam Jain', 'Althaf M. Nazar', 'Salman Siddique Khan', 'Kaushik Mitra', 'Praneeth Chakravarthula'], year: 2025, venue: 'WACV Workshops 2025', paperUrl: '', doi: '', awards: '', featured: false },
    { title: 'My3DGen: A Scalable Personalized 3D Generative Model', authors: ['Luchao Qi', 'Jiaye Wu', 'Annie N. Wang', 'Shengze Wang', 'Roni Sengupta'], year: 2025, venue: 'WACV 2025', paperUrl: 'https://openaccess.thecvf.com/content/WACV2025/papers/Qi_My3DGen_A_Scalable_Personalized_3D_Generative_Model_WACV_2025_paper.pdf', doi: '', awards: '', featured: false },
    { title: 'HoloZip: High Hologram Compression via Latent-of-Latent Coding', authors: ['Huaizhi Qu', 'Yujie Wang', 'Ruichen Zhang', 'Hengyu Lian', 'Mufan Qiu', 'Samarjit Chakraborty', 'Henry Fuchs', 'Tianlong Chen', 'Praneeth Chakravarthula'], year: 2025, venue: 'ICCP 2025', paperUrl: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=11143849', doi: '', awards: '', featured: false },
    { title: 'BLADE: Single-view Body Mesh Estimation through Accurate Depth Estimation', authors: ['Shengze Wang', 'Jiefeng Li', 'Tianye Li', 'Ye Yuan', 'Henry Fuchs', 'Koki Nagano', 'Shalini De Mello', 'Michael Stengel'], year: 2025, venue: 'CVPR 2025', paperUrl: 'https://arxiv.org/pdf/2412.08640', doi: '', awards: '', featured: true },
    { title: 'Coherent 3D Portrait Video Reconstruction via Triplane Fusion', authors: ['Shengze Wang', 'Xueting Li', 'Chao Liu', 'Matthew A. Chan', 'Michael Stengel', 'Henry Fuchs', 'Shalini De Mello', 'Koki Nagano'], year: 2025, venue: 'CVPR 2025', paperUrl: 'https://openaccess.thecvf.com/content/CVPR2025/papers/Wang_Coherent_3D_Portrait_Video_Reconstruction_via_Triplane_Fusion_CVPR_2025_paper.pdf', doi: '', awards: '', featured: false },
    { title: 'EgoTrigger: Toward Audio-Driven Image Capture for Human Memory Enhancement in All-Day Energy-Efficient Smart Glasses', authors: ['Akshay Paruchuri', 'Sinan Hersek', 'Lavisha Aggarwal', 'Qiao Yang', 'Xin Liu', 'Achin Kulshrestha', 'Andrea Colaco', 'Henry Fuchs', 'Ishan Chatterjee'], year: 2025, venue: 'IEEE TVCG 2025', paperUrl: 'https://arxiv.org/pdf/2508.01915', doi: '', awards: '', featured: false },
    { title: 'Learning View Synthesis for Desktop Telepresence With Few RGBD Cameras', authors: ['Shengze Wang', 'Ziheng Wang', 'Ryan Schmelzle', 'Liujie Zheng', 'Youngjoong Kwon', 'Roni Sengupta', 'Henry Fuchs'], year: 2025, venue: 'IEEE TVCG 2025', paperUrl: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=10557509', doi: '', awards: '', featured: false },
    { title: 'Towards an Expanded Eyebox for a Wide-Field-of-View Augmented Reality Near-eye Pinlight Display with 3D Pupil Localization', authors: ['Xinxing Xia', 'Zheye Yu', 'Dongyu Qiu', 'Andrei State', 'Tat-Jen Cham', 'Frank Guan', 'Henry Fuchs'], year: 2025, venue: 'VR Workshops 2025', paperUrl: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=10972738', doi: '', awards: '', featured: false },
    { title: 'Investigating Encoding and Perspective for Augmented Reality Motion Guidance', authors: ['Jade Kandel', 'Sriya Kasumarthi', 'Spiros Tsalikis', 'Chelsea Duppen', 'Daniel Szafir', 'Michael Lewek', 'Henry Fuchs', 'Danielle Szafir'], year: 2025, venue: 'ISMAR 2025', paperUrl: 'https://arxiv.org/pdf/2510.00407', doi: '', awards: '', featured: false },
    { title: 'Dynamic Eyebox Steering for Improved Pinlight AR Near-eye Displays', authors: ['Xinxing Xia', 'Zheye Yu', 'Dongyu Qiu', 'Andrei State', 'Tat-Jen Cham', 'Frank Guan', 'Henry Fuchs'], year: 2025, venue: 'ISMAR 2025', paperUrl: 'https://ieeexplore.ieee.org/document/11192782', doi: '', awards: '', featured: false },

    // 2024
    { title: 'PD-Insighter: A Visual Analytics System to Monitor Daily Actions for Parkinson\'s Disease Treatment', authors: ['Jade Kandel', 'Chelsea Duppen', 'Qian Zhang', 'Howard Jiang', 'Angelos Angelopoulos', 'Ashley Paula-Ann Neall', 'Pranav Wagh', 'Daniel Szafir', 'Henry Fuchs', 'Michael Lewek', 'Danielle Albers Szafir'], year: 2024, venue: 'CHI 2024', paperUrl: 'https://dl.acm.org/doi/pdf/10.1145/3613904.3642215', doi: '', awards: '', featured: true },
    { title: 'Neural Étendue Expander for Ultra-Wide-Angle High-Fidelity Holographic Display', authors: ['Ethan Tseng', 'Seung-Hwan Baek', 'Grace Kuo', 'Nathan Matsuda', 'Andrew Maimone', 'Praneeth Chakravarthula', 'Qiang Fu', 'Wolfgang Heidrich', 'Douglas Lanman', 'Felix Heide'], year: 2024, venue: 'Nature Communications 2024', paperUrl: 'https://arxiv.org/pdf/2109.08123.pdf', doi: '', awards: '', featured: false },

    // 2023
    { title: 'Bringing Telepresence to Every Desk', authors: ['Shengze Wang', 'Ziheng Wang', 'Ryan Schmelzle', 'Liujie Zheng', 'YoungJoong Kwon', 'Soumyadip Sengupta', 'Henry Fuchs'], year: 2023, venue: 'arXiv 2023', paperUrl: 'https://arxiv.org/pdf/2304.01197.pdf', doi: '', awards: '', featured: false },
    { title: 'Neural Image-based Avatars: Generalizable Radiance Fields for Human Avatar Modeling', authors: ['Youngjoong Kwon', 'Dahun Kim', 'Duygu Ceylan', 'Henry Fuchs'], year: 2023, venue: 'ICLR 2023', paperUrl: 'https://arxiv.org/pdf/2304.04897.pdf', doi: '', awards: '', featured: false },
    { title: 'DELIFFAS: Deformable Light Fields for Fast Avatar Synthesis', authors: ['Youngjoong Kwon', 'Lingjie Liu', 'Henry Fuchs', 'Marc Habermann', 'Christian Theobalt'], year: 2023, venue: 'NeurIPS 2023', paperUrl: 'https://arxiv.org/pdf/2310.11449.pdf', doi: '', awards: '', featured: false },
    { title: 'Thin On-Sensor Nanophotonic Array Cameras', authors: ['Praneeth Chakravarthula', 'Jipeng Sun', 'Xiao Li', 'Chenyang Lei', 'Gene Chou', 'Mario Bijelic', 'Johannes Froesch', 'Arka Majumdar', 'Felix Heide'], year: 2023, venue: 'ACM Transactions on Graphics 2023, SIGGRAPH Asia 2023', paperUrl: 'https://arxiv.org/pdf/2308.02797.pdf', doi: '', awards: '', featured: false },
    { title: 'Seeing with Sound: Long-Range Acoustic Beamforming for Automotive Scene Understanding', authors: ['Praneeth Chakravarthula', 'Jim Aldon D\'Souza', 'Ethan Tseng', 'Joe Bartusek', 'Felix Heide'], year: 2023, venue: 'CVPR 2023', paperUrl: 'https://light.princeton.edu/wp-content/uploads/2023/09/SeeingWithSound.pdf', doi: '', awards: '', featured: false },
    { title: 'Stochastic Light Field Holography', authors: ['Florian Schiffers', 'Praneeth Chakravarthula', 'Nathan Matsuda', 'Grace Kuo', 'Ethan Tseng', 'Douglas Lanman', 'Felix Heide', 'Oliver Cossairt'], year: 2023, venue: 'ICCP 2023', paperUrl: 'https://arxiv.org/pdf/2307.06277.pdf', doi: '', awards: '', featured: false },
    { title: 'Reconstruction of Human Body Pose and Appearance Using Body-Worn IMUs and a Nearby Camera View for Collaborative Egocentric Telepresence', authors: ['Qian Zhang', 'Akshay Paruchuri', 'YoungWoon Cha', 'Jiabin Huang', 'Jade Kandel', 'Howard Jiang', 'Adrian Ilie', 'Andrei State', 'Danielle Albers', 'Daniel Szafir', 'Henry Fuchs'], year: 2023, venue: 'IEEE VR 2023', paperUrl: '', doi: '', awards: '', featured: false },

    // 2022
    { title: 'Pupil-aware Holography', authors: ['Praneeth Chakravarthula', 'Seung-Hwan Baek', 'Florian Schiffers', 'Ethan Tseng', 'Grace Kuo', 'Andrew Maimone', 'Nathan Matsuda', 'Oliver Cossairt', 'Douglas Lanman', 'Felix Heide'], year: 2022, venue: 'ACM Transactions on Graphics 2022, SIGGRAPH Asia 2022', paperUrl: 'https://arxiv.org/pdf/2203.14939', doi: '', awards: '', featured: false },
    { title: 'Neural 3D Gaze: 3D Pupil Localization and Gaze Tracking based on Anatomical Eye Model and Neural Refraction Correction', authors: ['Conny Xinran Lu', 'Praneeth Chakravarthula', 'Kaihao Liu', 'Xixiang Liu', 'Siyuan Li', 'Henry Fuchs'], year: 2022, venue: 'ISMAR 2022', paperUrl: '', doi: '', awards: '', featured: false },
    { title: 'Hogel-free Holography', authors: ['Praneeth Chakravarthula', 'Ethan Tseng', 'Henry Fuchs', 'Felix Heide'], year: 2022, venue: 'ACM Transactions on Graphics 2022, SIGGRAPH 2022', paperUrl: 'https://www.cs.unc.edu/~cpk/data/papers/hogel_free_sig2022.pdf', doi: '', awards: '', featured: false },

    // 2021
    { title: 'Neural Human Performer: Learning Generalizable Radiance Fields for Human Performance Rendering', authors: ['Youngjoong Kwon', 'Dahun Kim', 'Duygu Ceylan', 'Henry Fuchs'], year: 2021, venue: 'NeurIPS 2021', paperUrl: 'https://arxiv.org/pdf/2109.07448.pdf', doi: '', awards: 'Spotlight Presentation (< 3.0% acceptance)', featured: true },
    { title: 'Mobile, Egocentric Human Body Motion Reconstruction Using Only Eyeglasses-mounted Cameras and a Few Body-worn Inertial Sensors', authors: ['Young-Woon Cha', 'Husam Shaik', 'Qian Zhang', 'Fan Feng', 'Andrei State', 'Adrian Ilie', 'Henry Fuchs'], year: 2021, venue: 'IEEE VR 2021', paperUrl: '', doi: '', awards: 'Best Conference Paper (1 of 3)', featured: true },
    { title: 'Gaze-contingent Retinal Speckle Suppression for Perceptually-Matched Foveated Holographic Displays', authors: ['Praneeth Chakravarthula', 'Zhan Zhang', 'Okan Tursun', 'Piotr Didyk', 'Qi Sun', 'Henry Fuchs'], year: 2021, venue: 'IEEE TVCG 2021', paperUrl: 'https://arxiv.org/pdf/2108.06192', doi: '', awards: '', featured: false },

    // 2020
    { title: 'Learned Hardware-in-the-loop Phase Retrieval for Holographic Near-Eye Displays', authors: ['Praneeth Chakravarthula', 'Ethan Tseng', 'Tarun Srivastava', 'Henry Fuchs', 'Felix Heide'], year: 2020, venue: 'ACM Transactions on Graphics 2020, SIGGRAPH Asia 2020', paperUrl: '', doi: '', awards: '', featured: false },
    { title: 'Towards Eyeglasses-style Holographic Near-eye Displays with Static Expanded Eyebox', authors: ['Xinxing Xia', 'Yunqing Guan', 'Andrei State', 'Praneeth Chakravarthula', 'Tat-Jen Cham', 'Henry Fuchs'], year: 2020, venue: 'ISMAR 2020', paperUrl: '', doi: '', awards: '', featured: false },

    // 2019
    { title: 'Wirtinger Holography for Near-Eye Displays', authors: ['Praneeth Chakravarthula', 'Yifan Peng', 'Joel Kollin', 'Henry Fuchs', 'Felix Heide'], year: 2019, venue: 'ACM Transactions on Graphics 2019, SIGGRAPH Asia 2019', paperUrl: 'https://www.cs.unc.edu/~cpk/data/papers/wirt-holo-sigasia19.pdf', doi: '', awards: '', featured: false },
    { title: 'StereoDRNet: Dilated Residual Stereo Net', authors: ['Rohan Chabra', 'Julian Straub', 'Chris Sweeney', 'Richard Newcombe', 'Henry Fuchs'], year: 2019, venue: 'CVPR 2019', paperUrl: '', doi: '', awards: '', featured: false },
    { title: 'Manufacturing Application-Driven Foveated Near-Eye Displays', authors: ['Kaan Aksit', 'Praneeth Chakravarthula', 'Kishore Rathinavel', 'Youngmo Jeong', 'Rachel Albert', 'David Luebke', 'Henry Fuchs'], year: 2019, venue: 'IEEE TVCG 2019', paperUrl: '', doi: '', awards: '', featured: false },

    // 2018
    { title: 'FocusAR: Auto-focus Augmented Reality Eyeglasses for both Real World and Virtual Imagery', authors: ['Praneeth Chakravarthula', 'David Dunn', 'Kaan Aksit', 'Henry Fuchs'], year: 2018, venue: 'IEEE TVCG 2018, ISMAR 2018', paperUrl: 'https://www.cs.unc.edu/~cpk/data/papers/focusAR-2018.pdf', doi: 'https://doi.org/10.1109/TVCG.2018.2868532', awards: 'Best Paper Award', featured: true },
    { title: 'Steerable Application-Adaptive Near Eye Displays', authors: ['Kishore Rathinavel', 'Praneeth Chakravarthula', 'Kaan Aksit', 'Josef Spjut', 'Ben Boudaoud', 'Turner Whitted', 'David Luebke', 'Henry Fuchs'], year: 2018, venue: 'SIGGRAPH 2018 Emerging Technologies', paperUrl: '', doi: '', awards: 'Best in Show', featured: true },

    // 2017
    { title: 'Wide Field Of View Varifocal Near-Eye Display Using See-Through Deformable Membrane Mirrors', authors: ['David Dunn', 'Cary Tippets', 'Kent Torell', 'Petr Kellnhofer', 'Kaan Aksit', 'Piotr Didyk', 'Karol Myszkowski', 'David Luebke', 'Henry Fuchs'], year: 2017, venue: 'IEEE TVCG 2017, IEEE VR 2017', paperUrl: '', doi: 'https://doi.org/10.1109/TVCG.2017.2657058', awards: 'Best Paper Award', featured: true },

    // 2016
    { title: 'From Motion to Photons in 80 Microseconds: Towards Minimal Latency for Virtual and Augmented Reality', authors: ['Peter Lincoln', 'Alex Blate', 'Montek Singh', 'Turner Whitted', 'Andrei State', 'Anselmo Lastra', 'Henry Fuchs'], year: 2016, venue: 'IEEE VR 2016', paperUrl: '', doi: 'http://dx.doi.org/10.1109/TVCG.2016.2518038', awards: 'Best Paper Award', featured: true },

    // 2015
    { title: '3D Scanning Deformable Objects with a Single RGBD Sensor', authors: ['Mingsong Dou', 'Jonathan Taylor', 'Henry Fuchs', 'Andrew Fitzgibbon', 'Shahram Izadi'], year: 2015, venue: 'CVPR 2015', paperUrl: '', doi: '', awards: '', featured: false },

    // 2014
    { title: 'Pinlight Displays: Wide Field of View Augmented Reality Eyeglasses Using Defocused Point Light Sources', authors: ['Andrew Maimone', 'Douglas Lanman', 'Kishore Rathinavel', 'Kurtis Keller', 'David Luebke', 'Henry Fuchs'], year: 2014, venue: 'SIGGRAPH 2014', paperUrl: '', doi: '', awards: '', featured: true },
    { title: 'Immersive 3D Telepresence', authors: ['Henry Fuchs', 'Andrei State', 'Jean-Charles Bazin'], year: 2014, venue: 'IEEE Computer 2014', paperUrl: '', doi: '', awards: '', featured: false },

    // 2013
    { title: 'Computational Augmented Reality Eyeglasses', authors: ['Andrew Maimone', 'Henry Fuchs'], year: 2013, venue: 'ISMAR 2013', paperUrl: '', doi: '', awards: '', featured: false },
    { title: 'Focus 3D: Compressive Accommodation Display', authors: ['Andrew Maimone', 'Gordon Wetzstein', 'Matthew Hirsch', 'Douglas Lanman', 'Ramesh Raskar', 'Henry Fuchs'], year: 2013, venue: 'ACM Transactions on Graphics 2013', paperUrl: '', doi: '', awards: '', featured: false },
    { title: 'General-Purpose Telepresence with Head-Worn Optical See-Through Displays and Projector-Based Lighting', authors: ['Andrew Maimone', 'Xubo Yang', 'Nate Dierk', 'Andrei State', 'Mingsong Dou', 'Henry Fuchs'], year: 2013, venue: 'IEEE VR 2013', paperUrl: '', doi: '', awards: 'Best Short Paper', featured: false },
  ];

  return raw.map(p => {
    const id = publicationSlug(p.title, p.authors, p.year);
    return {
      id,
      title: p.title,
      authors: p.authors,
      year: p.year,
      venue: p.venue,
      abstract: '',
      pdfPath: '',
      pdfUrl: p.paperUrl,
      doi: p.doi,
      semanticScholarId: '',
      bibtex: generateBibtex({ id, title: p.title, authors: p.authors, year: p.year, venue: p.venue }),
      keyContributions: '',
      tags: [
        ...detectTags(p.venue, p.year),
        ...(p.awards ? ['Award'] : []),
      ],
      featured: p.featured,
    };
  });
}

// ─── RESEARCH DATA (from telepresence.web.unc.edu/research/) ──────────────────

function getResearchData(): ResearchProject[] {
  const raw: Array<{ title: string; description: string; imageUrl: string; active: boolean }> = [
    // Current
    { title: 'Desktop 3D Telepresence', description: 'Bringing Telepresence to Every Desk — developing systems for real-time 3D telepresence using commodity RGBD cameras.', imageUrl: '', active: true },
    { title: 'Egocentric Body Pose Tracking', description: 'Mobile, egocentric human body motion reconstruction using eyeglasses-mounted cameras and body-worn inertial sensors.', imageUrl: '', active: true },
    { title: 'Eye Tracking with 3D Pupil Localization', description: '3D pupil localization and gaze tracking based on anatomical eye models and neural refraction correction for AR/VR displays.', imageUrl: '', active: true },
    { title: 'Holographic Near-Eye Display', description: 'Computing high-quality phase-only holograms for near-eye holographic displays with applications in AR eyeglasses.', imageUrl: '', active: true },
    { title: 'Novel View Rendering using Neural Networks', description: 'Learning generalizable radiance fields for human performance rendering and novel view synthesis.', imageUrl: '', active: true },

    // Past
    { title: 'Dynamic Focus Augmented Reality Display', description: 'Addresses fundamental limitations of near eye displays including limited field of view, low angular resolution, and fixed accommodative state. Proposes hybrid hardware using see-through deformable membrane mirrors to provide wide FOV and accommodative cues, addressing Vergence-Accommodation Conflict.', imageUrl: '', active: false },
    { title: 'Immersive Learning from 3D Reconstruction', description: 'Investigates 3D reconstruction of room-sized dynamic scenes with higher quality and fidelity. Enables immersive learning of rare situations through post-event, annotated virtual reality experiences for emergency medical procedures.', imageUrl: '', active: false },
    { title: 'Low Latency Display', description: 'Developing low latency tracking and display system for ultra-low latency, optical see-through augmented reality head mounted displays. Runs at high frame rate and performs in-display corrections.', imageUrl: '', active: false },
    { title: 'Pinlight Display', description: 'Novel optical see-through augmented reality display offering wide field of view and compact eyeglasses form factor. Prototype demonstrates 110° diagonal field of view.', imageUrl: '', active: false },
    { title: 'Office of the Future', description: 'Unified application of computer vision and computer graphics combining panoramic image display, tiled display systems, image-based modeling, and immersive environments for 3D tele-immersion capabilities.', imageUrl: '', active: false },
    { title: '3D Telepresence for Medical Consultation', description: 'Develops permanent, portable, handheld 3D telepresence technologies for remote medical consultations. Addresses real time acquisition, novel view generation, network variability, and 3D depth cues.', imageUrl: '', active: false },
    { title: 'Wall-to-Wall Telepresence', description: 'Enabled visualization of large 3D models on multi-screen 2D display for telepresence. Experimented with reconstructed models and dense datasets.', imageUrl: '', active: false },
    { title: 'Multi-view Teleconferencing', description: 'Two-site teleconferencing system supporting multiple people per site while maintaining gaze awareness. Provides unique views of remote sites to each local participant.', imageUrl: '', active: false },
    { title: 'Ultrasound/Medical Augmented Reality', description: 'Develops system allowing physicians to see inside patients using augmented reality. Combines ultrasound echography, laparoscopic range imaging, video see-through HMD, and graphics.', imageUrl: '', active: false },
    { title: 'Pixel-Planes & PixelFlow', description: 'Explores computer architectures for 3D graphics since 1980. Focuses on image-based rendering with goal of high-performance graphics engine using images as principal rendering primitive.', imageUrl: '', active: false },
    { title: '3D Laparoscopic Visualization', description: 'Three-dimensional visualization system for laparoscopic surgical procedures. Uses 3D visualization, depth extraction, six degree-of-freedom tracking to display merged real and synthetic images.', imageUrl: '', active: false },
    { title: 'Wide-Area Tracking', description: 'Develops wide-area systems for 6D tracking of heads, limbs, and hand-held devices. Provides precise position and orientation information for head-mounted displays.', imageUrl: '', active: false },
    { title: 'Image-Based Rendering', description: 'Investigates alternative approach representing complex 3D environments with image sets containing depth information. Develops algorithms to produce new images from viewpoints not in original image set.', imageUrl: '', active: false },
    { title: 'Telecollaboration', description: 'Multi-site, multi-disciplinary project developing distributed collaborative design environment. Includes shared virtual environment software, collaborative VR, and interaction tools.', imageUrl: '', active: false },
  ];

  return raw.map((r, i) => ({
    id: slugify(r.title),
    title: r.title,
    description: r.description,
    imagePath: '',
    tags: [],
    publicationIds: [],
    active: r.active,
    order: i,
  }));
}

// ─── NEWS DATA (from telepresence.web.unc.edu homepage) ───────────────────────

function getNewsData(): NewsItem[] {
  return [
    { id: 'pd-insighter-chi-2024', title: 'PD-Insighter Paper Accepted to SIGCHI 2024', date: '2024-01-15', summary: 'Our paper on PD-Insighter, a visual analytics system for monitoring Parkinson\'s Disease treatment, has been accepted to CHI 2024.', link: '', type: 'paper' },
    { id: 'neall-mit-reality-hack-2024', title: 'Ashley Neall – Best Use of Looking Glass at MIT Reality Hack 2024', date: '2024-01-20', summary: 'Ashley Neall won Best Use of Looking Glass at MIT Reality Hack 2024.', link: '', type: 'award' },
    { id: 'wagh-hackprinceton-2024', title: 'Pranav Wagh – Best Healthcare Hack at HackPrinceton 2024', date: '2024-03-01', summary: 'Pranav Wagh won Best Healthcare Hack at HackPrinceton 2024.', link: '', type: 'award' },
    { id: 'chakravarthula-rejoins-unc', title: 'Praneeth Chakravarthula Rejoins UNC as Tenure-Track Assistant Professor', date: '2024-01-01', summary: 'Praneeth Chakravarthula returns to UNC as a tenure-track Assistant Professor in the Department of Computer Science.', link: '', type: 'other' },
  ];
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

function main() {
  console.log('=== Data Transform ===\n');

  // Ensure data directory exists
  fs.mkdirSync(DATA_DIR, { recursive: true });

  const people = getPeopleData();
  const publications = getPublicationsData();
  const research = getResearchData();
  const news = getNewsData();

  // Check for duplicate IDs
  const checkDupes = (items: { id: string }[], name: string) => {
    const ids = items.map(x => x.id);
    const seen = new Set<string>();
    const dupes: string[] = [];
    for (const id of ids) {
      if (seen.has(id)) dupes.push(id);
      seen.add(id);
    }
    if (dupes.length > 0) {
      console.warn(`  ⚠ Duplicate IDs in ${name}: ${dupes.join(', ')}`);
      // Deduplicate by appending suffix
      const counts: Record<string, number> = {};
      for (const item of items) {
        counts[item.id] = (counts[item.id] || 0) + 1;
        if (counts[item.id] > 1) {
          item.id = `${item.id}-${counts[item.id]}`;
        }
      }
    }
  };

  checkDupes(people, 'people');
  checkDupes(publications, 'publications');
  checkDupes(research, 'research');
  checkDupes(news, 'news');

  // Write data files
  const write = (name: string, data: unknown) => {
    const filepath = path.join(DATA_DIR, name);
    const json = JSON.stringify(data, null, 2);
    // Validate
    JSON.parse(json);
    fs.writeFileSync(filepath, json);
    console.log(`  ✓ Wrote ${filepath}`);
  };

  write('people.json', people);
  write('publications.json', publications);
  write('research.json', research);
  write('news.json', news);

  console.log(`\nFinal counts:`);
  console.log(`  People: ${people.length}`);
  console.log(`  Publications: ${publications.length}`);
  console.log(`  Research: ${research.length}`);
  console.log(`  News: ${news.length}`);
}

main();
