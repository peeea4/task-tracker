import { StackPlus } from '@phosphor-icons/react'
import clsx from 'clsx'
import { useState } from 'react'
import styles from './aside.module.css'
import { CreateTaskModal } from './components'
import { priorityOptions, statusOptions } from './constants'

import { Button } from '@/shared/components'
import { TestId } from '@/shared/constants'
import { useShowModal } from '@/shared/hooks'
import { useTaskListStore } from '@/shared/store'
import { Priority, TaskItemStatus } from '@/shared/types'

export const Aside = () => {
    const { setFilters, clearFilters, availableStatuses, availablePriorities } = useTaskListStore()

    const { isModalVisible, showModal, hideModal } = useShowModal()

    const [selectedStatuses, setSelectedStatuses] = useState<TaskItemStatus[]>([])
    const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>([])

    const handleStatusCheckbox = (status: TaskItemStatus) => {
        setSelectedStatuses((prev) =>
            prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status],
        )
    }

    const handlePriorityCheckbox = (priority: Priority) => {
        setSelectedPriorities((prev) =>
            prev.includes(priority) ? prev.filter((p) => p !== priority) : [...prev, priority],
        )
    }

    const handleApplyFilters = () => {
        setFilters({
            status: selectedStatuses.length ? selectedStatuses : undefined,
            priority: selectedPriorities.length ? selectedPriorities : undefined,
        })
    }

    const handleClearFilters = () => {
        clearFilters()
        setSelectedStatuses([])
        setSelectedPriorities([])
    }

    const handleAddTaskClick = () => {
        showModal()
    }

    return (
        <div className={styles.aside}>
            <Button onClick={handleAddTaskClick} testId={TestId.openCreateModalButton}>
                <StackPlus size={24} color="black" />
                <span>Create Task</span>
            </Button>

            <div className={styles.filters}>
                <div className={styles.filterGroup}>
                    <div className={clsx(styles.filterTitle)}>Statuses</div>
                    {statusOptions.map((option) => {
                        const checkboxId = `status-checkbox-${option.value}`

                        return (
                            <div
                                key={option.value}
                                style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                            >
                                <input
                                    id={checkboxId}
                                    type="checkbox"
                                    checked={selectedStatuses.includes(option.value)}
                                    onChange={() => handleStatusCheckbox(option.value)}
                                    disabled={
                                        !availableStatuses.includes(option.value as TaskItemStatus)
                                    }
                                />
                                <label htmlFor={checkboxId} className={styles.checkboxLabel}>
                                    {option.label}
                                </label>
                            </div>
                        )
                    })}
                </div>

                <div className={styles.filterGroup}>
                    <div className={styles.filterTitle}>Priorities</div>
                    {priorityOptions.map((option) => {
                        const checkboxId = `priority-checkbox-${option.value}`

                        return (
                            <div
                                key={option.value}
                                style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                            >
                                <input
                                    id={checkboxId}
                                    type="checkbox"
                                    checked={selectedPriorities.includes(option.value)}
                                    onChange={() => handlePriorityCheckbox(option.value)}
                                    disabled={
                                        !availablePriorities.includes(option.value as Priority)
                                    }
                                />
                                <label htmlFor={checkboxId} className={styles.checkboxLabel}>
                                    {option.label}
                                </label>
                            </div>
                        )
                    })}
                </div>
                <div className={styles.buttonsContainer}>
                    <Button onClick={handleApplyFilters}>Apply</Button>
                    <Button onClick={handleClearFilters}>Clear Filters</Button>
                </div>
            </div>

            {isModalVisible && (
                <CreateTaskModal isModalVisible={isModalVisible} onClose={hideModal} />
            )}
        </div>
    )
}
