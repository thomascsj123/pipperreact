let offset = 0;
const limit = 10;

async function loadPips() {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/pips?limit=${limit}&offset=${offset}`
    );
    const result = await response.json();
    const pips = result.data; // antager at API'et returnerer et objekt med en 'pips' array

    console.log(result.pagination.next_offset);

    // loop gennem alle pips og tilføj dem til DOM'en
    pips.forEach((pip) => {
      let studentHtml = document.getElementById("student");

      // opretter en kopi fordi jeg skal have en templates indhold per student
      let clon = studentHtml.content.cloneNode(true);

      clon.querySelector(
        ".avatar"
      ).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
        pip.username
      )}`;

      // Sætter jeg den studerendes værdier ind i klonen af templaten
      clon.querySelector(".text").innerText = `${pip.username}: ${pip.message}`;

      // indsætter vi templaten i html dokumentet (så brugeren kan se den)
      document.getElementById("students").appendChild(clon);
    });

    feather.replace();

    // Opdater offset til næste gang vi henter
    offset += limit;

    // Hvis API'et returnerer færre pips end limit → der er ikke flere
    if (pips.length < limit) {
      document.getElementById("vis-mere").disabled = true;
      document.getElementById("vis-mere").innerText = "No more pips";
    }
  } catch (error) {
    console.error("Error fetching pips:", error);
    // optional: show a message in the UI
    document.getElementById("students").innerText = "Kunne ikke hente beskeder";
  }
}

// Når DOM er loaded henter vi alle pips fra databasen/backend og viser dem i DOM'en
document.addEventListener("DOMContentLoaded", async () => {
  loadPips();

  // vi-mere knap funktionalitet
  document.getElementById("vis-mere").addEventListener("click", () => {
    loadPips();
  });
});

document.getElementById("student-form").addEventListener("submit", (event) => {
  event.preventDefault(); // stopper standard opførslen, hvor browseren reloader siden

  const text = document.getElementById("text").value;
  const username = document.getElementById("username").value;

  if (text === "") {
    alert("Der mangler tekst");
  }

  if (text !== "") {
    addStudentToDOM(username, text);
  }
  //console.log(event.target["name"].value);
});

async function addStudentToDOM(username, message) {
  let studentHtml = document.getElementById("student");
  // console.log(name, email, phone);

  // opretter en kopi fordi jeg skal have en templates indhold per student
  let clon = studentHtml.content.cloneNode(true);
  // console.log(clon);

  // console.log(clon.querySelector(".name"));

  // Sætter jeg den studerendes værdier ind i klonen af templaten
  clon.querySelector(".text").innerText = `${username}: ${message}`;

  clon.querySelector(
    ".avatar"
  ).src = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
    username
  )}`;

  // indsætter vi templaten i html dokumentet (så brugeren kan se den)
  let students = document.getElementById("students");
  students.insertBefore(clon, students.firstChild);

  feather.replace();

  // Tilføjer pip til databasen og resetter formularen - vi har tilføjet et post request til vores database/backend

  try {
    const send = await fetch("http://127.0.0.1:8000/pips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        message: message,
      }),
    });

    const result = await send.json();
    console.log("🚀 ~ addStudentToDOM ~ result:", result);
    document.getElementById("student-form").reset(); // reset form efter submit
  } catch (error) {
    console.error("Error while sending request:", error);
  }
}

// Character couter (max 255char)
const topTextarea = document.getElementById("text");
const topCounter = document.getElementById("CharCount");
if (topTextarea && topCounter) {
  topTextarea.addEventListener("input", () => {
    topCounter.textContent = topTextarea.value.length;
  });
}

// Interaction counter (comment, repost, like)
document.addEventListener("click", (e) => {
  if (e.target.closest(".interact")) {
    const el = e.target.closest(".interact");
    if (el.classList.contains("like") || el.classList.contains("repost")) {
      const countEl = el.querySelector(".count");
      let count = parseInt(countEl.textContent, 10);
      if (el.classList.contains("active")) {
        el.classList.remove("active");
        countEl.textContent = count - 1;
      } else {
        el.classList.add("active");
        countEl.textContent = count + 1;
      }
    } else {
      el.classList.toggle("active");
    }
  }
});
