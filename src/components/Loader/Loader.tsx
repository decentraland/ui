import * as React from 'react'
import { ProviderType } from '@dcl/schemas/dist/dapps/provider-type'
import {
  Loader as BaseLoader,
  LoaderProps as BaseLoaderProps
} from 'semantic-ui-react'
import './Loader.css'

export interface LoaderProps extends BaseLoaderProps {
  provider?: ProviderType
}

export class Loader extends React.PureComponent<LoaderProps> {
  getClassName() {
    return [this.props.className || '', this.props.provider || '']
      .join(' ')
      .trim()
  }

  render(): JSX.Element {
    return (
      <BaseLoader
        aria-live="polite"
        aria-label="Loading"
        role="status"
        {...this.props}
        className={this.getClassName()}
      />
    )
  }
}
