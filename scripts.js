  document.addEventListener('keydown', function(event) {
    if (event.altKey) {
      if (event.key === '1') {
        window.location.href = 'pmat.html';
      } else if (event.key === '2') {
        window.location.href = 'fwheel.html';
      } else if (event.key === '3') {
        window.location.href = 'mpages.html';
      }
    } else if (event.ctrlKey && event.key === 'Enter') {
      resetTextAreas();
    } else if (event.ctrlKey && (event.key === 'S' || event.key === 's')) {
      event.preventDefault();
      saveTextAreasAsFile();
    }
  });

  function resetTextAreas() {
    document.getElementById('left-textarea').value = '';
    document.getElementById('right-textarea').value = '';
    localStorage.removeItem('left-textarea');
    localStorage.removeItem('right-textarea');
  }
  
document.addEventListener('keydown', handleTab);

function handleTab(event) {
  if (event.key === "Tab") {
    event.preventDefault();
    if (document.activeElement === leftTextarea) {
      rightTextarea.focus();
      rightTextarea.selectionStart = rightTextarea.selectionEnd = rightTextarea.value.length;
    } else if (document.activeElement === rightTextarea) {
      leftTextarea.focus();
      leftTextarea.selectionStart = leftTextarea.selectionEnd = leftTextarea.value.length;
    } else {
      leftTextarea.focus();
      leftTextarea.selectionStart = leftTextarea.selectionEnd = leftTextarea.value.length;
    }
  }
}






  function saveTextAreasAsFile() {
    const leftText = document.getElementById('left-textarea').value;
    const rightText = document.getElementById('right-textarea').value;
    const combinedText = `My Todos:\n${leftText}\n\nUniverse Todos:\n${rightText}`;
    const blob = new Blob([combinedText], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'todos.txt';
    link.click();
  }

  document.getElementById('reset-button').addEventListener('click', resetTextAreas);
  document.getElementById('save-button').addEventListener('click', saveTextAreasAsFile);

  const leftTextarea = document.getElementById('left-textarea');
  const rightTextarea = document.getElementById('right-textarea');

  leftTextarea.value = localStorage.getItem('left-textarea') || '';
  rightTextarea.value = localStorage.getItem('right-textarea') || '';

  leftTextarea.addEventListener('input', function() {
    localStorage.setItem('left-textarea', leftTextarea.value);
  });

  rightTextarea.addEventListener('input', function() {
    localStorage.setItem('right-textarea', rightTextarea.value);
  });