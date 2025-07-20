import { X } from '@phosphor-icons/react'
import { useEffect, type FC, type ReactElement, type ReactNode } from 'react'
import ReactDOM from 'react-dom'

import { Button } from '../button/button'
import styles from './modal.module.css'
import fontStyles from '@/fonts.module.css'

type Props = {
    open: boolean
    cancelFn?: () => void
    primaryFn?: () => void
    Content?: ReactElement
    titleContent?: ReactNode
    modalClassName?: string
}

export const Modal: FC<Props> = (props) => {
    const { open, cancelFn, primaryFn, titleContent, Content, modalClassName } = props

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) cancelFn?.()
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, cancelFn])

    if (!open) return null

    return ReactDOM.createPortal(
        <div className={styles.modalBackground}>
            <div className={`${styles.modalContainer} ${modalClassName}`}>
                {titleContent && (
                    <div className={`${fontStyles.poppinsMedium} ${styles.title}`}>
                        {titleContent}
                        <div className={styles.titleCloseBtn}>
                            {<X size={24} onClick={cancelFn} />}
                        </div>
                    </div>
                )}

                {Content && <div className={styles.body}>{Content}</div>}

                <div className={styles.footer}>
                    {cancelFn && <Button onClick={cancelFn}>Cancel</Button>}
                    {primaryFn && <Button onClick={primaryFn}>Continue</Button>}
                </div>
            </div>
        </div>,
        document.body,
    )
}
