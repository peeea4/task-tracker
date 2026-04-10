import { DotsThreeIcon } from '@phosphor-icons/react'
import type { FC } from 'react'
import React, { useEffect } from 'react'
import { useRef, useState } from 'react'

import { DeleteTaskItemModal, EditTaskItemModal } from './components'
import styles from './task-item.module.css'

import { useShowModal } from '@/shared/hooks'

import { type ITaskItem, Priority } from '@/shared/types'

type Props = ITaskItem & {
    testId?: string
}

export const TaskItem: FC<Props> = ({
    id,
    content,
    status,
    priority,
    updatedAt,
    createdAt,
    testId,
}) => {
    const { title } = content

    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const popoverRef = useRef<HTMLDivElement>(null)
    const { isModalVisible, showModal, hideModal } = useShowModal()
    const {
        isModalVisible: isDeleteModalVisible,
        showModal: showDeleteModal,
        hideModal: hideDeleteModal,
    } = useShowModal()

    const handleDeleteTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setIsPopoverOpen(false)
        showDeleteModal()
    }

    const handleEditButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        showModal()
        setIsPopoverOpen(false)
    }

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

    // Маппинг количества полосок для каждого приоритета
    const priorityLevels = {
        [Priority.MINOR]: 1,
        [Priority.LOW]: 2,
        [Priority.MEDIUM]: 3,
        [Priority.HIGH]: 4,
        [Priority.CRITICAL]: 5,
    }
    const priorityClass = `priority-${priority.toLowerCase()}`

    return (
        <div className={styles.task} data-testid={testId}>
            <div className={styles.content}>
                <div className={styles.id}>ID-{id.slice(8)}</div>
                <div className={styles.header}>
                    <div
                        className={`${styles.priority} ${styles[priorityClass]}`}
                        title={`Приоритет: ${priority}`}
                    >
                        {Array.from({ length: priorityLevels[priority] }).map((_, i) => (
                            <div
                                key={i}
                                className={styles['priority-dot']}
                                style={{ height: (i + 1) * 6 }}
                            />
                        ))}
                    </div>
                    <div className={styles.title}>{title}</div>
                </div>
            </div>

            <div
                className={styles.deleteTaskIcon}
                onClick={() => setIsPopoverOpen((prev) => !prev)}
                ref={popoverRef}
                style={{ position: 'relative' }}
                data-testid="three-dots"
            >
                <DotsThreeIcon size={32} color="#fffcf2" weight="bold" />
                {isPopoverOpen && (
                    <div className={styles.popoverMenu}>
                        <button
                            className={styles.popoverButton}
                            data-testid="delete-task"
                            onClick={handleDeleteTask}
                        >
                            Delete
                        </button>
                        <button
                            className={styles.popoverButton}
                            data-testid="edit-task"
                            onClick={handleEditButtonClick}
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>

            {isModalVisible && (
                <EditTaskItemModal
                    isModalVisible={isModalVisible}
                    hideModal={hideModal}
                    task={{ id, content, status, priority, updatedAt, createdAt }}
                />
            )}

            {isDeleteModalVisible && (
                <DeleteTaskItemModal
                    isModalVisible={isDeleteModalVisible}
                    hideModal={hideDeleteModal}
                    task={{ id, content, status, priority, updatedAt, createdAt }}
                />
            )}
        </div>
    )
}
