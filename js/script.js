//spapp
var app = $.spapp({
  defaultView: "#home",
  templateDir: "./views/",
  reloadView: true,
});

app.route({
  view: "stock",
  load: "stock.html",
  onCreate: function () {},
  onReady: function () {
    fetchShoes();
  },
});

app.route({
  view: "home",
  load: "home.html",
  onCreate: function () {},
  onReady: function () {
    fetchShoesHome();
  },
});

app.route({
  view: "about",
  load: "about.html",
  onCreate: function () {},
  onReady: function () {
    fetchTeam();
  },
});

app.route({
  view: "about",
  load: "about.html",
  onCreate: function () {},
  onReady: function () {
    fetchReviews();
  },
});

app.route({
  view: "services",
  load: "services.html",
  onCreate: function () {},
  onReady: function () {
    fetchServicePageShoes();
  },
});

app.route({
  view: "location",
  load: "location.html",
  onCreate: function () {},
  onReady: function () {
    fetchLocations();
  },
});

function fetchShoes() {
  fetch("json/shoes.json")
    .then((response) => response.json())
    .then((data) => {
      let container = document.querySelector(".row.in-stock");
      container.innerHTML = ""; // Clear the existing content
      data.shoes.forEach((product) => {
        let productItem = document.createElement("div");
        productItem.className = "col-12 col-md-4 col-lg-3 mb-5";
        productItem.innerHTML = `
            <a class="product-item" href="#">
              <img src="${product.image}" class="img-fluid product-thumbnail" />
              <h3 class="product-title">${product.name}</h3>
              <strong class="product-price">${product.price}</strong>
            </a>
          `;
        container.appendChild(productItem);

        // Add click event listener to each product item
        productItem
          .querySelector(".product-item")
          .addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior

            // Clear previous content
            document.getElementById("sizes").innerHTML = "";
            document.getElementById("reserve-button").style.display = "none";
            document.getElementById("reserved-message").style.display = "none";

            // Set modal content based on the clicked product
            document.getElementById("modalProductTitle").innerText =
              product.name;
            document.getElementById("modalProductImage").src = product.image;
            document.getElementById("modalProductPrice").innerText =
              product.price;

            // Open the modal
            document.getElementById("myModal").style.display = "block";

            // Populate the sizes container with buttons for each size
            product.sizes.forEach((size) => {
              let button = document.createElement("button");
              button.textContent = size;
              button.className = "size-button";
              button.addEventListener("click", function () {
                // Highlight the selected size
                document.querySelectorAll(".size-button").forEach((btn) => {
                  btn.classList.remove("selected");
                });
                button.classList.add("selected");

                // Show the reserve button
                document.getElementById("reserve-button").style.display =
                  "block";
              });
              document.getElementById("sizes").appendChild(button);
            });
          });

        // Add event listener to the reserve button
        let res = document.getElementById("reserve-button");
        res.addEventListener("click", function () {
          document.getElementById("reserved-message").style.display = "block";
        });
      });
    });
}

function fetchShoesHome() {
  fetch("json/homeShoes1.json")
    .then((response) => response.json())
    .then((data) => {
      let sneakerRow = document.querySelector(".sneaker-row");
      sneakerRow.innerHTML = ""; // Clear the existing content
      data.homeShoes1.forEach((product) => {
        let productItem = document.createElement("div");
        productItem.className = "col-12 col-md-4 col-lg-4 mb-5 mb-md-0";
        productItem.innerHTML = `
          <a class="product-item" href="#">
            <img src="${product.image}" class="img-fluid product-thumbnail" />
            <h3 class="product-title">${product.name}</h3>
            <strong class="product-price">${product.price}</strong>
          </a>
        `;
        sneakerRow.appendChild(productItem);

        // Add click event listener to each product item
        productItem
          .querySelector(".product-item")
          .addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior
            // Set modal content based on the clicked product

            document.getElementById("sizes").innerHTML = "";
            product.sizes.forEach((size) => {
              let li = document.createElement("li");
              li.textContent = size;
              document.getElementById("sizes").appendChild(li);
            });
            document.getElementById("modalProductTitle").innerText =
              product.name;
            document.getElementById("modalProductImage").src = product.image;
            document.getElementById("modalProductPrice").innerText =
              product.price;

            // Open the modal
            document.getElementById("myModal").style.display = "block";

            document.getElementById("modalProductTitle").innerText =
              product.name;
            document.getElementById("modalProductImage").src = product.image;
            document.getElementById("modalProductPrice").innerText =
              product.price;

            // Open the modal
            document.getElementById("myModal").style.display = "block";
          });
      });
    });
}

function changeActiveClass() {
  $(document).ready(function () {
    $(".navbar-nav .nav-link").on("click", function () {
      // Remove 'active' class from all nav items
      $(".nav-item").removeClass("active");

      // Add 'active' class to the parent nav item of the clicked element
      $(this).closest(".nav-item").addClass("active");
    });
  });

  $(window).on("hashchange", function () {
    var hash = window.location.hash;

    // Remove 'active' class from all nav items
    $(".nav-item").removeClass("active");

    // Add 'active' class to the nav item that corresponds to the new hash
    $('.nav-item a[href="' + hash + '"]')
      .parent()
      .addClass("active");
  });

  // Trigger the hashchange event when the page loads, to highlight the correct nav item
  $(window).trigger("hashchange");
}

