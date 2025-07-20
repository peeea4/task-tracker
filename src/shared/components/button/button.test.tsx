import { render, screen } from '@testing-library/react'
import { Button } from './button'

test('Button component renders correct text', () => {
    render(<Button>John</Button>)

    expect(screen.getByText('John')).toBeInTheDocument()
})
