// Dynamic WP posts display on page

let currentPage = 1;
const perPage = 4; // Number of blogs per page
const apiURL = "http://localhost/myblog/wp-json/wp/v2/posts";

async function loadWPBlogs(page = 1) {
  currentPage = page;

  const res = await fetch(`${apiURL}?per_page=${perPage}&page=${page}&_embed`);
  const posts = await res.json();

  let html = "";

  posts.forEach((post) => {
    let img = "../icons/blog_page/01.png";

    // 1) Featured image
    if (
      post._embedded &&
      post._embedded["wp:featuredmedia"] &&
      post._embedded["wp:featuredmedia"][0] &&
      post._embedded["wp:featuredmedia"][0].source_url
    ) {
      img = post._embedded["wp:featuredmedia"][0].source_url;
    } else {
      // 2) Fallback from content
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content.rendered, "text/html");
      const firstImg = doc.querySelector("img");
      if (firstImg) img = firstImg.src;
    }

    html += `
    <div class="col col-md-6">
      <div class="card h-100 shadow-sm border-0">
        <div class="card-img-wrapper">
          <img src="${img}" class="card-img-top edit-img" />
        </div>

        <div class="card-body px-0">
          <a href="single-blog.html?id=${post.id}"><h5 class="card-title">${
      post.title.rendered
    }</h5></a>
          <p class="card-text">${post.excerpt.rendered}</p>
          <small>${new Date(post.date).toDateString()}</small>

          <a href="single-blog.html?id=${post.id}" class="btn btn-sm">
            Read More
          </a>
        </div>
      </div>
    </div>`;
  });

  document.getElementById("wp-blog-cards").innerHTML = html;

  // Render pagination
  renderPagination(res.headers.get("X-WP-TotalPages"));
}

function renderPagination(totalPages) {
  totalPages = parseInt(totalPages);

  let p = "";

  // Previous button
  if (currentPage > 1) {
    p += `<button onclick="loadWPBlogs(${currentPage - 1})">Prev</button>`;
  }

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    p += `<button onclick="loadWPBlogs(${i})" 
             class="${currentPage == i ? "active-page" : ""}">
             ${i}
          </button>`;
  }

  // Next button
  if (currentPage < totalPages) {
    p += `<button onclick="loadWPBlogs(${currentPage + 1})">Next</button>`;
  }

  document.getElementById("pagination").innerHTML = p;
}

loadWPBlogs();

// Dynamic aside bar display on page

async function loadRecentPosts() {
  const res = await fetch(
    "http://localhost/myblog/wp-json/wp/v2/posts?per_page=3&_embed"
  );
  const posts = await res.json();

  let html = "";

  posts.forEach((post) => {
    let img = "../icons/blog_page/01.png"; // fallback

    // Featured image detection
    if (
      post._embedded &&
      post._embedded["wp:featuredmedia"] &&
      post._embedded["wp:featuredmedia"][0] &&
      post._embedded["wp:featuredmedia"][0].source_url
    ) {
      img = post._embedded["wp:featuredmedia"][0].source_url;
    } else {
      // extract first image from content
      const doc = new DOMParser().parseFromString(
        post.content.rendered,
        "text/html"
      );
      const firstImg = doc.querySelector("img");
      if (firstImg) img = firstImg.src;
    }

    html += `
      <div class="col col-md-12">
        <div class="aside-topic-card">
          <img src="${img}" alt="" />
          <span class="layer"><i class="fa-classic fa-bolt"></i></span>
          <div class="aside-topic-info ms-3">
            <a href="single-blog.html?id=${post.id}" class="title-link">
            <span>${post.title.rendered}</span>
            </a>
            <small>${new Date(post.date).toDateString()}</small>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById("recent-posts-container").innerHTML = html;
}
loadRecentPosts();

// Dynamic Category section display on page for future use
async function loadCategories() {
  const res = await fetch(
    "http://localhost/myblog/wp-json/wp/v2/categories?per_page=3"
  );
  const cats = await res.json();

  let html = "";

  cats.forEach((cat) => {
    html += `
      <div class="col col-md-12">
        <div class="aside-topic-card">
          <a href="blog.html?category=${cat.id}">${cat.name}</a>
          <a>${cat.count}</a>
        </div>
      </div>
    `;
  });

  document.getElementById("categories-container").innerHTML = html;
}
loadCategories();

// single-page dynamic blog code
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

fetch(`http://localhost/myblog/wp-json/wp/v2/posts/${postId}?_embed`)
  .then((res) => res.json())
  .then((post) => {
    document.getElementById("post-title").innerHTML = post.title.rendered;

    document.getElementById("post-content").innerHTML = post.content.rendered;

    document.getElementById("post-date").innerText = new Date(
      post.date
    ).toDateString();

    // document.getElementById("post-comments").innerText = post.comment_count;

    document.getElementById("post-author").innerText =
      post._embedded.author[0].name;

    document.getElementById("post-featured-img").src =
      post._embedded["wp:featuredmedia"]?.[0]?.source_url || "";
  });

fetch(
  `http://localhost/myblog/wp-json/wp/v2/comments?post=${postId}&per_page=10`
)
  .then((res) => res.json())
  .then((comments) => {
    document.getElementById("post-comments").innerText = comments.length;
  })
  .catch(() => {
    document.getElementById("post-comments").innerText = 0;
  });

// back button event handler
document.getElementById("back-btn").addEventListener("click", () => {
  if (document.referrer) {
    window.history.back();
  } else {
    window.location.href = "blog";
  }
});

/* PREVIOUS POST */
// fetch(
//   `http://localhost/myblog/wp-json/wp/v2/posts?per_page=1&before=${new Date().toISOString()}`
// )
//   .then((res) => res.json())
//   .then((posts) => {
//     if (!posts.length) return;
//     document.getElementById("previous-post").innerHTML = `
//       <a href="single-blog.html?id=${posts[0].id}">
//         ${posts[0].title.rendered}
//       </a>
//     `;
//   });
