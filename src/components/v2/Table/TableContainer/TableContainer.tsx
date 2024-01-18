import React from 'react'
import { forwardRef } from 'react'
import { Dropdown } from '../../../Dropdown/Dropdown'
import { Tabs } from '../../../Tabs/Tabs'
import { Props } from './TableContianer.types'
import './TableContainer.css'

const TableContainer = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    children,
    tabsList,
    activeTab,
    handleTabChange,
    sortbyList,
    handleSortByChange,
    sortBy
  } = props

  return (
    <div className="dui-table-container" ref={ref}>
      {tabsList.length || sortbyList?.length ? (
        <div className="dui-table-container__filters">
          {tabsList.length > 0 ? (
            <Tabs isFullscreen>
              {tabsList.map((tab) => (
                <Tabs.Tab
                  key={tab.value}
                  active={activeTab === tab.value}
                  onClick={() => {
                    handleTabChange && handleTabChange(tab.value)
                  }}
                >
                  <div className="dui-table-container__tabs">
                    {tab.displayValue}
                  </div>
                </Tabs.Tab>
              ))}
            </Tabs>
          ) : null}
          {sortbyList && (
            <Dropdown
              direction="left"
              className="dui-table-container__sort-by"
              value={sortBy}
              onChange={(_event, data) => {
                const value = data.value.toString()
                handleSortByChange && handleSortByChange(value)
              }}
              options={sortbyList}
            />
          )}
        </div>
      ) : null}
      {children}
    </div>
  )
})

export default TableContainer
