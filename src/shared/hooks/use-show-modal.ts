import { useState } from 'react'

/**
 * A custom React hook to manage the visibility state of a modal.
 *
 * @param {boolean} [defaultValue=false] - Initial visibility state of the modal.
 * @returns {{
 *   isModalVisible: boolean,
 *   showModal: () => void,
 *   hideModal: () => void,
 *   toggleModal: () => void
 * }} Object containing the modal visibility state and control functions.
 *
 * @example
 * const { isModalVisible, showModal, hideModal, toggleModal } = useShowModal()
 */
export const useShowModal = (defaultValue: boolean = false) => {
    const [isModalVisible, setIsModalVisible] = useState(defaultValue)

    const showModal = () => setIsModalVisible(true)
    const hideModal = () => setIsModalVisible(false)
    const toggleModal = () => setIsModalVisible((prevState) => !prevState)

    return { isModalVisible, showModal, hideModal, toggleModal }
}
