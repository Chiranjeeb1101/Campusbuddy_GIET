async function listModels() {
    const key = "AIzaSyC7dgOm_qGk5wglEVn0WX6eZKE7Bii8eqQ";
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.models) {
            data.models.forEach(m => console.log(m.name));
        } else {
            console.log(JSON.stringify(data, null, 2));
        }
    } catch (e) {
        console.error("Error:", e.message);
    }
}

listModels();
