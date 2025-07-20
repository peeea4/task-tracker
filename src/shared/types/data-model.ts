export enum TaskItemStatus {
    BACKLOG = 'BACKLOG',
    IN_PROGRESS = 'IN_PROGRESS',
    REVIEW = 'REVIEW',
    TESTING = 'TESTING',
    READY_FOR_TESTING = 'READY_FOR_TESTING',
    READY_FOR_DEPLOY = 'READY_FOR_DEPLOY',
    DONE = 'DONE',
    CANCELLED = 'CANCELLED',
}

export enum Labels {
    BUG = 'BUG',
    FEATURE = 'FEATURE',
    REFACTORING = 'REFACTORING',
    RESEARCHING = 'RESEARCHING',
}

export enum PRIORITY {
    MINOR = 'MINOR',
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    CRITICAL = 'CRITICAL',
}

export const LabelColors = {
    [Labels.BUG]: 'red',
    [Labels.FEATURE]: 'purple',
    [Labels.REFACTORING]: 'red',
    [Labels.RESEARCHING]: 'red',
}

type Label = {
    name: Labels
    color: string
}

export interface ITaskItem {
    id: string
    status: TaskItemStatus
    priority: PRIORITY
    content: {
        title: string
        description: string
        dueDate?: string
    }
    labels?: Label[]
    updatedAt: string
    createdAt: string
}

export type Workspace = {
    taskList: ITaskItem[]
}
