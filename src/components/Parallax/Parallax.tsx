import * as React from 'react'
import * as ParallaxJS from 'parallax-js'

export class Parallax extends React.PureComponent {
  scene: React.ReactNode
  parallax: any

  componentDidMount() {
    if (this.scene && typeof ParallaxJS === 'function') {
      this.parallax = new ParallaxJS(this.scene, this.props)
    }
  }

  componentWillUnmount() {
    if (this.parallax) {
      this.parallax.disable()
    }
  }

  static Layer = ({ depth, children, ...rest }) => {
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
  render() {
    return (
      <div className="dcl parallax" ref={scene => (this.scene = scene)}>
        {this.props.children}
      </div>
    )
  }
}
