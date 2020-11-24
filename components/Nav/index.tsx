import { drawerMenus, profileMenus, topNavMenus } from '@root/data/menu'
import { useToggler } from 'molohooks'
import { memo } from 'react'
import CustomDrawer from './Drawer'
import TopBar from './TopBar'
export default memo(function Nav() {
  const [isDrawerOpen, openDrawer, closeDrawer] = useToggler()

  return (
    <>
      <TopBar
        onMenuClick={openDrawer}
        profileMenus={profileMenus}
        topMenus={topNavMenus}
      />

      <CustomDrawer
        isOpem={isDrawerOpen}
        menus={drawerMenus}
        onClose={closeDrawer}
      />
    </>
  )
})
