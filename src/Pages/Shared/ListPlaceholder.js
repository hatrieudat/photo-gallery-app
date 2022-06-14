import clsx from 'clsx'
import React, { memo } from 'react'
import { Placeholder } from 'react-bootstrap'

import styles from './shared.module.scss'

const ListPlaceholder = ({ length }) => {
    return (
        <div className={clsx(styles.imageWrapper, 'my-5')}>
            {Array.from({ length: length }).map((_, idx) => {
                let random = Math.floor(Math.random() * 2) ? '0px' : '150px'
                return (
                    <Placeholder key={idx} as='div' animation='glow' className={clsx('text-center', styles.placeholder)}>
                        <Placeholder className='w-100 rounded' bg='secondary' style={{ height: `calc(40vh + ${random})` }}></Placeholder>
                    </Placeholder>
                )
            })}
        </div>
    )
}

export default memo(ListPlaceholder)