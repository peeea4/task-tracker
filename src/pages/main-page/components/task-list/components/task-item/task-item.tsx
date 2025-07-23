import { DotsThreeIcon } from '@phosphor-icons/react'
import type { FC } from 'react'
import React, { useEffect } from 'react'
import { useRef, useState } from 'react'

import { EditTaskItemModal } from './components'
import styles from './task-item.module.css'
import fontStyles from '@/fonts.module.css'
import { useShowModal } from '@/shared/hooks'
import { useTaskListStore } from '@/shared/store'

import { type ITaskItem } from '@/shared/types/data-model'

type Props = ITaskItem

export const TaskItem: FC<Props> = ({ id, content, status, priority, labels, updatedAt, createdAt }) => {
    const { title } = content
    const { deleteTask } = useTaskListStore()

    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const popoverRef = useRef<HTMLDivElement>(null)
    const { isModalVisible, showModal, hideModal } = useShowModal()

    const handleDeleteTask = () => {
        setIsPopoverOpen(false)
        deleteTask(id)
    }

    const handleEditButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        showModal()
        setIsPopoverOpen(false)
    }

    // Закрытие popover при клике вне его
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsPopoverOpen(false)
            }
        }
        if (isPopoverOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isPopoverOpen])

    // const priorityClassName =
    //     priority === PRIORITY.LOW ? styles.low : PRIORITY.HIGH ? styles.high : styles.medium

    return (
        <div className={styles.task} style={{ position: 'relative' }}>
            {/* <div className={`${priorityClassName} ${styles.priority}`} /> */}

            <div className={`${fontStyles.poppinsLight} ${styles.id}`}>ID-{id.slice(8)}</div>

            <div className={`${fontStyles.poppinsMedium} ${styles.title}`}>{title}</div>

            <div
                className={styles.deleteTaskIcon}
                onClick={() => setIsPopoverOpen((prev) => !prev)}
                ref={popoverRef}
                style={{ position: 'relative' }}
            >
                <DotsThreeIcon size={32} color="#fffcf2" weight="bold" />
                {isPopoverOpen && (
                    <div className={styles.popoverMenu}>
                        <button className={styles.popoverButton} onClick={handleDeleteTask}>
                            Delete
                        </button>
                        <button className={styles.popoverButton} onClick={handleEditButtonClick}>
                            Edit
                        </button>
                    </div>
                )}
            </div>

            {isModalVisible && (
                <EditTaskItemModal isModalVisible={isModalVisible} hideModal={hideModal} task={{ id, content, status, priority, labels, updatedAt, createdAt }} />
            )}
        </div>
    )
}
