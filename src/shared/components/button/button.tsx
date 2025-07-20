import type { FC, ReactNode } from 'react'
import fontStyles from '../../../fonts.module.css'
import styles from './button.module.css'


type Props = {
    onClick?: () => void
    children: ReactNode
    className?: string
}

export const Button: FC<Props> = ({ onClick, children, className }) => {
    return (
        <button className={`${styles.button} ${fontStyles.poppinsMedium} ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}
