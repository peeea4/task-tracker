import { SmileySadIcon } from '@phosphor-icons/react'
import { TaskItem } from './components'
import styles from './task-list.module.css'
import fontStyles from '@/fonts.module.css'
import { useTaskListStore } from '@/shared/store'

export const TaskList = () => {
    const { filteredTaskList } = useTaskListStore()

    if (!filteredTaskList?.length)
        return (
            <div className={styles.emptyList}>
                <SmileySadIcon />
                <div className={fontStyles.poppinsMedium}>Tasks not found</div>
            </div>
        )

    return (
        <div className={styles.content}>
            <div className={styles.taskList}>
                {filteredTaskList?.map((item) => (
                    <TaskItem key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}
