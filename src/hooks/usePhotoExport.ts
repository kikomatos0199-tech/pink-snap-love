import { useCallback } from 'react';
import html2canvas from 'html2canvas';

export const usePhotoExport = () => {
  const exportAsImage = useCallback(async (element: HTMLElement | null, filename: string) => {
    if (!element) return;

    try {
      // Clone the element to avoid modifying the original
      const clone = element.cloneNode(true) as HTMLElement;
      
      // Create a container for the clone
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.appendChild(clone);
      document.body.appendChild(container);

      // Wait for fonts and images to load
      await document.fonts.ready;
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(clone, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          // Ensure all images are loaded in cloned document
          const images = clonedDoc.getElementsByTagName('img');
          return Promise.all(
            Array.from(images).map(img => {
              if (img.complete) return Promise.resolve();
              return new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
              });
            })
          );
        },
      });

      // Clean up
      document.body.removeChild(container);

      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error exporting image:', error);
    }
  }, []);

  return { exportAsImage };
};
