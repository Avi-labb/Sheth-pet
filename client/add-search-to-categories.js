import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const categoryDir = path.join(__dirname, 'src', 'pages', 'Category')

const files = [
  'Bottles.jsx',
  'Jars.jsx',
  'Caps.jsx',
  'Preforms.jsx',
  'Pharmaceutical.jsx',
  'Personal Care.jsx',
  'Food & Beverages.jsx',
  'Home Care.jsx',
  'Industrial.jsx',
]

const categoryNames = {
  'Bottles.jsx': 'Bottles',
  'Jars.jsx': 'Jars',
  'Caps.jsx': 'Caps',
  'Preforms.jsx': 'Preforms',
  'Pharmaceutical.jsx': 'Pharmaceutical',
  'Personal Care.jsx': 'Personal Care',
  'Food & Beverages.jsx': 'Food & Beverages',
  'Home Care.jsx': 'Home Care',
  'Industrial.jsx': 'Industrial',
}

for (const file of files) {
  const filePath = path.join(categoryDir, file)
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${file}`)
    continue
  }
  const catName = categoryNames[file]
  let content = fs.readFileSync(filePath, 'utf8')

  console.log(`\nProcessing: ${file} (${catName})`)

  // 1. Update imports
  if (!content.includes('useLocation')) {
    content = content.replace(
      "import { Link, useNavigate } from 'react-router-dom'",
      "import { Link, useNavigate, useLocation } from 'react-router-dom'"
    )
  }
  if (!content.includes('filterProductsBySearch')) {
    content = content.replace(
      "import { sortFamilyFirst } from '../../utils/helper'",
      "import { sortFamilyFirst, filterProductsBySearch } from '../../utils/helper'"
    )
    // For files that didn't import sortFamilyFirst at all
    if (!content.includes("import { sortFamilyFirst")) {
      content = content.replace(
        "from '../../utils/helper'",
        "import { sortFamilyFirst, filterProductsBySearch } from '../../utils/helper'\nimport XPLACEHOLDER from '../../utils/helper'"
      )
      content = content.replace("import XPLACEHOLDER from '../../utils/helper'\n", '')
      // If there was no import from helper at all, add it
      if (!content.includes("from '../../utils/helper'")) {
        const lastImportLine = [...content.matchAll(/^import .*$/gm)].pop()
        if (lastImportLine) {
          const idx = lastImportLine.index + lastImportLine[0].length
          content = content.slice(0, idx) + "\nimport { sortFamilyFirst, filterProductsBySearch } from '../../utils/helper'\nimport SearchBar from '../../components/SearchBar/SearchBar'" + content.slice(idx)
        }
      }
    }
  }
  if (!content.includes("SearchBar from")) {
    const lastImport = [...content.matchAll(/^import .*$/gm)].pop()
    if (lastImport) {
      const idx = lastImport.index + lastImport[0].length
      content = content.slice(0, idx) + "\nimport SearchBar from '../../components/SearchBar/SearchBar'" + content.slice(idx)
    }
  }

  // 2. Add location = useLocation() after navigate
  if (!content.includes('const location = useLocation()')) {
    content = content.replace(
      "const navigate = useNavigate()\n",
      "const navigate = useNavigate()\n const location = useLocation()\n"
    )
  }

  // 3. Add searchQuery state before filter state comment
  if (!content.includes('searchQuery')) {
    content = content.replace(
      "// Filter state",
      "const [searchQuery, setSearchQuery] = useState('')\n // Filter state"
    )
  }

  // 4. Update applyFilters: add search filter before neck size filter
  if (!content.includes('// Search filter (apply first)')) {
    content = content.replace(
      "const applyFilters = () => {\n let filtered = [...products]\n\n // Neck size filter",
      "const applyFilters = () => {\n let filtered = [...products]\n\n // Search filter (apply first)\n filtered = filterProductsBySearch(filtered, searchQuery)\n\n // Neck size filter"
    )
  }

  // 5. Update useEffect deps: add searchQuery
  if (!content.includes('[products, searchQuery')) {
    content = content.replace(
      "[products, selectedNeckSizes, volumeMin, volumeMax, weightMin, weightMax]",
      "[products, searchQuery, selectedNeckSizes, volumeMin, volumeMax, weightMin, weightMax]"
    )
  }

  // 6. Update the first useEffect (mount) to read URL q param and reset search
  const oldUseEffectMount = "useEffect(() => {\n fetchProducts()\n fetchNeckSizes()\n }, [])"
  const newUseEffectMount = `useEffect(() => {\n fetchProducts()\n fetchNeckSizes()\n // Read search from URL ?q= param\n const params = new URLSearchParams(location.search)\n const q = params.get('q')\n setSearchQuery(q || '')\n }, [])`
  if (!content.includes('Read search from URL')) {
    content = content.replace(oldUseEffectMount, newUseEffectMount)
  }

  // 7. Add SearchBar UI: replace the result header div with search + result
  const _oldHeader = `<div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-600">
 <span className="font-mono text-[11px] uppercase tracking-wider text-slate-700">
 Class Classification Matrix
 </span>
 <span className="font-mono text-[10px] uppercase tracking-widest text-slate-700">
 Showing {filteredProducts.length} Items
 </span>
 </div>`
  // Alternative version with just Showing X Items (some files have this format slightly different)
  const _oldHeaderAlt = /<div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-600">[\s\S]*?<\/div>\s*\n/.source

  const newHeader = `<div className="mb-8 space-y-5">
   <SearchBar
     variant="default"
     value={searchQuery}
     onChange={setSearchQuery}
     placeholder="Search ${catName}..."
   />
   <div className="flex items-center justify-between pt-1 pb-3 border-b border-slate-600">
     <span className="font-mono text-[11px] uppercase tracking-wider text-slate-700">
       Class Classification Matrix
     </span>
     <span className="font-mono text-[10px] uppercase tracking-widest text-slate-700">
       Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'}
       {searchQuery && \` for "\${searchQuery}"\`}
     </span>
   </div>
 </div>`

  if (content.includes('<div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-600">')) {
    const regex = /<div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-600">[\s\S]*?<\/span>\s*<\/div>\s*<\/div>\n/
    if (!content.includes('SearchBar\n     variant')) {
      const found = content.match(regex)
      if (found) {
        content = content.replace(regex, newHeader + '\n')
      } else {
        content = content.replace(
          '<div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-600">',
          `<div className="mb-8 space-y-5">\n   <SearchBar\n     variant="default"\n     value={searchQuery}\n     onChange={setSearchQuery}\n     placeholder="Search ${catName}..."\n   />\n   <div className="flex items-center justify-between pt-1 pb-3 border-b border-slate-600">`
        )
        // Fix the count line
        content = content.replace(
          `Showing {filteredProducts.length} Items\n </span>\n </div>`,
          `Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'}\n       {searchQuery && \` for "\${searchQuery}"\`}\n     </span>\n   </div>\n </div>`
        )
      }
    }
  }

  // Ensure sortFamilyFirst is applied at end of applyFilters (some pages just have setFilteredProducts(filtered))
  // Only fix if not already using sortFamilyFirst
  const setFilteredRegex = /setFilteredProducts\(filtered\)(?!;?\s*\n?\s*\/\/)/
  if (content.match(setFilteredRegex)) {
    // Already uses sortFamilyFirst check
    const sortCheck = content.match(/setFilteredProducts\(sortFamilyFirst\(filtered\)\)/)
    if (!sortCheck) {
      content = content.replace(
        "setFilteredProducts(filtered)",
        "setFilteredProducts(sortFamilyFirst(filtered))"
      )
    }
  }

  fs.writeFileSync(filePath, content, 'utf8')
  console.log(`✅ DONE: ${file}`)
}

console.log('\n✅ All category files updated!')
