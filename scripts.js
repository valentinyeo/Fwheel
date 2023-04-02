document.addEventListener("DOMContentLoaded", () => {
  const resetButton = document.getElementById("reset-button");
  const saveButton = document.getElementById("save-button");
  const leftTextarea = document.getElementById("left-textarea");
  const rightTextarea = document.getElementById("right-textarea");

  // Load content from local storage
  leftTextarea.value = localStorage.getItem("leftContent") || "";
  rightTextarea.value = localStorage.getItem("rightContent") || "";

  resetButton.addEventListener("click", reset);
  saveButton.addEventListener("click", saveAsTxt);

  leftTextarea.addEventListener("keydown", handleTab);
  rightTextarea.addEventListener("keydown", handleTab);

  leftTextarea.addEventListener("input", () => {
    localStorage.setItem("leftContent", leftTextarea.value);
  });
  rightTextarea.addEventListener("input", () => {
    localStorage.setItem("rightContent", rightTextarea.value);
  });

  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "Enter") {
      reset();
    }
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault();
      saveAsTxt();
    }
  });

  function handleTab(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      const target = event.target === leftTextarea ? rightTextarea : leftTextarea;
      target.focus();
      target.selectionStart = target.selectionEnd = target.value.length;
    }
  }

  function reset() {
    document.body.classList.add("fire-animation");
    setTimeout(() => {
      leftTextarea.value = "";
      rightTextarea.value = "";
      document.body.classList.remove("fire-animation");
    }, 1000);
  }

  function saveAsTxt() {
    const leftContent = `Stuff that I do:\n${leftTextarea.value}`;
    const rightContent = `Stuff that the universe does for me:\n${rightTextarea.value}`;
    const combinedContent = `${leftContent}\n\n${rightContent}`;
    const blob = new Blob([combinedContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "content.txt";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
});
