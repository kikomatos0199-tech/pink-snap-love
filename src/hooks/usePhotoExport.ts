import { useCallback } from 'react';
import html2canvas from 'html2canvas';

export const usePhotoExport = () => {
  const exportAsImage = useCallback(async (element: HTMLElement | null, filename: string) => {
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error exporting image:', error);
    }
  }, []);

  return { exportAsImage };
};
