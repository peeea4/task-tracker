import { test, expect, type Page } from '@playwright/test'

const TEST_DATA = {
    CREATE_TASK: {
        title: 'My First Task!',
        description: 'Description For My First Task!',
        priority: 'MINOR',
        status: 'BACKLOG',
    },
    EDIT_TASK: {
        title: 'Updated Task Title',
        description: 'Updated task description',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
    },
}

const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
}

const setupTestData = async (page: Page) => {
    await page.evaluate(() => {
        const testTask = {
            id: '1',
            content: {
                title: 'Prefilled Task',
                description: 'Original description',
            },
            status: 'BACKLOG',
            priority: 'MINOR',
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
        }

        localStorage.setItem(
            'todo-storage',
            JSON.stringify({
                state: {
                    taskList: [testTask],
                    filters: {},
                    filteredTaskList: [testTask],
                    availableStatuses: ['BACKLOG'],
                    availablePriorities: ['MINOR'],
                },
                version: 0,
            }),
        )
    })
}

const createTask = async (page: Page, taskData: typeof TEST_DATA.CREATE_TASK) => {
    // Открываем модальное окно создания
    const openCreateButton = page.getByTestId('open-create-modal-button')
    await expect(openCreateButton).toHaveText('Create Task')
    await openCreateButton.click()

    // Заполняем форму
    await page.getByTestId('task-title').fill(taskData.title)
    await page.getByTestId('task-description').fill(taskData.description)

    // Выбираем приоритет
    await page.getByTestId('priority-select_').click()
    await page.getByTestId(`priority-select_${taskData.priority}`).click()

    // Выбираем статус
    await page.getByTestId('status-select_').click()
    await page.getByTestId(`status-select_${taskData.status}`).click()

    // Создаем задачу
    await page.getByTestId('create-task-button').click()
}

const editTask = async (
    page: Page,
    taskIndex: number,
    updates: {
        title?: string
        description?: string
        status?: string
        priority?: string
        dueDate?: string
    },
) => {
    // Находим элемент задачи
    const taskItem = page.getByTestId(`task-list-item-${taskIndex}`)
    await expect(taskItem).toBeVisible()

    // Открываем меню редактирования
    const threeDotsButton = taskItem.getByTestId('three-dots')
    await threeDotsButton.click()
    await page.getByTestId('edit-task').click()

    // Заполняем поля
    if (updates.title) {
        const titleInput = page.locator('input[name="title"]')
        await titleInput.clear()
        await titleInput.fill(updates.title)
    }

    if (updates.description) {
        const descriptionInput = page.locator('textarea[name="description"]')
        await descriptionInput.clear()
        await descriptionInput.fill(updates.description)
    }

    if (updates.status) {
        await page.locator('select[name="status"]').selectOption(updates.status)
    }

    if (updates.priority) {
        await page.locator('select[name="priority"]').selectOption(updates.priority)
    }

    if (updates.dueDate) {
        await page.locator('input[name="dueDate"]').fill(updates.dueDate)
    }

    // Сохраняем изменения
    await page.locator('button').filter({ hasText: 'Continue' }).click()
}

const deleteTask = async (page: Page, taskIndex: number) => {
    // Находим элемент задачи
    const taskItem = page.getByTestId(`task-list-item-${taskIndex}`)
    await expect(taskItem).toBeVisible()

    // Открываем меню удаления
    const threeDotsButton = taskItem.getByTestId('three-dots')
    await threeDotsButton.click()
    await page.getByTestId('delete-task').click()

    // Подтверждаем удаление
    await page.locator('button').filter({ hasText: 'Delete' }).click()
}

const cancelDeleteTask = async (page: Page, taskIndex: number) => {
    // Находим элемент задачи
    const taskItem = page.getByTestId(`task-list-item-${taskIndex}`)
    await expect(taskItem).toBeVisible()

    // Открываем меню удаления
    const threeDotsButton = taskItem.getByTestId('three-dots')
    await threeDotsButton.click()
    await page.getByTestId('delete-task').click()

    // Отменяем удаление
    await page.locator('button').filter({ hasText: 'Cancel' }).click()
}

test.describe('Главная страница', () => {
    test('создание задачи', async ({ page }) => {
        await page.goto('/')
        await createTask(page, TEST_DATA.CREATE_TASK)

        const taskListItem = page.getByTestId('task-list-item-0')
        await expect(taskListItem).toHaveText(/My First Task!/)
    })

    test('редактирование задачи', async ({ page }) => {
        await page.goto('/')
        await setupTestData(page)
        await page.reload()

        const updates = {
            ...TEST_DATA.EDIT_TASK,
            dueDate: getTomorrowDate(),
        }

        await editTask(page, 0, updates)

        const updatedTask = page.getByTestId('task-list-item-0')
        await expect(updatedTask).toHaveText(/Updated Task Title/)
    })

    test('удаление задачи', async ({ page }) => {
        await page.goto('/')
        await setupTestData(page)
        await page.reload()

        // Проверяем, что задача существует
        const taskItem = page.getByTestId('task-list-item-0')
        await expect(taskItem).toBeVisible()
        await expect(taskItem).toHaveText(/Prefilled Task/)

        // Удаляем задачу
        await deleteTask(page, 0)

        // Проверяем, что задача удалена
        await expect(taskItem).not.toBeVisible()
    })

    test('отмена удаления задачи', async ({ page }) => {
        await page.goto('/')
        await setupTestData(page)
        await page.reload()

        // Проверяем, что задача существует
        const taskItem = page.getByTestId('task-list-item-0')
        await expect(taskItem).toBeVisible()
        await expect(taskItem).toHaveText(/Prefilled Task/)

        // Отменяем удаление задачи
        await cancelDeleteTask(page, 0)

        // Проверяем, что задача осталась
        await expect(taskItem).toBeVisible()
        await expect(taskItem).toHaveText(/Prefilled Task/)
    })
})
