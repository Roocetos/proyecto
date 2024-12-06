// Interactividad del Carrusel
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector("#carouselExampleIndicators");
  
    if (carousel) {
      carousel.addEventListener("slid.bs.carousel", function (event) {
        console.log(`Diapositiva actual: ${event.to}`);
      });
    }
  
    // Validación del formulario de contacto
    $("#contactForm").on("submit", function (event) {
      event.preventDefault();
  
      const name = $("#name").val().trim();
      const email = $("#email").val().trim();
      const message = $("#message").val().trim();
  
      if (name === "" || email === "" || message === "") {
        alert("Todos los campos son obligatorios.");
      } else if (!validateEmail(email)) {
        alert("Por favor, introduce un correo válido.");
      } else {
        alert("Formulario enviado correctamente.");
        // Aquí podrías enviar los datos a un servidor con AJAX
        this.reset();
      }
    });
  
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  
    // Gráfico de estadísticas (Chart.js)
    const chartElement = document.getElementById("healthChart");
    if (chartElement) {
      const ctx = chartElement.getContext("2d");
  
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Ejercicio", "Nutrición", "Sueño", "Estrés", "Bienestar Mental"],
          datasets: [
            {
              label: "Porcentaje de Seguimiento (%)",
              data: [75, 65, 80, 50, 90],
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 99, 132, 0.6)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  
    // Registro de hábitos con LocalStorage
    const habitForm = document.getElementById("habitForm");
    const habitList = document.getElementById("habitList");
  
    if (habitForm && habitList) {
      habitForm.addEventListener("submit", function (event) {
        event.preventDefault();
  
        const habit = document.getElementById("habit").value.trim();
        if (habit !== "") {
          addHabit(habit);
          document.getElementById("habit").value = "";
        }
      });
  
      function addHabit(habit) {
        const habits = JSON.parse(localStorage.getItem("habits")) || [];
        habits.push(habit);
        localStorage.setItem("habits", JSON.stringify(habits));
        renderHabits();
      }
  
      function renderHabits() {
        const habits = JSON.parse(localStorage.getItem("habits")) || [];
        habitList.innerHTML = habits
          .map((habit, index) => `<li>${habit} <button data-index="${index}" class="btn btn-sm btn-danger">Eliminar</button></li>`)
          .join("");
  
        document.querySelectorAll(".btn-danger").forEach((button) => {
          button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            deleteHabit(index);
          });
        });
      }
  
      function deleteHabit(index) {
        const habits = JSON.parse(localStorage.getItem("habits")) || [];
        habits.splice(index, 1);
        localStorage.setItem("habits", JSON.stringify(habits));
        renderHabits();
      }
  
      renderHabits();
    }
  });
  