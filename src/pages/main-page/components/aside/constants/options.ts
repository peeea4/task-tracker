import { Priority, TaskItemStatus } from '@/shared/types'

export const statusOptions = Object.values(TaskItemStatus).map((status) => ({
    value: status,
    label: status,
}))

export const priorityOptions = Object.values(Priority).map((priority) => ({
    value: priority,
    label: priority,
}))
