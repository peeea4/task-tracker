import type { FC } from 'react'
import React, { useState } from 'react'
import styles from './edit-task-item-modal.module.css'
import { Modal } from '@/shared/components'
import { useTaskListStore } from '@/shared/store'
import { type ITaskItem, TaskItemStatus, PRIORITY, Labels } from '@/shared/types/data-model'

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
        labels: task.labels?.map((l) => l.name) || [],
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleLabelsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = Array.from(e.target.selectedOptions, (o) => o.value as Labels)
        setForm((prev) => ({ ...prev, labels: options }))
    }

    const handleSave = () => {
        const updatedTask: ITaskItem = {
            ...task,
            status: form.status as TaskItemStatus,
            priority: form.priority as PRIORITY,
            content: {
                ...task.content,
                title: form.title,
                description: form.description,
                dueDate: form.dueDate || undefined,
            },
            labels: form.labels.length
                ? form.labels.map((name) => ({
                      name,
                      color: task.labels?.find((l) => l.name === name)?.color || 'red',
                  }))
                : undefined,
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
            Content={
                <form
                    className={styles.form}
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSave()
                    }}
                >
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
                            {Object.values(PRIORITY).map((priority) => (
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
                    <label className={styles.label}>
                        Labels
                        <select
                            className={styles.select}
                            name="labels"
                            multiple
                            value={form.labels}
                            onChange={handleLabelsChange}
                        >
                            {Object.values(Labels).map((label) => (
                                <option key={label} value={label}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div className={styles.buttonRow}>
                        <button className={styles.button} type="submit">
                            Save
                        </button>
                        <button
                            className={`${styles.button} ${styles.cancel}`}
                            type="button"
                            onClick={hideModal}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            }
        />
    )
}
