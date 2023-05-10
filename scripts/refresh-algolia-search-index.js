// Node based version of the original Ruby script used to index the documentation.
// Author: GPT 4.0
// Usage: npm run postbuild

const fs = require("fs")
const path = require("path")
const { JSDOM } = require("jsdom")
const algoliasearch = require("algoliasearch")
const dotenv = require("dotenv")

dotenv.config({ path: ".env.local" })

const BASE_URL = process.env.BASE_URL

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_DOCSEARCH_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
)

const index = algoliaClient.initIndex(process.env.NEXT_PUBLIC_DOCSEARCH_INDEX_NAME)

function listHtmlFiles(dir, fileList) {
  const files = fs.readdirSync(dir)
  fileList = fileList || []

  files.forEach((file) => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      fileList = listHtmlFiles(path.join(dir, file), fileList)
    } else if (file.endsWith(".html")) {
      fileList.push(path.join(dir, file))
    }
  })

  return fileList
}

const objects = listHtmlFiles("out").flatMap((htmlFile) => {
  if (htmlFile === "out/404.html" || htmlFile === "out/index.html") {
    return []
  }

  const articleUrl = `${BASE_URL}${htmlFile.replace("out/", "/").replace(".html", "")}`
  const content = fs.readFileSync(htmlFile, "utf-8")
  const dom = new JSDOM(content)
  const article = dom.window.document.querySelector("article")

  const lvl0 = htmlFile.split("/")[1].split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
  const lvl1 = dom.window.document.querySelector("nav [aria-current='page']").textContent

  let currentHeader = null
  let currentAnchor = null
  const sections = []

  for (const child of article.children) {
    if (child.tagName === "H1") {
      currentHeader = child
      sections.push({
        objectID: `${sections.length}-${articleUrl}`,
        content: child.textContent,
        type: "lvl1",
        url: articleUrl,
        hierarchy: {
          lvl0: lvl0,
          lvl1: lvl1,
        },
      })
    } else if (child.tagName === "H2") {
      currentHeader = child
      currentAnchor = child.id ? `#${child.id}` : ""

      sections.push({
        objectID: `${sections.length}-${articleUrl}`,
        content: child.textContent,
        type: "lvl2",
        url: `${articleUrl}${currentAnchor}`,
        hierarchy: {
          lvl0: lvl0,
          lvl1: lvl1,
          lvl2: currentHeader.textContent,
        },
      })
    } else {
      if (sections.length > 0) {
        sections[sections.length - 1].content += child.textContent
      }
    }
  }

  return sections
})

console.log(`Indexing ${objects.length} objects...`)

index.replaceAllObjects(objects)
