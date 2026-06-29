export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const getStatusColor = (status: 'healthy' | 'degraded' | 'down'): string => {
  const colors = {
    healthy: '#4caf50',
    degraded: '#ff9800',
    down: '#f44336',
  };
  return colors[status];
};

export const calculateSuccessRate = (success: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((success / total) * 100);
};
