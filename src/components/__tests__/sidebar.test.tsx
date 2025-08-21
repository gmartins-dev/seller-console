import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Sidebar } from '../sidebar';

describe('Sidebar', () => {
  const defaultProps = {
    activeTab: 'leads',
    onTabChange: vi.fn(),
    leadsCount: 5,
    opportunitiesCount: 3,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders sidebar with leads and opportunities buttons', () => {
    render(<Sidebar {...defaultProps} />);
    
    expect(screen.getByText('Seller Console')).toBeInTheDocument();
    expect(screen.getByText('Lead Management')).toBeInTheDocument();
    expect(screen.getByText('Leads')).toBeInTheDocument();
    expect(screen.getByText('Opportunities')).toBeInTheDocument();
  });

  it('displays correct counts in badges', () => {
    render(<Sidebar {...defaultProps} />);
    
    expect(screen.getByText('5')).toBeInTheDocument(); // leads count
    expect(screen.getByText('3')).toBeInTheDocument(); // opportunities count
  });

  it('calls onTabChange when clicking navigation buttons', () => {
    const onTabChange = vi.fn();
    render(<Sidebar {...defaultProps} onTabChange={onTabChange} />);
    
    fireEvent.click(screen.getByText('Opportunities'));
    expect(onTabChange).toHaveBeenCalledWith('opportunities');
  });

  it('calls onMobileClose when provided and tab is changed', () => {
    const onMobileClose = vi.fn();
    const onTabChange = vi.fn();
    render(
      <Sidebar 
        {...defaultProps} 
        onTabChange={onTabChange}
        onMobileClose={onMobileClose} 
      />
    );
    
    fireEvent.click(screen.getByText('Opportunities'));
    expect(onMobileClose).toHaveBeenCalled();
  });

  it('renders collapsed state correctly', () => {
    render(<Sidebar {...defaultProps} collapsed={true} />);
    
    // In collapsed state, text should not be visible
    expect(screen.queryByText('Seller Console')).not.toBeInTheDocument();
    expect(screen.queryByText('Lead Management')).not.toBeInTheDocument();
    expect(screen.queryByText('Leads')).not.toBeInTheDocument();
    expect(screen.queryByText('Opportunities')).not.toBeInTheDocument();
    
    // But icons should still be present (via title attributes)
    expect(screen.getByTitle('Leads')).toBeInTheDocument();
    expect(screen.getByTitle('Opportunities')).toBeInTheDocument();
  });

  it('renders toggle button when onToggleCollapse is provided', () => {
    const onToggleCollapse = vi.fn();
    render(
      <Sidebar 
        {...defaultProps} 
        onToggleCollapse={onToggleCollapse} 
        collapsed={false}
      />
    );
    
    // Should find 3 buttons: Leads, Opportunities, and Toggle
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    
    // The toggle button should be the last one and have the specific classes
    const toggleBtn = buttons[2];
    expect(toggleBtn).toHaveClass('absolute', '-right-3', 'top-6');
    
    fireEvent.click(toggleBtn);
    expect(onToggleCollapse).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Sidebar {...defaultProps} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
