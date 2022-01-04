import * as React from 'react'
import { ProviderType } from '@dcl/schemas/dist/dapps/provider-type'
import BaseLoader, {
  LoaderProps as BaseLoaderProps
} from 'semantic-ui-react/dist/commonjs/elements/Loader/Loader'
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
    return <BaseLoader {...this.props} className={this.getClassName()} />
  }
}
