import { Aside, TaskList } from './components'

import styles from './main-page.module.css'

export const MainPage = () => {
    return (
        <div className={styles.wrapper}>
            <Aside />
            <TaskList />
        </div>
    )
}
