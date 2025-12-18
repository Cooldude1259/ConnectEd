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

async function handleAuth(type) {
    const email = document.getElementById(`${type}-email`).value;
    const password = document.getElementById(`${type}-password`).value;
    const statusMsg = document.getElementById('status-msg');

    // 'type' will be either 'signup' or 'login'
    // This matches the @auth_blueprint routes in Python
    try {
        const response = await fetch(`/auth/${type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (response.ok) {
            statusMsg.innerText = `${type} successful! User ID: ${result.user}`;
            statusMsg.style.color = "green";
        } else {
            statusMsg.innerText = `Error: ${result.error}`;
            statusMsg.style.color = "red";
        }
    } catch (err) {
        console.error("Auth failed:", err);
    }
}

window.onload = loadData;