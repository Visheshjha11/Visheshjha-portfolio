const fs = require('fs');
const files = [
  './src/components/CaseStudies.tsx',
  './src/components/CaseStudySection.tsx',
  './src/pages/CaseStudy.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace background color
  content = content.replace(/bg-grit-900/g, 'bg-[#F5F5F5]');

  // Replace text colors
  content = content.replace(/text-white\/([0-9]+)/g, 'text-[#0a0a0a]/$1');
  content = content.replace(/text-white\b/g, 'text-[#0a0a0a]');
  
  // Replace border colors
  content = content.replace(/border-white\/([0-9]+)/g, 'border-[#0a0a0a]/$1');
  content = content.replace(/border-white\b/g, 'border-[#0a0a0a]');

  // First, fix the buttons text color where they were text-grit-900
  content = content.replace(/text-grit-900/g, 'text-[#F5F5F5]');
  
  // Replace specific bg-white classes (progress bars, accents)
  content = content.replace(/bg-white\/([0-9]+)/g, 'bg-[#0a0a0a]/$1');
  
  // Now replace bg-white
  content = content.replace(/bg-white\b/g, 'bg-[#0a0a0a]');

  // Replace hover states
  content = content.replace(/hover:bg-white\/([0-9]+)/g, 'hover:bg-[#0a0a0a]/$1');
  content = content.replace(/hover:bg-white\b/g, 'hover:bg-[#0a0a0a]');
  
  content = content.replace(/hover:text-white\/([0-9]+)/g, 'hover:text-[#0a0a0a]/$1');
  content = content.replace(/hover:text-white\b/g, 'hover:text-[#0a0a0a]');
  
  content = content.replace(/hover:border-white\/([0-9]+)/g, 'hover:border-[#0a0a0a]/$1');
  content = content.replace(/hover:border-white\b/g, 'hover:border-[#0a0a0a]');

  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});
