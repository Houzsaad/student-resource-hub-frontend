//const BASE = "http://127.0.0.1:8000/api";
const BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";


function authHearders() {
    const token = localStorage.getItem("access_token");
    return { Authorization: "Bearer " + token};
}

export async function getResources(search = "") {
    const res = await fetch(`${BASE}/resources/resources/?search=${search}`);
    const data = await res.json();
    return data;
}

export async function getCategories() {
    const res = await fetch(`${BASE}/resources/categories/`);
    return res.json();
}

export async function getResource(id) {
    const res = await fetch(`${BASE}/resources/resources/${id}`);
    return res.json();
}


export async function getProfile() {
    const res = await fetch(`${BASE}/accounts/profile/`, {
        headers: authHearders(),
    });
    return res.json();
}

export async function loginUser(email, password) {
    const res = await fetch(`${BASE}/accounts/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password}),
    });
    return res.json();
}


export async function registerUser(formData) {
    const res = await fetch(`${BASE}/accounts/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });
    return res.json();
}


export async function uploadResource(formData) {
    const res = await fetch(`${BASE}/resources/resources/`, {
        method: "POST",
        headers: authHearders(),
        body: (formData),
    });
     if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || "Server Error");
    }
    return res.json();
}

export async function downloadResource(id) {
    const res = await fetch(`${BASE}/resources/resources/${id}/download/`, {
        method: "GET",
        headers: authHearders(),
    });
    return res.blob()
}

export async function getComments(resourceId) {
  const res = await fetch(`${BASE}/interactions/comments/?resource=${resourceId}`);
    // headers: authHearders(),
  //});
  
  return res.json();
}

export async function createComment(resourceId, body) {
  const res = await fetch(`${BASE}/interactions/comments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHearders(),
    },
    body: JSON.stringify({
      resource: resourceId,
      body: body,
    }),
  });
  return res.json();
}

export default authHearders;