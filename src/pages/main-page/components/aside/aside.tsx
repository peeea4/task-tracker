import { StackPlus } from '@phosphor-icons/react'
import clsx from 'clsx'
import { useState, type FC } from 'react'
import styles from './aside.module.css'
import fontStyles from '@/fonts.module.css'
import { Button, Input, Modal, Select } from '@/shared/components'
import selectStyles from '@/shared/components/select/select.module.css'
import { useShowModal } from '@/shared/hooks'
import { useTaskListStore } from '@/shared/store'
import { PRIORITY, TaskItemStatus } from '@/shared/types'

type Props = {
    onChange: (name: 'title' | 'description', e: React.ChangeEvent<HTMLInputElement>) => void
    values: {
        title: string
        description: string
    }
    status: string
    priority: string
    onStatusChange: (value: string) => void
    onPriorityChange: (value: string) => void
    statusOptions: { value: string; label: string }[]
    priorityOptions: { value: string; label: string }[]
}

const ModalContent: FC<Props> = ({
    onChange,
    values,
    status,
    priority,
    onStatusChange,
    onPriorityChange,
    statusOptions,
    priorityOptions,
}) => {
    return (
        <div className={styles.inputsContainer}>
            <Input
                placeholder="Type title"
                value={values?.title}
                onChange={(e) => onChange('title', e)}
            />
            <Input
                placeholder="Type description"
                value={values?.description}
                onChange={(e) => onChange('description', e)}
            />
            <Select
                options={statusOptions}
                value={status}
                onChange={onStatusChange}
                placeholder="Select status"
                className={clsx(
                    selectStyles.fullWidth,
                    selectStyles.fontCustom,
                    fontStyles.poppinsMedium,
                )}
            />
            <Select
                options={priorityOptions}
                value={priority}
                onChange={onPriorityChange}
                placeholder="Select priority"
                className={clsx(
                    selectStyles.fullWidth,
                    selectStyles.fontCustom,
                    fontStyles.poppinsMedium,
                )}
            />
        </div>
    )
}

export const Aside = () => {
    const { addTask, setFilters, clearFilters, availableStatuses, availablePriorities } =
        useTaskListStore()

    const { isModalVisible, showModal, hideModal } = useShowModal()

    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])
    const [selectedPriorities, setSelectedPriorities] = useState<string[]>([])

    const handleStatusCheckbox = (status: string) => {
        setSelectedStatuses((prev) =>
            prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status],
        )
    }
    const handlePriorityCheckbox = (priority: string) => {
        setSelectedPriorities((prev) =>
            prev.includes(priority) ? prev.filter((p) => p !== priority) : [...prev, priority],
        )
    }
    const handleApplyFilters = () => {
        setFilters({
            status:
                selectedStatuses.length > 0 ? (selectedStatuses as TaskItemStatus[]) : undefined,
            priority:
                selectedPriorities.length > 0 ? (selectedPriorities as PRIORITY[]) : undefined,
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

    const [modalState, setModalState] = useState({ title: '', description: '' })
    const [modalStatus, setModalStatus] = useState('')
    const [modalPriority, setModalPriority] = useState('')

    const handleInputChange = (
        name: 'title' | 'description',
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setModalState((prevState) => ({ ...prevState, [name]: e?.target?.value }))
    }

    const onAddTask = () => {
        addTask({
            id: Date.now().toString(),
            content: {
                title: modalState.title,
                description: modalState.description,
            },
            priority: (modalPriority as PRIORITY) || PRIORITY.LOW,
            updatedAt: Date.now().toString(),
            createdAt: Date.now().toString(),
            status: (modalStatus as TaskItemStatus) || TaskItemStatus.BACKLOG,
        })
        hideModal()
        setModalState({ title: '', description: '' })
        setModalStatus('')
        setModalPriority('')
    }

    const statusOptions = Object.values(TaskItemStatus).map((status) => ({
        value: status,
        label: status,
    }))

    const priorityOptions = Object.values(PRIORITY).map((priority) => ({
        value: priority,
        label: priority,
    }))

    return (
        <div className={styles.aside}>
            <div className={styles.createButton} onClick={handleAddTaskClick} id="create-button">
                <StackPlus size={32} color="white" />
                <span className={fontStyles.poppinsMedium}>Create</span>
            </div>

            <div className={styles.filters}>
                <div className={styles.filterGroup}>
                    <div className={clsx(styles.filterTitle, fontStyles.poppinsMedium)}>
                        Statuses
                    </div>
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
                                <label
                                    htmlFor={checkboxId}
                                    className={clsx(styles.checkboxLabel, fontStyles.poppinsMedium)}
                                >
                                    {option.label}
                                </label>
                            </div>
                        )
                    })}
                </div>

                <div className={styles.filterGroup}>
                    <div className={clsx(styles.filterTitle, fontStyles.poppinsMedium)}>
                        Priorities
                    </div>
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
                                        !availablePriorities.includes(option.value as PRIORITY)
                                    }
                                />
                                <label
                                    htmlFor={checkboxId}
                                    className={clsx(styles.checkboxLabel, fontStyles.poppinsMedium)}
                                >
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
                <Modal
                    open={isModalVisible}
                    titleContent={'Create Task'}
                    primaryFn={onAddTask}
                    cancelFn={hideModal}
                    Content={
                        <ModalContent
                            onChange={handleInputChange}
                            values={modalState}
                            status={modalStatus}
                            priority={modalPriority}
                            onStatusChange={setModalStatus}
                            onPriorityChange={setModalPriority}
                            statusOptions={statusOptions}
                            priorityOptions={priorityOptions}
                        />
                    }
                    modalClassName={styles.modal}
                />
            )}
        </div>
    )
}
