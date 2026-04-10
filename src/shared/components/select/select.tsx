import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react'
import { clsx } from 'clsx'
import { useState, useRef, useEffect, type FC } from 'react'
import styles from './select.module.css'
import { TestId } from '@/shared/constants'

export interface Option {
    value: string
    label: string
}

interface Props {
    options: Option[]
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
    testId?: string
}

export const Select: FC<Props> = ({ options, value, onChange, placeholder, testId }) => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const selectedOption = options.find((option) => option.value === value)

    return (
        <div className={clsx(styles.select, styles.fullWidth)} ref={ref}>
            <div
                className={styles.selected}
                onClick={() => setIsOpen((prev) => !prev)}
                tabIndex={0}
                role="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                data-testid={testId}
            >
                {selectedOption ? selectedOption.label : placeholder || 'Выберите...'}

                {isOpen ? <CaretUpIcon size={24} /> : <CaretDownIcon size={24} />}
            </div>

            {isOpen && (
                <ul className={styles.options} role="listbox">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={
                                option.value === value ? styles.optionSelected : styles.option
                            }
                            onClick={() => {
                                onChange(option.value)
                                setIsOpen(false)
                            }}
                            role="option"
                            aria-selected={option.value === value}
                            data-testid={testId + option.value}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
