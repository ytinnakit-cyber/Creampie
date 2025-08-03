const API_KEY = "YOUR_API_KEY"; 
const FOLDER_ID = "YOUR_FOLDER_ID"; 

async function loadVideos() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "รอก่อนนะหมู";

    try {
        const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType+contains+'video'&key=${API_KEY}&fields=files(id,name)`;
        const res = await fetch(url);
        const data = await res.json();

        gallery.innerHTML = "";

        if (!data.files || data.files.length === 0) {
            gallery.innerHTML = "<p>ไม่มีวิดีโอ</p>";
            return;
        }

        data.files.forEach(file => {
            gallery.innerHTML += `
                <div class="movie">
                    <iframe src="https://drive.google.com/file/d/${file.id}/preview" allowfullscreen></iframe>
                    <div>${file.name}</div>
                </div>
            `;
        });
    } catch (err) {
        gallery.innerHTML = "<p>เกิดข้อผิดพลาด</p>";
    }
}

function openMenu() {
    document.getElementById("sideMenu").style.width = "220px";
}

function closeMenu() {
    document.getElementById("sideMenu").style.width = "0";
}

loadVideos();
