async function loadData() {
    // Note the path: /api (from main.py) + /get-items (from supabase_api.py)
    const response = await fetch('/api/get-items');
    const result = await response.json();
    
    if (result.status === "success") {
        console.log("Data received:", result.data);
        document.getElementById('output').innerText = JSON.stringify(result.data, null, 2);
    } else {
        console.error("API Error:", result.message);
    }
}

window.onload = loadData;