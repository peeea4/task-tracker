import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './input'

describe('Input', () => {
    it('renders with value', () => {
        render(<Input value="Example" onChange={() => {}} />)

        const input = screen.getByDisplayValue('Example')
        expect(input)
    })

    it('calls onChange when value changes', () => {
        const handleChange = vi.fn()

        render(<Input value="" onChange={handleChange} />)

        const input = screen.getByRole('textbox')

        fireEvent.change(input, { target: { value: 'New value' } })

        expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it('renders placeholder if provided', () => {
        render(<Input value="" onChange={() => {}} placeholder="Type here..." />)
        expect(screen.getByPlaceholderText('Type here...'))
    })

    it('sets data-testid if provided', () => {
        render(<Input value="" onChange={() => {}} testId="test-id" />)
        expect(screen.getByTestId('test-id'))
    })
})
