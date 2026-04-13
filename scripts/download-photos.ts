/**
 * Downloads people photos from telepresence.web.unc.edu to public/images/people/.
 *
 * Usage: npx ts-node scripts/download-photos.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'people');

interface PhotoEntry {
  slug: string;
  url: string;
}

const PHOTOS: PhotoEntry[] = [
  { slug: 'henry-fuchs', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/fuchs_henry_11_002-wpcf_120x80.jpg' },
  { slug: 'praneeth-chakravarthula', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/dp-wpcf_100x100.jpg' },
  { slug: 'adrian-ilie', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/ilie-wpcf_67x100.png' },
  { slug: 'kurtis-keller', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/Kurtis-wpcf_85x100.jpg' },
  { slug: 'jim-mahaney', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/Mahaney-wpcf_120x160-wpcf_75x100.jpg' },
  { slug: 'andrei-state', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/andrei3-wpcf_120x97.jpg' },
  { slug: 'jade-kandel', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2023/01/JadeKandel-wpcf_96x100.jpg' },
  { slug: 'youngjoong-kwon', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2019/08/YoungJoong-Kwon-wpcf_100x100.jpeg' },
  { slug: 'conny-lu', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2018/02/connylu_100x100-wpcf_96x100.jpg' },
  { slug: 'chenyang-ma', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2024/03/Chenyang-Ma-wpcf_100x100.jpg' },
  { slug: 'emre-onemli', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2023/02/emre-onemli-photo-wpcf_99x100.jpeg' },
  { slug: 'akshay-paruchuri', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2021/10/akshay-updated-wpcf_100x100.jpeg' },
  { slug: 'ryan-schmelzle', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2023/01/RyanSchmelzle-wpcf_75x100.jpeg' },
  { slug: 'shengze-wang', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2021/10/ShengzeWang-wpcf_115x100.jpg' },
  { slug: 'qian-zhang', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2019/08/qian-zhang-wpcf_71x100.png' },
  { slug: 'jayden-lim', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2024/04/Jayden_Lim-wpcf_100x100.png' },
  { slug: 'ashley-neall', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2023/01/Ashley-Neall-wpcf_95x100.jpg' },
  { slug: 'anselmo-lastra', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/lastra-wpcf_68x100.jpeg' },
  { slug: 'marc-levoy', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2017/03/marc-levoy-wpcf_100x100.jpg' },
  { slug: 'gregory-turk', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2017/03/gregory-turk-wpcf_82x100.jpg' },
  { slug: 'gary-bishop', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2017/03/garyBishop100x100.png' },
  { slug: 'ramesh-raskar', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2017/03/ramesh-raskar-wpcf_72x100.jpg' },
  { slug: 'andrew-maimone', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/andrew-maimone-wpcf_67x100.jpg' },
  { slug: 'david-dunn', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2014/03/headshot_cropped-wpcf_100x100.jpg' },
  { slug: 'peter-lincoln', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/plincoln-wpcf_100x100.jpg' },
  { slug: 'mingsong-dou', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2016/12/mingsongDou100x100.jpg' },
  { slug: 'tabitha-peck', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2017/03/tabitha-peck-wpcf_100x100.jpg' },
  { slug: 'victoria-interrante', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2017/03/victoriaInterrante100x100-wpcf_96x100.jpg' },
  { slug: 'ulrich-neumann', url: 'https://telepresence.web.unc.edu/wp-content/uploads/sites/11620/2017/03/ulrich-neumann-wpcf_100x100.jpg' },
];

function main() {
  console.log('=== Photo Downloader ===\n');

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const { slug, url } of PHOTOS) {
    const ext = url.match(/\.(jpe?g|png|gif|webp)/i)?.[1] || 'jpg';
    const outPath = path.join(OUTPUT_DIR, `${slug}.${ext}`);

    if (fs.existsSync(outPath)) {
      skipped++;
      continue;
    }

    try {
      execSync(`curl -sL -o "${outPath}" "${url}" --max-time 15 --fail`, { stdio: 'pipe' });
      const stat = fs.statSync(outPath);
      if (stat.size < 500) {
        fs.unlinkSync(outPath);
        failed++;
        console.log(`  ✗ ${slug} (file too small)`);
      } else {
        downloaded++;
        console.log(`  ✓ ${slug}`);
      }
    } catch {
      failed++;
      console.log(`  ✗ ${slug} (download failed)`);
      if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
    }
  }

  console.log(`\nSummary: Downloaded ${downloaded}, Skipped ${skipped}, Failed ${failed}`);
}

main();
