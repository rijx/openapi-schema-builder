const mapping = {
  "release::breaking": "major",
  "release::feature": "minor",
  "release::fix": "patch"
};

const incrementsByLabel = process.env.CI_MERGE_REQUEST_LABELS.split(/,/g)
  .map(x => mapping[x.trim()])
  .filter(Boolean);

if (incrementsByLabel.length > 1) {
  throw new Error("Multiple matching labels were specified");
}

process.stdout.write(`${incrementsByLabel[0] || ""}\n`);
