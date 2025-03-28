import { render } from '@testing-library/react'
import WelcomePage from '@/app/page'

it('renders homepage unchanged', () => {
  const { container } = render(<WelcomePage />)
  expect(container).toMatchSnapshot()
})