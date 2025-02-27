import { useState } from 'react'
import Input from './Input'
import Select from './Select'
import Button from './Button'

export default function TaskFilterSort({ onFilterChange, onSortChange }) {
  const [filter, setFilter] = useState('')

  const sortOptions = [
    { value: '', label: 'Select' },
    { value: 'date', label: 'Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'nameAsc', label: 'Name A-Z' },
    { value: 'nameDesc', label: 'Name Z-A' },
  ]

  const handleFilterChange = (e) => {
    const value = e.target.value
    setFilter(value)
    onFilterChange(value)
  }

  const clearFilter = () => {
    setFilter('')
    onFilterChange('')
  }

  return (
    <div className='flex lg:flex-row flex-col justify-center p-10'>
      <div className="lg:mr-4">
        <Input
          type="text"
          label="Search"
          placeholder="Buy milk"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <div className="lg:mr-4">
        <Select
          id="sort"
          label="Sort by:"
          options={sortOptions}
          onChange={(e) => onSortChange(e.target.value)}
        />
      </div>
      <div className='flex items-end'>
        <Button
          valueLabel="Clear Filter"
          className="mt-4 lg:mt-0 p-2"
          onClick={clearFilter}
        />
      </div>
    </div>
  )
}