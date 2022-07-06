import Swal from 'sweetalert2';

export function popUpMessage(
  messageType: string = 'won',
  title = 'CONGRADULATIONS',
  score = 0
): void {
  if (messageType === 'won') {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title,
      text: `YOU WON!! SCORE: ${score}`,
      timer: 10000,
    });
  } else {
    Swal.fire({
      position: 'top',
      icon: 'error',
      title,
      text: `Please Try Again!!`,
      timer: 10000,
    });
  }
}
