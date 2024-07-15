import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AssetStatusFilter } from './AssetStatusFilter'
import { AssetStatusFilterProps } from './AssetStatusFilter.types'
import { i18n } from './constants'

function renderAssetStatusFilter(props: Partial<AssetStatusFilterProps> = {}) {
  return render(
    <AssetStatusFilter
      value={undefined}
      i18n={i18n}
      onChange={jest.fn()}
      {...props}
    />
  )
}

let renderedComponent: ReturnType<typeof renderAssetStatusFilter>

describe('when rendering the component', () => {
  beforeEach(() => {
    renderedComponent = renderAssetStatusFilter()
  })

  it.each(Object.values(i18n.status))(
    'should render the %s option',
    (status) => {
      const { getByText } = renderedComponent

      expect(getByText(status)).toBeInTheDocument()
    }
  )
})

describe.each(Object.keys(i18n.status))(
  'when clicking the %s option',
  (status) => {
    let onChange: jest.Mock

    beforeEach(() => {
      onChange = jest.fn()
      renderedComponent = renderAssetStatusFilter({ onChange })
    })

    it(`should call the onChange callback prop with the ${i18n.status[status]} value`, () => {
      const { getByText } = renderedComponent
      userEvent.click(getByText(i18n.status[status]))
      expect(onChange).toHaveBeenCalledWith(status)
    })
  }
)
