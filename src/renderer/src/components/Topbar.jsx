export const Topbar = () => {
  const handleClose = () => {
    window.electron.ipcRenderer.send('close-window');
  };

  const handleMinimize = () => {
    window.electron.ipcRenderer.send('minimize-window');
  };

  const handleIncreaseSize = () => {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
      timerElement.classList.toggle('large'); // Alterna tamaño
    }
  };

  return (
    <div>
      <div className="topbar rounded-t-xl bg-blue-400 w-screen h-5"></div>
      <div className="bg-blue-400 w-screen h-4"></div>
      <div id="control-buttons" className="text-stone-200 absolute top-1 right-0 pe-2 flex gap-2">
        <button id="minimize" className="px-1" style={{ fontSize: '20px' }} onClick={handleMinimize}>
          &#128469; {/* Icono de minimizar */}
        </button>
        <button id="increase-size" className="px-1" style={{ fontSize: '18px' }} onClick={handleIncreaseSize}>
          &#9634; {/* Icono de maximizar (☐) */}
        </button>
        <button id="close" className="px-1" style={{ fontSize: '18px' }} onClick={handleClose}>
          &#10006; {/* Icono de cerrar */}
        </button>
      </div>
    </div>
  );
};
