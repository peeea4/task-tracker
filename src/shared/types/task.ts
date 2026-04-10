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

export enum Priority {
    MINOR = 'MINOR',
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    CRITICAL = 'CRITICAL',
}

export interface ITaskItem {
    id: string
    status: TaskItemStatus
    priority: Priority
    content: {
        title: string
        description: string
        dueDate?: string
    }
    updatedAt: string
    createdAt: string
}
