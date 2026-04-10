import { type ChangeEvent, type FC } from 'react'
import styles from './input.module.css'

type Props = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    label?: string
    testId?: string
}

export const Input: FC<Props> = ({ value, onChange, placeholder, testId }) => {
    return (
        <input
            className={styles.input}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            data-testid={testId}
        />
    )
}
