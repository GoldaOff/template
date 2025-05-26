import { ApiError } from './types';

/**
 * Показывает уведомление об ошибке пользователю
 * @param error - объект ошибки
 */
export function showError(error: ApiError | Error): void {
  const message = error instanceof Error ? error.message : error.message;
  // In a real app, you might want to use a toast notification library
  alert(`Error: ${message}. Please try again later.`);
}

/**
 * Обрабатывает ошибки API и показывает соответствующее сообщение
 * @param error - ошибка для обработки
 */
export function handleError(error: unknown): void {
  if (error instanceof Error) {
    showError(error);
  } else if (typeof error === 'object' && error !== null && 'message' in error) {
    showError(error as ApiError);
  } else {
    showError(new Error('An unexpected error occurred'));
  }
} 