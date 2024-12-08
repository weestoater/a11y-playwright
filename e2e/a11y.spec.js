const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright");
const fs = require("fs");

const urls = require("../e2e/urls.json");
const { traverse } = require("../utils/lib");

test("can traverse urls", async ({ page }) => {
  let results = [];
  let violations = [];
  results = traverse(urls);
  const testUrls = results.length;
  for (let i = 0; i < testUrls; i++) {
    await page.goto(results[i].url);
    const a11yScanResults = await new AxeBuilder({ page })
      .withTags([
        "wcag2a",
        "wcag2aa",
        "wcag21a",
        "wcag21aa",
        "wcag22a",
        "wcag22aa",
      ])
      .analyze();
    expect(a11yScanResults.violations).toEqual([]);

    if (a11yScanResults.violations.length > 0) {
      violations.push(a11yScanResults.violations);
    }

    if (violations.length > 0) {
      let data = JSON.stringify(violations);
      fs.writeFile("../output/violations.txt", data, (err) => {
        if (err) throw err;
      });
    }
  }
});
