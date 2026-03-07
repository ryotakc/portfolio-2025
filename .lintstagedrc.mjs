import path from "path";

const buildEslintCommand = (filenames) =>
  `next lint --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(" --file ")}`;

export default {
  "*": [
    "biome format --write --no-errors-on-unmatched",
    "biome check --write --no-errors-on-unmatched",
  ],
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
};
