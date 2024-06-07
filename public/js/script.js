const video = document.querySelector('#video');
const startButton = document.querySelector('#startButton');
const stopButton = document.querySelector('#stopButton');
const saveButton = document.querySelector('#saveButton');
const descriptionInput = document.querySelector('#description');

let mediaRecorder;
let recordedBlobs;

startButton.addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    mediaRecorder = new MediaRecorder(stream);

    recordedBlobs = [];
    mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
            recordedBlobs.push(event.data);
        }
    };

    mediaRecorder.start();
    startButton.disabled = true;
    stopButton.disabled = false;
    saveButton.disabled = true;
});

stopButton.addEventListener('click', () => {
    mediaRecorder.stop();
    stopButton.disabled = true;
    saveButton.disabled = false;
});

saveButton.addEventListener('click', async () => {
    const blob = new Blob(recordedBlobs, { type: 'video/webm' });
    const description = descriptionInput.value;

    const formData = new FormData();
    formData.append('video', blob);
    formData.append('description', description);

    const response = await fetch('/record', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        window.location.href = '/view';
    } else {
        console.error('Failed to save video');
    }
});
