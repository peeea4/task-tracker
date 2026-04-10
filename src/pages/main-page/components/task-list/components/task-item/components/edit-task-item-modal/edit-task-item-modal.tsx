import type { ChangeEvent, FC } from 'react'
import { useState } from 'react'
import styles from './edit-task-item-modal.module.css'
import { Modal } from '@/shared/components'
import { useTaskListStore } from '@/shared/store'
import { type ITaskItem, TaskItemStatus, Priority } from '@/shared/types'

interface Props {
    isModalVisible: boolean
    hideModal: () => void
    task: ITaskItem
}

export const EditTaskItemModal: FC<Props> = ({ isModalVisible, hideModal, task }) => {
    const { editTask } = useTaskListStore()
    const [form, setForm] = useState({
        status: task.status,
        priority: task.priority,
        title: task.content.title,
        description: task.content.description,
        dueDate: task.content.dueDate || '',
    })

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSave = () => {
        const updatedTask: ITaskItem = {
            ...task,
            status: form.status as TaskItemStatus,
            priority: form.priority as Priority,
            content: {
                ...task.content,
                title: form.title,
                description: form.description,
                dueDate: form.dueDate || undefined,
            },
            updatedAt: new Date().toISOString(),
        }
        editTask(updatedTask, task.id)
        hideModal()
    }

    return (
        <Modal
            open={isModalVisible}
            titleContent={'Edit Task'}
            cancelFn={hideModal}
            primaryFn={handleSave}
            Content={
                <form className={styles.form}>
                    <label className={styles.label}>
                        Title
                        <input
                            className={styles.input}
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        Description
                        <textarea
                            className={styles.textarea}
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                        />
                    </label>
                    <label className={styles.label}>
                        Status
                        <select
                            className={styles.select}
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                        >
                            {Object.values(TaskItemStatus).map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className={styles.label}>
                        Priority
                        <select
                            className={styles.select}
                            name="priority"
                            value={form.priority}
                            onChange={handleChange}
                        >
                            {Object.values(Priority).map((priority) => (
                                <option key={priority} value={priority}>
                                    {priority}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className={styles.label}>
                        Due Date
                        <input
                            className={styles.input}
                            type="date"
                            name="dueDate"
                            value={form.dueDate}
                            onChange={handleChange}
                        />
                    </label>
                </form>
            }
        />
    )
}
