import { ref } from 'vue';

export function useNotification() {
  const showNotification = ref(false);
  const notificationMessage = ref('');

  const showMessage = (message: string, duration = 2000) => {
    notificationMessage.value = message;
    showNotification.value = true;
    setTimeout(() => {
      showNotification.value = false;
    }, duration);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showMessage('ID copiado al portapapeles!');
    } catch (err) {
      console.error('Error al copiar el ID:', err);
      showMessage('Error al copiar el ID.');
    }
  };

  return {
    showNotification,
    notificationMessage,
    showMessage,
    copyToClipboard,
  };
}
