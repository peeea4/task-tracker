import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
    it('renders children correctly', () => {
        render(<Button>Click me</Button>)

        expect(screen.getByText('Click me'))
    })

    it('applies custom className', () => {
        render(<Button className="custom-class">Test</Button>)
        const button = screen.getByRole('button')

        expect(button.className).toContain('custom-class')
    })

    it('fires onClick when clicked', () => {
        const handleClick = vi.fn()
        render(<Button onClick={handleClick}>Click</Button>)
        fireEvent.click(screen.getByText('Click'))

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('sets data-testid if provided', () => {
        render(<Button testId="my-button">Test</Button>)

        expect(screen.getByTestId('my-button'))
    })
})
