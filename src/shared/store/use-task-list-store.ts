import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { ITaskItem, TaskItemStatus, Priority } from '../types'

type Filters = {
    status?: TaskItemStatus[]
    priority?: Priority[]
}

type State = {
    taskList: ITaskItem[]
    filters: Filters
    filteredTaskList: ITaskItem[]
    availableStatuses: TaskItemStatus[]
    availablePriorities: Priority[]
}

type Actions = {
    addTask: (task: ITaskItem) => void
    deleteTask: (id: ITaskItem['id']) => void
    editTask: (task: ITaskItem, id: ITaskItem['id']) => void
    setFilters: (filters: Partial<Filters>) => void
    clearFilters: () => void
}

const recalculateState = (taskList: ITaskItem[], filters: Filters) => {
    const filteredTaskList = taskList.filter((task) => {
        let isMatchStatus = true
        let isMatchPriority = true

        if (filters.status) {
            isMatchStatus = filters.status.includes(task.status)
        }

        if (filters.priority) {
            isMatchPriority = filters.priority.includes(task.priority)
        }

        return isMatchStatus && isMatchPriority
    })

    const statuses = Array.from(new Set(taskList.map((item) => item.status)))
    const priorities = Array.from(new Set(taskList.map((item) => item.priority)))

    return { filteredTaskList, availableStatuses: statuses, availablePriorities: priorities }
}

export const useTaskListStore = create<State & Actions>()(
    persist(
        (set) => ({
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
                        ...recalculateState(newTaskList, state.filters),
                    }
                }),

            deleteTask: (id) =>
                set((state) => {
                    const newTaskList = state.taskList.filter((task) => task.id !== id)

                    return {
                        taskList: newTaskList,
                        ...recalculateState(newTaskList, state.filters),
                    }
                }),

            editTask: (newTask, id) =>
                set((state) => {
                    const newTaskList = state.taskList.map((task) =>
                        task.id === id ? newTask : task,
                    )

                    return {
                        taskList: newTaskList,
                        ...recalculateState(newTaskList, state.filters),
                    }
                }),

            setFilters: (filters) =>
                set((state) => {
                    const newFilters = { ...state.filters, ...filters }

                    return {
                        filters: newFilters,
                        ...recalculateState(state.taskList, newFilters),
                    }
                }),

            clearFilters: () =>
                set((state) => ({
                    filters: {},
                    ...recalculateState(state.taskList, {}),
                })),
        }),
        { name: 'todo-storage' },
    ),
)
