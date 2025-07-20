import { TaskItem } from './components'
import styles from './task-list.module.css'
import fontStyles from '@/fonts.module.css'
import { useTaskListStore } from '@/shared/store'

export const TaskList = () => {
    const { filteredTaskList } = useTaskListStore()

    return (
        <div className={styles.content}>
            {!filteredTaskList?.length ? (
                <div className={fontStyles.poppinsMedium}>Tasks not found</div>
            ) : (
                <div className={styles.taskList}>
                    {filteredTaskList?.map((item) => (
                        <TaskItem key={item.id} {...item} />
                    ))}
                </div>
            )}
        </div>
    )
}
