import type { FC, ReactNode } from 'react'

import styles from './button.module.css'

type Props = {
    onClick?: () => void
    children: ReactNode
    className?: string
    testId?: string
}

export const Button: FC<Props> = ({ onClick, children, className, testId }) => {
    return (
        <button
            className={`${styles.button} ${className || ''}`}
            onClick={onClick}
            data-testid={testId || ''}
        >
            {children}
        </button>
    )
}
