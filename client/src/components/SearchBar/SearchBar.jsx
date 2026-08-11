import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const SearchBar = ({
  value = '',
  onChange,
  placeholder = 'Search products, SKU, specs...',
  variant = 'default',
  onSubmit,
  className = ''
}) => {
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isControlled = onChange !== undefined
  const [localValue, setLocalValue] = useState(value)
  const searchValue = isControlled ? value : localValue

  const handleChange = (e) => {
    const val = e.target.value
    if (!isControlled) setLocalValue(val)
    if (onChange) onChange(val)
  }

  const handleClear = (e) => {
    e.stopPropagation()
    if (!isControlled) setLocalValue('')
    if (onChange) onChange('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (onSubmit) {
        onSubmit(searchValue)
      } else if (!isControlled && searchValue.trim()) {
        const params = new URLSearchParams()
        params.set('q', searchValue.trim())
        if (location.pathname.startsWith('/products')) {
          navigate(`${location.pathname}?${params.toString()}`)
        } else {
          navigate(`/products?${params.toString()}`)
        }
      }
    }
  }

  const baseInputClass = 'w-full bg-transparent text-[13px] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0'

  if (variant === 'minimal') {
    return (
      <div className={`relative ${className}`}>
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" strokeWidth={2} />
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={`pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-200 rounded-xl w-full transition-all duration-200 ${
            focused
              ? 'border-red-500/50 shadow-[0_0_0_4px_rgba(212,83,15,0.08)]'
              : 'hover:border-slate-300'
          }`}
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <div
        className={`flex items-center gap-2 bg-white border rounded-full transition-all duration-200 overflow-hidden ${
          focused
            ? 'border-red-500/50 shadow-[0_0_0_4px_rgba(212,83,15,0.08)]'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <div className="pl-4 text-slate-400">
          <Search size={16} strokeWidth={2} />
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={`py-2.5 pr-2 flex-1 ${baseInputClass}`}
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="mr-1.5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
        <button
          type="button"
          onClick={() => onSubmit ? onSubmit(searchValue) : handleKeyDown({ key: 'Enter' })}
          className="m-1 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold uppercase tracking-wider rounded-full transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchBar
