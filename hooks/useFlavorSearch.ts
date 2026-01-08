import { useState, useEffect, useCallback } from 'react'

// 风味类型
export interface Flavor {
  id: string
  name: string
  nameEn: string | null
  category: string
  subCategory: string | null
  type: 'good' | 'bad'
  description: string | null
}

// 防抖 Hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export function useFlavorSearch() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState<'good' | 'bad' | ''>('')
  const [results, setResults] = useState<Flavor[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 防抖：用户停止输入 300ms 后才搜索
  const debouncedQuery = useDebounce(query, 300)

  // 搜索函数
  const search = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (debouncedQuery) params.set('q', debouncedQuery)
      if (type) params.set('type', type)

      const response = await fetch(`/api/flavors?${params.toString()}`)
      const result = await response.json()

      if (result.success) {
        setResults(result.data)
      } else {
        setError(result.error || '搜索失败')
      }
    } catch {
      setError('网络错误，请重试')
    } finally {
      setLoading(false)
    }
  }, [debouncedQuery, type])

  // 监听搜索条件变化
  useEffect(() => {
    search()
  }, [search])

  // 重置
  const reset = useCallback(() => {
    setQuery('')
    setType('')
  }, [])

  return {
    query,
    setQuery,
    type,
    setType,
    results,
    loading,
    error,
    reset,
  }
}