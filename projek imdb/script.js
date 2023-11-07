//mengambil data dari api
const cari = document.querySelector(".cari");
cari.addEventListener("click", function () {
  //bagian pengambilan data
  const dataPencarian = new Promise((resolve, reject) => {
    const inputan = document.querySelector(".inputan").value;
    const film = fetch("http://www.omdbapi.com/?apikey=457acef5&s=" + inputan);

    let spinner = document.querySelector(".loader-wrapper");
    spinner.style.display = "flex";
    setTimeout(() => {
      if (film) {
        resolve(film);
      } else {
        reject("data tidak ditemukan");
      }
    }, 2000);
  });

  dataPencarian
    .then((response) => response.json())
    .then((response) => {
      const spinner = document.querySelector(".loader-wrapper");
      spinner.style.display = "flex";
      const movie = response.Search;
      console.log(movie);
      let kartu = "";
      //setiap data yng diambiil di looping
      const penampilan = movie.forEach((el) => {
        kartu += `<div class=" card m-3 bg-secondarys" style="width: 18rem">
                    <img src="${el.Poster}" class="card-img-top"  />
                    <div class="card-body ">
                      <h5 class="card-title">${el.Title}</h5>
                      <p class="card-text">
                        ${el.Year}</br>
                        ${el.Type}
                      </p>
                      <a  class="btn btn-primary detail"
        data-bs-target="#detailTarget" data-imdbid="${el.imdbID}" data-bs-toggle="modal" >Detail</a>
                    </div>
                  </div>`;
      });
      const datap = document.querySelector(".dapatkan");
      datap.innerHTML = kartu;
      //bagian detail film
      document.addEventListener("click", function (e) {
        if (e.target.classList.contains("detail")) {
          const idDetail = e.target.dataset.imdbid;
          fetch(`http://www.omdbapi.com/?apikey=457acef5&i=${idDetail}`)
            .then((response) => response.json())
            .then((response) => {
              const tampil = updateDetail(response);
              const modalDetail = document.querySelector(".modalDetail");
              modalDetail.innerHTML = tampil;
            });

          function updateDetail(response) {
            return `<section class="container-fluid text-center bg-secondary">
            <div
  class="modal fade modalDetail"
  id="detailTarget"
        tabindex="-1"
  aria-labelledby="detailTargetLabel"
  aria-hidden="true"
  >
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="detailTargetLabel">
          Modal title
        </h1>
  
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
  
      <div class="modal-body">
        <div class="container-fluid">
        <div class="row">
        <img src="${response.Poster}">
            <ul class="list-group">
              <li class="list-group-item">Title : ${response.Title}</li>
              <li class="list-group-item">Genre : ${response.Genre}sedih</li>
              <li class="list-group-item">Writer : ${response.Writer}</li>
              <li class="list-group-item">Director : ${response.Director}</li>
              <li class="list-group-item">Actor : ${response.Actors}</li>
              <li class="list-group-item">Plot : ${response.Plot}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button type="button" class="btn btn-primary">
          Save changes
        </button>
      </div>
    </div>
  </div>
  </div>
   </section>`;
          }
        }
      });
    })
    .catch((err) => console.log(err));
});
