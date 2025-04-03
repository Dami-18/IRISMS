import { render } from '@testing-library/react';
import WelcomePage from '../src/app/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe('WelcomePage', () => {
  it('renders homepage unchanged', () => {
    const { container } = render(<WelcomePage />);
    
    expect(container).toMatchSnapshot();
  });
});
