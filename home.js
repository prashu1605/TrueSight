const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');

dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const files = e.dataTransfer.files;
  if (files.length) {
    handleFiles(files);
  }
});

fileInput.addEventListener('change', () => {
  if (fileInput.files.length) {
    handleFiles(fileInput.files);
  }
});

// ✨ Updated handleFiles function with backend upload + redirect
function handleFiles(files) {
  const file = files[0];
  const formData = new FormData();
  formData.append("file", file);

  fetch("http://localhost:5000/upload", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      const imageUrl = `http://localhost:5000/images/${data.filename}`;
      const score = data.score;
      const label = data.label;  // ✅ add this line
      window.location.href = `result.html?img=${encodeURIComponent(imageUrl)}&score=${score}&label=${encodeURIComponent(label)}`;
    })
    .catch((err) => {
      alert("Upload failed.");
      console.error(err);
    });
}

