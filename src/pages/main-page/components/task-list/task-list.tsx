import { SmileySadIcon } from '@phosphor-icons/react'
import { TaskItem } from './components'
import styles from './task-list.module.css'

import { TestId } from '@/shared/constants'
import { useTaskListStore } from '@/shared/store'

export const TaskList = () => {
    const { filteredTaskList } = useTaskListStore()

    if (!filteredTaskList?.length)
        return (
            <div className={styles.emptyList}>
                <SmileySadIcon />
                <div>Tasks not found</div>
            </div>
        )

    return (
        <div className={styles.content}>
            <div className={styles.taskList}>
                {filteredTaskList?.map((item, index) => (
                    <TaskItem key={item.id} {...item} testId={TestId.taskListItem + '-' + index} />
                ))}
            </div>
        </div>
    )
}
