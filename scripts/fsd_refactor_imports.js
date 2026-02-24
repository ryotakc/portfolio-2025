const fs = require("fs");
const path = require("path");

const directory = "./src";

const replacements = [
  { from: /@\/components\/ui\//g, to: "@/shared/ui/" },
  { from: /@\/lib\//g, to: "@/shared/lib/" },
  { from: /@\/types\//g, to: "@/shared/types/" },
  { from: /@\/config\//g, to: "@/shared/config/" },
  { from: /@\/assets\//g, to: "@/shared/assets/" },
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith(".ts") || file.endsWith(".tsx")) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(directory);
let updatedCount = 0;

files.forEach((file) => {
  let content = fs.readFileSync(file, "utf8");
  const originalContent = content;
  let changed = false;

  for (const { from, to } of replacements) {
    if (content.match(from)) {
      content = content.replace(from, to);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content, "utf8");
    updatedCount++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Updated ${updatedCount} files.`);
