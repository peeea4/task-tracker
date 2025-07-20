import { StackPlus } from '@phosphor-icons/react'
import { useState, type FC } from 'react'
import styles from './aside.module.css'
import { Button, Input, Modal } from '@/shared/components'
import { useShowModal } from '@/shared/hooks'
import { useTaskListStore } from '@/shared/store'
import { PRIORITY, TaskItemStatus } from '@/shared/types'

type Props = {
    onChange: (name: 'title' | 'description', e: React.ChangeEvent<HTMLInputElement>) => void
    values: {
        title: string
        description: string
    }
}

const ModalContent: FC<Props> = ({ onChange, values }) => {
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
        </div>
    )
}

export const Aside = () => {
    const { addTask, setFilters, clearFilters, availableStatuses, availablePriorities } =
        useTaskListStore()

    const { isModalVisible, showModal, hideModal } = useShowModal()

    const handleAddTaskClick = () => {
        showModal()
    }

    const handleFilterByStatus = (status: TaskItemStatus) => {
        setFilters({ status })
    }

    const handleFilterByPriority = (priority: PRIORITY) => {
        setFilters({ priority })
    }

    const [modalState, setModalState] = useState({ title: '', description: '' })

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
            priority: PRIORITY.LOW,
            updatedAt: Date.now().toString(),
            createdAt: Date.now().toString(),
            status: TaskItemStatus.BACKLOG,
        })
        hideModal()
        setModalState({ title: '', description: '' })
    }

    return (
        <div className={styles.aside}>
            <StackPlus
                size={32}
                color="white"
                onClick={handleAddTaskClick}
                className={styles.createButton}
            />

            <div className={styles.filters}>
                <div className={styles.filterGroup}>
                    <div className={styles.filterTitle}>Statuses</div>
                    {availableStatuses.map((status) => (
                        <Button key={status} onClick={() => handleFilterByStatus(status)}>
                            {status}
                        </Button>
                    ))}
                </div>

                <div className={styles.filterGroup}>
                    <div className={styles.filterTitle}>Priorities</div>
                    {availablePriorities.map((priority) => (
                        <Button key={priority} onClick={() => handleFilterByPriority(priority)}>
                            {priority}
                        </Button>
                    ))}
                </div>

                <Button onClick={clearFilters} className={styles.clearFiltersButton}>
                    Clear Filters
                </Button>
            </div>

            {isModalVisible && (
                <Modal
                    open={isModalVisible}
                    titleContent={'Add Task'}
                    primaryFn={onAddTask}
                    cancelFn={hideModal}
                    Content={<ModalContent onChange={handleInputChange} values={modalState} />}
                    modalClassName={styles.modal}
                />
            )}
        </div>
    )
}
