import 'semantic-ui-css/semantic.min.css'
import './themes/base-theme.css'

/*
  Hi there,
  You might be wondering why do we import all the components first and then we export
  them all together instead of doing `export { Component } from './components/..'` ?
  The reason is because if we did so that'd screw up the order on which all the chunks 
  get bundled in the final CSS file, which is:
    1. Semantic's CSS
    2. Our base theme CSS
    3. All the components specific CSS
  If we use the `export from` syntax for some reason (I didn't dig too much into this) 
  all the components specific CSS chunks get bundled at the BEGINING of the file, 
  before Semantic's CSS, resulting in lots of cascading issues and broken styles..
  
  ¯\_(ツ)_/¯ 
*/
import { Button } from './components/Button/Button'

export { Button }