function fetchTeam() {
  fetch("json/team.json")
    .then((response) => response.json())
    .then((data) => {
      let container = document.querySelector(".untree_co-section .row");
      container.innerHTML = ""; // Clear the existing content
      data.team.forEach((member) => {
        let memberItem = document.createElement("div");
        memberItem.className = "col-12 col-md-6 col-lg-3 mb-5 mb-md-0";
        memberItem.innerHTML = `
        <img src="${member.image}" class="img-fluid mb-5" />
        <h3><a href="#"><span class="">${member.name}</span></a></h3>
        <span class="d-block position mb-4">${member.position}</span>
        <p>"${member.statement}"</p>
      `;
        container.appendChild(memberItem);
      });
    });
}

function fetchReviews() {
  fetch("json/reviews.json")
    .then((response) => response.json())
    .then((data) => {
      let slider = document.querySelector(".testimonial-slider");
      slider.innerHTML = ""; // Clear the existing content
      data.reviews.forEach((review) => {
        let reviewItem = document.createElement("div");
        reviewItem.className = "item";
        reviewItem.innerHTML = `
          <div class="row justify-content-center">
            <div class="col-lg-8 mx-auto">
              <div class="testimonial-block text-center">
                <blockquote class="mb-5">
                  <p>&ldquo;${review.review}&rdquo;</p>
                </blockquote>
                <div class="author-info">
                  <h3 class="font-weight-bold">${review.author}</h3>
                  <span class="position d-block mb-3">Customer</span>
                </div>
              </div>
            </div>
          </div>
        `;
        slider.appendChild(reviewItem);
      });
      // Initialize the slider (tns) here
      tns({
        container: ".testimonial-slider",
        items: 1,
        slideBy: "page",
        autoplay: true,
        controlsContainer: "#testimonial-nav",
        autoplayButtonOutput: false,
        nav: false,
        mouseDrag: true,
        swipeAngle: false,
        speed: 400,
        autoplayTimeout: 5000,
      });
    });
}

//pr
function fetchServicePageShoes() {
  fetch("json/servicePageShoes.json")
    .then((response) => response.json())
    .then((data) => {
      let container = document.querySelector(".row.servicePageShoes"); // Replace with the actual row selector
      container.innerHTML = ""; // Clear the existing content
      data.servicePageShoes.forEach((shoe) => {
        let productItem = document.createElement("div");
        productItem.className = "col-md-4 mb-5 mb-md-0"; // Replace with the actual class name
        productItem.innerHTML = `
          <a class="product-item" href="#">
            <img class="img-fluid product-thumbnail" src="${shoe.image}" alt="${shoe.name}" />
            <h3 class="product-title">${shoe.name}</h3>
            <strong class="product-price">${shoe.price}</strong>
          </a>
        `;
        container.appendChild(productItem);

        // Add click event listener to each product item
        productItem
          .querySelector(".product-item")
          .addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior
            // Set modal content based on the clicked product

            document.getElementById("sizes").innerHTML = "";
            product.sizes.forEach((size) => {
              let li = document.createElement("li");
              li.textContent = size;
              document.getElementById("sizes").appendChild(li);
            });
            document.getElementById("modalProductTitle").innerText =
              product.name;
            document.getElementById("modalProductImage").src = product.image;
            document.getElementById("modalProductPrice").innerText =
              product.price;

            // Open the modal
            document.getElementById("myModal").style.display = "block";

            document.getElementById("modalProductTitle").innerText =
              product.name;
            document.getElementById("modalProductImage").src = product.image;
            document.getElementById("modalProductPrice").innerText =
              product.price;

            // Open the modal
            document.getElementById("myModal").style.display = "block";
          });
      });

      // Close modal when clicking on the close button or outside the modal
      document.querySelector(".close").addEventListener("click", function () {
        document.getElementById("myModal").style.display = "none";
      });
      window.addEventListener("click", function (event) {
        if (event.target == document.getElementById("myModal")) {
          document.getElementById("myModal").style.display = "none";
        }
      });
    });
}

function fetchLocations() {
  fetch("json/locations.json")
    .then((response) => response.json())
    .then((data) => {
      let container = document.querySelector(".row.locations"); // Replace with the actual row selector
      container.innerHTML = ""; // Clear the existing content
      data.locations.forEach((location) => {
        let locationItem = document.createElement("div");
        locationItem.className = "col-12 col-md-4 col-lg-3 mb-5"; // Replace with the actual class name
        locationItem.innerHTML = `
        <a class="product-item" href="${location.link}" target="_blank">
          <img class="img-fluid product-thumbnail" src="images/location-ping.png" alt="blabla" />
          <h3 class="product-title">${location.shopName}</h3>
          <strong class="product-price">${location.location}</strong>
        </a>
      `;
        container.appendChild(locationItem);
      });
    })
    .catch((error) => console.error("Error:", error));
}

app.run();
