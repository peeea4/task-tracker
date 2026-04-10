import { useState, type ChangeEvent, type FC } from 'react'
import { priorityOptions, statusOptions } from '../../constants'
import styles from './create-task-modal.module.css'
import { Input, Modal, Select } from '@/shared/components'
import { TestId } from '@/shared/constants'
import { useTaskListStore } from '@/shared/store'
import { Priority, TaskItemStatus } from '@/shared/types'

export type Props = {
    onChange: (name: 'title' | 'description', e: ChangeEvent<HTMLInputElement>) => void
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
                testId={TestId.taskTitle}
            />
            <Input
                placeholder="Type description"
                value={values?.description}
                onChange={(e) => onChange('description', e)}
                testId={TestId.taskDescription}
            />
            <Select
                options={statusOptions}
                value={status}
                onChange={onStatusChange}
                placeholder="Select status"
                testId={TestId.statusSelect}
            />
            <Select
                options={priorityOptions}
                value={priority}
                onChange={onPriorityChange}
                placeholder="Select priority"
                testId={TestId.prioritySelect}
            />
        </div>
    )
}

type CreateTaskModalProps = {
    isModalVisible: boolean
    onClose: () => void
}

export const CreateTaskModal: FC<CreateTaskModalProps> = ({ isModalVisible, onClose }) => {
    const { addTask } = useTaskListStore()

    const [modalState, setModalState] = useState({ title: '', description: '' })
    const [modalStatus, setModalStatus] = useState('')
    const [modalPriority, setModalPriority] = useState('')

    const handleInputChange = (name: 'title' | 'description', e: ChangeEvent<HTMLInputElement>) => {
        setModalState((prevState) => ({ ...prevState, [name]: e?.target?.value }))
    }

    const onAddTask = () => {
        addTask({
            id: Date.now().toString(),
            content: {
                title: modalState.title,
                description: modalState.description,
            },
            priority: (modalPriority as Priority) || Priority.LOW,
            updatedAt: Date.now().toString(),
            createdAt: Date.now().toString(),
            status: (modalStatus as TaskItemStatus) || TaskItemStatus.BACKLOG,
        })
        onClose()
        setModalState({ title: '', description: '' })
        setModalStatus('')
        setModalPriority('')
    }
    return (
        <Modal
            open={isModalVisible}
            titleContent={'Create Task'}
            primaryFn={onAddTask}
            cancelFn={onClose}
            modalClassName={styles.modal}
            primaryButtonTitle="Create"
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
            primaryFnTestId={TestId.createTaskButton}
        />
    )
}
