import { DotsThreeIcon } from '@phosphor-icons/react'
import type { FC } from 'react'
import { EditTaskItemModal } from './components'
import styles from './task-item.module.css'
import fontStyles from '@/fonts.module.css'
import { useShowModal } from '@/shared/hooks'
import { useTaskListStore } from '@/shared/store'

import { PRIORITY, type ITaskItem } from '@/shared/types/data-model'

type Props = ITaskItem

export const TaskItem: FC<Props> = ({ content, priority, id }) => {
    const { title, description } = content
    const { deleteTask } = useTaskListStore()

    const { isModalVisible, showModal } = useShowModal()

    const handleDeleteTask = () => {
        deleteTask(id)
    }

    const handleEditButtonClick = () => {
        showModal()
    }

    const priorityClassName =
        priority === PRIORITY.LOW ? styles.low : PRIORITY.HIGH ? styles.high : styles.medium

    return (
        <div className={styles.task}>
            {/* <div className={`${priorityClassName} ${styles.priority}`} /> */}

            {/* <div className={`${fontStyles.poppinsMedium} ${styles.title}`}>{title}</div> */}

            <div className={`${fontStyles.poppinsLight} ${styles.id}`}>ID-{id.slice(8)}</div>

            <div className={`${fontStyles.poppinsMedium} ${styles.title}`}>{title}</div>

            {/* <div className={styles.content}>
                <div className={`${fontStyles.poppinsMedium} ${styles.title}`}>{title}</div>

                <div className={`${fontStyles.poppinsRegular} ${styles.description}`}>
                    {description}
                </div>
            </div> */}

            <div className={styles.deleteTaskIcon} onClick={handleDeleteTask}>
                <DotsThreeIcon size={32} color="#fffcf2" weight="bold" />
            </div>

            {isModalVisible && <EditTaskItemModal />}
        </div>
    )
}
