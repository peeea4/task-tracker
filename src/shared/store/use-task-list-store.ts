import { create } from 'zustand'
import type { ITaskItem, TaskItemStatus, PRIORITY } from '../types'

type Filters = {
    status?: TaskItemStatus
    priority?: PRIORITY
}

type State = {
    taskList: ITaskItem[]
    filters: Filters
    filteredTaskList: ITaskItem[]
    availableStatuses: TaskItemStatus[]
    availablePriorities: PRIORITY[]
}

type Actions = {
    addTask: (task: ITaskItem) => void
    deleteTask: (id: ITaskItem['id']) => void
    editTask: (task: ITaskItem, id: ITaskItem['id']) => void
    setFilters: (filters: Partial<Filters>) => void
    clearFilters: () => void
}

const recalculate = (taskList: ITaskItem[], filters: Filters) => {
    const filteredTaskList = taskList.filter((task) => {
        const matchStatus = filters.status ? task.status === filters.status : true
        const matchPriority = filters.priority ? task.priority === filters.priority : true
        return matchStatus && matchPriority
    })

    const statuses = Array.from(new Set(taskList.map((t) => t.status)))
    const priorities = Array.from(new Set(taskList.map((t) => t.priority)))

    return { filteredTaskList, availableStatuses: statuses, availablePriorities: priorities }
}

export const useTaskListStore = create<State & Actions>((set) => ({
    taskList: [],
    filters: {},
    filteredTaskList: [],
    availableStatuses: [],
    availablePriorities: [],

    addTask: (task) =>
        set((state) => {
            const newTaskList = [...state.taskList, task]
            return {
                taskList: newTaskList,
                ...recalculate(newTaskList, state.filters),
            }
        }),

    deleteTask: (id) =>
        set((state) => {
            const newTaskList = state.taskList.filter((task) => task.id !== id)
            return {
                taskList: newTaskList,
                ...recalculate(newTaskList, state.filters),
            }
        }),

    editTask: (newTask, id) =>
        set((state) => {
            const newTaskList = state.taskList.map((task) => (task.id === id ? newTask : task))
            return {
                taskList: newTaskList,
                ...recalculate(newTaskList, state.filters),
            }
        }),

    setFilters: (filters) =>
        set((state) => {
            const newFilters = { ...state.filters, ...filters }
            return {
                filters: newFilters,
                ...recalculate(state.taskList, newFilters),
            }
        }),

    clearFilters: () =>
        set((state) => ({
            filters: {},
            ...recalculate(state.taskList, {}),
        })),
}))
