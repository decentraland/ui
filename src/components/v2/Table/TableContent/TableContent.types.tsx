import React from 'react'

export type Props = {
  activePage?: number
  data: DataTableType[]
  isLoading: boolean
  setPage?: (page: number) => void
  totalPages?: number | null
  empty: () => void
  total: number | null
  rowsPerPage?: number
  mobileTableBody?: React.ReactNode
  hasHeaders?: boolean
  customHeaders?: Record<string, string | React.ReactNode>
  i18n?: {
    sortBy: {
      showing: string
      of: string
    }
  }
}

export type DataTableType = {
  [key: string]: React.ReactNode
}
