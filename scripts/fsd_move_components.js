const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const componentMap = {
  ChangelogSection: "widgets/changelog/ChangelogSection",
  DynamicBreadcrumb: "features/breadcrumb/DynamicBreadcrumb",
  FloatingMenu: "widgets/floating-menu/FloatingMenu",
  Navbar: "widgets/navbar/Navbar",
  "navbar-wrapper": "widgets/navbar/navbar-wrapper",
  "block-sidetitle": "shared/ui/block-sidetitle/block-sidetitle",
  contents: "widgets/contents",
  default: "widgets/default",
  "features/taxonomy": "features/taxonomy",
  "floating-language-toggle": "features/language-switcher/floating-language-toggle",
  "language-toggle": "features/language-switcher/language-toggle",
  "floating-mode-toggle": "features/theme-switcher/floating-mode-toggle",
  "mode-toggle": "features/theme-switcher/mode-toggle",
  footer: "widgets/footer/footer",
  "history-tracker": "features/history-tracker/history-tracker",
  "json-ld": "shared/ui/seo/json-ld",
  layouts: "shared/ui/layouts",
  mdx: "shared/ui/mdx",
  note: "shared/ui/note/note",
  "project-logos": "entities/project/project-logos",
  "return-back": "features/navigation/return-back",
  "theme-provider": "shared/config/theme-provider/theme-provider",
  toc: "features/toc",
};

const srcDir = path.join(__dirname, "..", "src");
const componentsDir = path.join(srcDir, "components");

// 1. Rewrite imports in all files in src/ BEFORE moving
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

const files = walk(srcDir);
files.forEach((file) => {
  let content = fs.readFileSync(file, "utf8");
  let changed = false;

  // Replace exact occurrences
  for (const [oldName, newPath] of Object.entries(componentMap)) {
    // Regex to match exact import path, or subpaths
    // e.g. "@/components/Navbar" -> "@/widgets/navbar/Navbar"
    // e.g. "@/components/features/taxonomy/FilteredPostList" -> "@/features/taxonomy/FilteredPostList"
    const oldImport = `@/components/${oldName}`;
    const newImport = `@/${newPath}`;

    // Global replace for strings matching the partial prefix or exact
    const regex = new RegExp(`['"]${oldImport}(/?.*?)['"]`, "g");
    content = content.replace(regex, (match, suffix) => {
      changed = true;
      return `"${newImport}${suffix}"`;
    });
  }

  if (changed) {
    fs.writeFileSync(file, content, "utf8");
    console.log(`Updated imports in ${file}`);
  }
});

// 2. Move files to new locations
for (const [oldName, newPath] of Object.entries(componentMap)) {
  const oldFullPath = path.join(
    componentsDir,
    oldName +
      (oldName.includes("/") || !fs.existsSync(path.join(componentsDir, oldName + ".tsx"))
        ? ""
        : ".tsx"),
  );
  const newFullPath = path.join(
    srcDir,
    newPath + (path.extname(oldFullPath) || fs.statSync(oldFullPath).isDirectory() ? "" : ".tsx"),
  ); // handling dirs or files

  let oldTarget = path.join(componentsDir, oldName);
  // fallback for files without extension in map
  if (!fs.existsSync(oldTarget) && fs.existsSync(oldTarget + ".tsx")) {
    oldTarget += ".tsx";
  }

  if (fs.existsSync(oldTarget)) {
    const isDir = fs.statSync(oldTarget).isDirectory();
    let destDir = path.dirname(path.join(srcDir, newPath));
    if (isDir) {
      destDir = path.dirname(path.join(srcDir, newPath)); // The parent of the target dir
    }

    fs.mkdirSync(destDir, { recursive: true });

    let actualNewFullPath = path.join(srcDir, newPath);
    if (!isDir && !actualNewFullPath.endsWith(".tsx")) {
      actualNewFullPath += ".tsx";
    }

    fs.renameSync(oldTarget, actualNewFullPath);
    console.log(`Moved ${oldTarget} to ${actualNewFullPath}`);
  }
}

// remove empty components dir if it empty
try {
  execSync(`rm -rf ${componentsDir}`);
} catch (e) {}
console.log("Migration complete.");
