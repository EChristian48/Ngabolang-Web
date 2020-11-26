import classes from '@root/styles/Masonry.module.css'
import { Masonry, MasonryProps } from 'masonic'
import { memo } from 'react'

export default memo(function (props: MasonryProps<any>) {
  return <Masonry {...props} className={classes.masonry} />
})
