import * as React from 'react'
import * as ParallaxJS from 'parallax-js'

export class Parallax extends React.PureComponent {
  scene: React.ReactNode
  // Simple fix for parallax not having types
  parallax: { disable(): void }

  componentDidMount(): void {
    if (this.scene && typeof ParallaxJS === 'function') {
      this.parallax = new ParallaxJS(this.scene, this.props)
    }
  }

  componentWillUnmount(): void {
    if (this.parallax) {
      this.parallax.disable()
    }
  }

  static Layer = ({
    depth,
    children,
    ...rest
  }: React.HTMLAttributes<HTMLDivElement> & { depth: number }): JSX.Element => {
    const props = {
      'data-depth': depth,
      ...rest
    }
    return (
      <div className="layer" {...props}>
        {children}
      </div>
    )
  }
  render(): JSX.Element {
    return (
      <div className="dcl parallax" ref={(scene) => (this.scene = scene)}>
        {this.props.children}
      </div>
    )
  }
}
