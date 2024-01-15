import React from 'react'
import classNames from 'classnames'
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'

import { Back } from '../../Back/Back'
import { NavbarPages } from '../Navbar.types'
import { SubMenuProps } from './SubMenu.types'
import { SubMenuColumn } from '../SubMenuColumn/SubMenuColumn'
import { SubMenuItem } from '../SubMenuItem/SubMenuItem'

import './SubMenu.css'

export const SubMenu = (props: SubMenuProps) => {
  const {
    selectedMenu,
    onToggleShowSubMenu,
    onClickMenuOption,
    isMobile,
    submenus
  } = props

  return (
    <div
      className={classNames(
        'dui-submenu-container',
        `${selectedMenu}-selected`,
        isMobile && 'mobile'
      )}
    >
      {Object.keys(submenus).map((key) => {
        const section = key as NavbarPages
        const submenu = submenus[section]
        return (
          <Menu.Item
            key={key}
            className={classNames('submenu', `${section}-submenu`)}
            onMouseEnter={(e: React.MouseEvent) =>
              !isMobile && onToggleShowSubMenu(e, true, section)
            }
            onMouseLeave={(e: React.MouseEvent) =>
              !isMobile && onToggleShowSubMenu(e, false, section)
            }
          >
            <div className="submenu-column__wrapper">
              {isMobile && (
                <Back
                  absolute
                  onClick={(e) => onToggleShowSubMenu(e, false, section)}
                >
                  Back
                </Back>
              )}
              <SubMenuColumn title={submenu.column1Title}>
                {submenu.column1.map((item, index) => (
                  <SubMenuItem
                    key={index}
                    isExternal={item.isExternal}
                    title={item.title}
                    description={item.description}
                    href={item.url}
                    eventTrackingName={item.eventTrackingName}
                    onClickMenuOption={onClickMenuOption}
                  />
                ))}
              </SubMenuColumn>
              <SubMenuColumn title={submenu.column2Title}>
                {submenu.column2.map((item, index) => (
                  <SubMenuItem
                    key={index}
                    isExternal={item.isExternal}
                    title={item.title}
                    description={item.description}
                    href={item.url}
                    eventTrackingName={item.eventTrackingName}
                    onClickMenuOption={onClickMenuOption}
                  />
                ))}
              </SubMenuColumn>
              {!!submenu.column3 && (
                <SubMenuColumn title={submenu.column3Title}>
                  {submenu.column3.map((item, index) => (
                    <SubMenuItem
                      key={index}
                      isExternal={item.isExternal}
                      title={item.title}
                      description={item.description}
                      href={item.url}
                      eventTrackingName={item.eventTrackingName}
                      onClickMenuOption={onClickMenuOption}
                    />
                  ))}
                </SubMenuColumn>
              )}
            </div>
          </Menu.Item>
        )
      })}
    </div>
  )
}
