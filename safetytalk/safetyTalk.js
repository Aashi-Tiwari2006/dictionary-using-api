function registerUser() {
    const name = document.getElementById("username").value;

    if (name.trim() === "") {
        alert("Enter your name");
        return;
    }

    localStorage.setItem("username", name);

    document.getElementById("registerPage").style.display = "none";
    document.getElementById("postPage").style.display = "block";

    loadPosts();
}

function addPost() {
    const text = document.getElementById("postText").value;
    const user = localStorage.getItem("username");

    if (text.trim() === "") return;

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.push({
        user: user,
        text: text
    });

    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("postText").value = "";

    loadPosts();
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const postContainer = document.getElementById("posts");

    postContainer.innerHTML = "";

    posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `<strong>${post.user}</strong><p>${post.text}</p>`;
        postContainer.appendChild(div);
    });
}