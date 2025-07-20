import { type ChangeEvent, type FC } from 'react'
import styles from './input.module.css'
import fontStyles from '@/fonts.module.css'

type Props = {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    label?: string
}

export const Input: FC<Props> = ({ value, onChange, placeholder }) => {
    return (
        <input
            className={`${fontStyles.poppinsLight} ${styles.input}`}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}
