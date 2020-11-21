import { drawerMenus, profileMenus, topNavMenus } from '@root/data/menu'
import { useToggler } from 'molohooks'
import CustomDrawer from './Drawer'
import TopBar from './TopBar'
export default function Nav() {
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
}
