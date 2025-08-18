import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModeToggle } from '@/components/mode-toggle';
import { ThemeProvider } from '@/components/theme-provider';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const renderModeToggle = () => {
  return render(
    <ThemeProvider>
      <ModeToggle />
    </ThemeProvider>
  );
};

describe('ModeToggle', () => {
  it('renders the toggle button', () => {
    renderModeToggle();

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
  });

  it('has accessibility attributes', () => {
    renderModeToggle();

    const srText = screen.getByText('Toggle theme');
    expect(srText).toBeInTheDocument();
    expect(srText).toHaveClass('sr-only');
  });

  it('contains theme icons', () => {
    renderModeToggle();

    // Check for Sun and Moon icons by their SVG elements
    const sunIcon = document.querySelector('.lucide-sun');
    const moonIcon = document.querySelector('.lucide-moon');

    expect(sunIcon).toBeInTheDocument();
    expect(moonIcon).toBeInTheDocument();
  });

  it('toggles theme when clicked', () => {
    localStorageMock.getItem.mockReturnValue('light');

    renderModeToggle();

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    // Should call localStorage.setItem with the opposite theme
    expect(localStorageMock.setItem).toHaveBeenCalledWith('seller-console-theme', 'dark');
  });
});
