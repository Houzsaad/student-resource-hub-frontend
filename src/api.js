const BASE = "http://127.0.0.1:8000/api";

function authHearders() {
    const token = localStorage.getItem("access_token");
    return { Authorization: "Bearer " + token};
}

export async function getResources(search = "") {
    const res = await fetch(`${BASE}/resources/resources/?search=${search}`);
    const data = await res.json();
    return data;
}

export async function getResource(id) {
    const res = await fetch(`${BASE}/resources/resources/${id}`);
    return res.json();
}

export async function loginUser(email, password) {
    const res = await fetch(`http://127.0.0.1:8000/api/accounts/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password}),
    });
    return res.json();
}


export async function registerUser(formData) {
    const res = await fetch(`${BASE}/auth/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });
    return res.json();
}


export async function uploadResource(formData) {
    const res = await fetch(`${BASE}/127.0.0.1:8000/resources/resources/`, {
        method: "POST",
        headers: authHearders(),
        body: (formData),
    });
    return res.json();
}

export default authHearders;