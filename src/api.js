//const BASE = "http://127.0.0.1:8000/api";
const BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

function authHearders() {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
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
    const res = await fetch(`${BASE}/resources/resources/${id}/`, {
    headers: authHearders(),
    });
    if (!res.ok) {
        throw new Error("Failed to fetch resoureces :)")
    }
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

export async function deleteResource(id) {
  const res = await fetch(`${BASE}/resources/resources/${id}/`, {
    method: "DELETE",
    headers: authHearders(),
  });
  if (!res.ok) throw new Error("Failed to delete resource");
}


export async function editResource(id, edit) {
  const res = await fetch(`${BASE}/resources/resources/${id}/`, {
    method: "PATCH",
    headers: {
      ...authHearders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(edit),
  });
  if (!res.ok) throw new Error("Failed to update resource");
  return res.json();
}

export async function createRating(resourceId, score) {
  const res = await fetch(`${BASE}/interactions/ratings/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHearders(),
    },
    body: JSON.stringify({
      resource: resourceId,
      score: score,
    }),
  });

  const data = await res.json();
  console.log("Rating status:", res.status);
  console.log("Rating resp:", data);

  if (!res.ok) {
    throw new Error(
      data.resource?.[0] ||
      data.user?.[0] ||
      data.non_field_errors?.[0] ||
      data.detail ||
      "Failed to submit rating"
    );
  }

  return data;
}

export async function submitResource(formData) {
  const res = await fetch(`${BASE}/resources/submissions/`, {
    method: "POST",
    headers: authHearders(),
    body: formData,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      data.detail ||
      data.title?.[0] ||
      data.file?.[0] ||
      data.link?.[0] ||
      "Failed to submit resource"
    );
  }

  return data;
}

export default authHearders;
