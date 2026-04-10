import type { FC } from 'react'

import styles from './delete-task-item-modal.module.css'
import { Modal } from '@/shared/components'
import { useTaskListStore } from '@/shared/store'
import { type ITaskItem } from '@/shared/types'

interface Props {
    isModalVisible: boolean
    hideModal: () => void
    task: ITaskItem
}

export const DeleteTaskItemModal: FC<Props> = ({ isModalVisible, hideModal, task }) => {
    const { deleteTask } = useTaskListStore()

    const handleDeleteTask = () => {
        deleteTask(task.id)
    }

    return (
        <Modal
            open={isModalVisible}
            titleContent={'Are you sure you want to delete task?'}
            cancelFn={hideModal}
            primaryFn={handleDeleteTask}
            modalClassName={styles.modal}
            primaryButtonTitle="Delete"
        />
    )
}
