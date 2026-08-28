const BASE =  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";


function authHearders() {
  const token = localStorage.getItem("access_token");

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
}

async function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh_token");

  if (!refresh) {
    return null;
  }

  const res = await fetch(`${BASE}/accounts/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: refresh,
    }),
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  if (!data.access) {
    return null;
  }

  localStorage.setItem("access_token", data.access);

  return data.access;
}

async function authFetch(url, options = {}) {
  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...authHearders(),
    },
  });

  // Request succeeded or failed for reasons
  // other than expired authentication.
  if (res.status !== 401) {
    return res;
  }

  // Access token may have expired.
  const newAccessToken = await refreshAccessToken();

  // Refresh failed -> session is over.
  if (!newAccessToken) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/login?expired=true";

    throw new Error("Your session has expired. Please log in again.");
  }

  // Retry the original request with new access token.
  res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...authHearders(),
    },
  });

  return res;
}

export async function getResources(search = "") {
  const res = await fetch(
    `${BASE}/resources/resources/?search=${search}`
  );

  return res.json();
}


export async function getCategories() {
  const res = await fetch(
    `${BASE}/resources/categories/`
  );

  return res.json();
}


export async function getComments(resourceId) {
  const res = await fetch(
    `${BASE}/interactions/comments/?resource=${resourceId}`
  );

  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${BASE}/accounts/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return res.json();
}


export async function registerUser(formData) {
  const res = await fetch(`${BASE}/accounts/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return res.json();
}

export async function getResource(id) {
  const res = await authFetch(
    `${BASE}/resources/resources/${id}/`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch resource");
  }

  return res.json();
}


export async function getProfile() {
  const res = await authFetch(
    `${BASE}/accounts/profile/`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return res.json();
}


export async function uploadResource(formData) {
  const res = await authFetch(
    `${BASE}/resources/resources/`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    throw new Error(
      errorData.detail || "Server Error"
    );
  }

  return res.json();
}


export async function downloadResource(id) {
  const res = await authFetch(
    `${BASE}/resources/resources/${id}/download/`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to download resource");
  }

  return res.blob();
}


export async function createComment(resourceId, body) {
  const res = await authFetch(
    `${BASE}/interactions/comments/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resource: resourceId,
        body: body,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.detail ||
      data.body?.[0] ||
      "Failed to create comment"
    );
  }

  return data;
}


export async function deleteResource(id) {
  const res = await authFetch(
    `${BASE}/resources/resources/${id}/`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to delete resource");
  }
}


export async function editResource(id, edit) {
  const res = await authFetch(
    `${BASE}/resources/resources/${id}/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(edit),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update resource");
  }

  return res.json();
}


export async function createRating(resourceId, score) {
  const res = await authFetch(
    `${BASE}/interactions/ratings/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resource: resourceId,
        score: score,
      }),
    }
  );

  const data = await res.json();

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

<<<<<<< HEAD
export async function getMyResources() {
  const res = await fetch(
    `${BASE}/resources/resources/my-resources/`,
    {
      headers: authHearders(),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch your resources");
=======

export async function submitResource(formData) {
  const res = await authFetch(
    `${BASE}/resources/submissions/`,
    {
      method: "POST",
      body: formData,
    }
  );

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


export async function pendingSubmissions() {
  const res = await authFetch(
    `${BASE}/resources/submissions/pending/`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch pending submissions");
>>>>>>> 08b09e529cee3fa704cc249f0838a5454d9c5305
  }

  return res.json();
}

<<<<<<< HEAD
export default authHearders;
=======

export async function approvalPermission() {
  const res = await authFetch(
    `${BASE}/resources/approval-permission/`
  );

  if (!res.ok) {
    throw new Error("Failed to check permission");
  }

  return res.json();
}


export async function rejectSubmission(id) {
  const res = await authFetch(
    `${BASE}/resources/submissions/${id}/reject/`,
    {
      method: "POST",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.error ||
      data.detail ||
      "Failed to reject submission"
    );
  }

  return data;
}


export async function approveSubmission(id) {
  const res = await authFetch(
    `${BASE}/resources/submissions/${id}/approve/`,
    {
      method: "POST",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.error ||
      data.detail ||
      "Failed to approve submission"
    );
  }

  return data;
}


export async function canApproveResources() {
  const res = await authFetch(
    `${BASE}/resources/approval-permission/`
  );

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return false;
  }

  return data.can_approve_resource === true;
}

export default authHearders;
>>>>>>> 08b09e529cee3fa704cc249f0838a5454d9c5305
