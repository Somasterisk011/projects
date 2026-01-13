// Dynamic WP posts display on page
let currentPage = 1;
const perPage = 4;
const apiURL = "https://legacylawexpert.com/BlogLLE/wp-json/wp/v2/posts";

const container = document.getElementById("wp-blog-cards");

/* ---------- Skeleton Loader (USES .skeleton-card) ---------- */
function showSkeletons() {
  let skel = "";
  for (let i = 0; i < perPage; i++) {
    skel += `
      <div class="col col-md-6">
        <div class="skeleton-card"></div>
      </div>`;
  }
  container.innerHTML = skel;
}

/* ---------- Error UI (USES .blog-error) ---------- */
function showError() {
  container.innerHTML = `
    <div class="blog-error">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
        10-4.48 10-10S17.52 2 12 2z"
          stroke="#999" stroke-width="1.5"/>
        <path d="M8 10h8M8 14h5"
          stroke="#999" stroke-width="1.5"/>
      </svg>
      <h5>Blogs not available</h5>
      <p class='error404'>404</p>
    </div>
  `;
}

/* ---------- Load Blogs ---------- */
async function loadWPBlogs(page = 1) {
  currentPage = page;
  showSkeletons();

  try {
    const res = await fetch(
      `${apiURL}?per_page=${perPage}&page=${page}&_embed`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Fetch failed");

    const posts = await res.json();
    let html = "";

    posts.forEach((post, i) => {
      let img = "../icons/blog_page/01.png";

      if (post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
        img = post._embedded["wp:featuredmedia"][0].source_url;
      }

      html += `
        <div class="col col-md-6 fade-in" style="animation-delay:${i * 80}ms">
          <div class="card h-100 shadow-sm border-0">
            <div class="card-img-wrapper">
              <img src="${img}" class="card-img-top edit-img" />
            </div>
            <div class="card-body px-0">
              <a href="single-blog.html?id=${post.id}">
                <h5 class="card-title">${post.title?.rendered || ""}</h5>
              </a>
              <p class="card-text">${post.excerpt?.rendered || ""}</p>
              <small>${new Date(post.date).toDateString()}</small>
              <a href="single-blog.html?id=${post.id}" class="btn btn-sm">
                Read More
              </a>
            </div>
          </div>
        </div>`;
    });

    container.innerHTML = html;

    const totalPages = res.headers.get("X-WP-TotalPages");
    if (totalPages) renderPagination(totalPages);
  } catch (err) {
    console.error(err);
    showError();
  }
}

/* ---------- Pagination ---------- */
function renderPagination(totalPages) {
  totalPages = parseInt(totalPages);
  let p = "";

  if (currentPage > 1) {
    p += `<button onclick="loadWPBlogs(${currentPage - 1})">Prev</button>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    p += `<button onclick="loadWPBlogs(${i})"
      class="${currentPage === i ? "active-page" : ""}">
      ${i}
    </button>`;
  }

  if (currentPage < totalPages) {
    p += `<button onclick="loadWPBlogs(${currentPage + 1})">Next</button>`;
  }

  document.getElementById("pagination").innerHTML = p;
}

if (container) {
  loadWPBlogs();
}
// Dynamic aside bar display on page

async function loadRecentPosts() {
  const res = await fetch(
    "https://legacylawexpert.com/BlogLLE/wp-json/wp/v2/posts?per_page=3&_embed"
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
    "https://legacylawexpert.com/BlogLLE/wp-json/wp/v2/categories?per_page=3"
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

// ---------- SINGLE POST ----------
if (postId) {
  fetch(
    `https://legacylawexpert.com/BlogLLE/wp-json/wp/v2/posts/${postId}?_embed`
  )
    .then((res) => {
      if (!res.ok) throw new Error("Post not found");
      return res.json();
    })
    .then((post) => {
      document.getElementById("post-title").innerHTML =
        post?.title?.rendered || "";

      document.getElementById("post-content").innerHTML =
        post?.content?.rendered || "";

      document.getElementById("post-date").innerText = new Date(
        post.date
      ).toDateString();

      document.getElementById("post-author").innerText =
        post?._embedded?.author?.[0]?.name || "";

      document.getElementById("post-featured-img").src =
        post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
    })
    .catch((err) => {
      console.error("Post load failed:", err);
    });

  // ---------- COMMENTS ----------
  fetch(
    `https://legacylawexpert.com/BlogLLE/wp-json/wp/v2/comments?post=${postId}&per_page=10`
  )
    .then((res) => res.json())
    .then((comments) => {
      const commentsEl = document.getElementById("post-comments");
      if (commentsEl) commentsEl.innerText = comments.length;
    })
    .catch(() => {
      const commentsEl = document.getElementById("post-comments");
      if (commentsEl) commentsEl.innerText = 0;
    });
} else {
  console.warn("No post ID found → skipping single post & comments fetch");
}

// back button event handler
const backBtn = document.getElementById("back-btn");

if (backBtn) {
  backBtn.addEventListener("click", () => {
    if (document.referrer) {
      window.history.back();
    } else {
      window.location.href = "blog";
    }
  });
}
