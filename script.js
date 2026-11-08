
// ======================================
// 1. GOOGLE FORM SETTINGS
// ======================================

const STORAGE_KEY = "votingCandidates";

const FORM_BASE =
"https://docs.google.com/forms/d/e/1FAIpQLSeTmieLUlS6N36tKU8mmJIIMn7tbg8C0Vf_43oZAbDoE9tGTw/viewform";

const FORM_ENTRY_ID = "entry.672111348";


// ======================================
// 2. LOAD 50 CANDIDATES
// ======================================

let candidates = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "null"
);

if (!Array.isArray(candidates)) {

    candidates = [];

    for (let i = 1; i <= 50; i++) {

        candidates.push({
            id: i,
            name: "Candidate " + i,
            description: "Demo Contestant",
            photo: ""
        });

    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(candidates)
    );
}


// ======================================
// 3. WEBSITE ELEMENTS
// ======================================

const grid = document.getElementById("candidateGrid");
const search = document.getElementById("search");


// ======================================
// 4. CREATE INDIVIDUAL VOTE BUTTONS
// ======================================

function displayCandidates(list) {

    grid.innerHTML = "";

    list.forEach(candidate => {

        const card = document.createElement("div");

        card.className = "candidate-card";


        // Candidate Photo

        const img = document.createElement("img");

        img.className = "public-photo";

        img.alt = candidate.name;

        img.src = candidate.photo ||
            `https://placehold.co/300x300?text=${candidate.id}`;


        // Candidate Name

        const title = document.createElement("h3");

        title.textContent = candidate.name;


        // Candidate Description

        const description = document.createElement("p");

        description.textContent = candidate.description;


        // Individual Vote Now Button

        const vote = document.createElement("a");

        vote.className = "vote-btn";

        vote.textContent = "Vote Now";


        // Create unique Google Form link for each candidate

        const voteURL = new URL(FORM_BASE);

        voteURL.searchParams.set("usp", "pp_url");

        voteURL.searchParams.set(
            FORM_ENTRY_ID,
            "candidates" + candidate.id
        );

        vote.href = voteURL.toString();

        vote.target = "_blank";

        vote.rel = "noopener noreferrer";


        // Add all elements to candidate card

        card.appendChild(img);

        card.appendChild(title);

        card.appendChild(description);

        card.appendChild(vote);

        grid.appendChild(card);

    });

}


// ======================================
// 5. SEARCH CANDIDATES
// ======================================

if (search) {

    search.addEventListener("input", function () {

        const value = this.value.toLowerCase();

        const filtered = candidates.filter(candidate =>

            candidate.name.toLowerCase().includes(value)

        );

        displayCandidates(filtered);

    });

}


// ======================================
// 6. DISPLAY ALL CANDIDATES
// ======================================

displayCandidates(candidates);


// ======================================
// 7. CHECK GENERATED VOTE LINKS
// ======================================

console.log("Total Candidates:", candidates.length);

candidates.forEach(candidate => {

    console.log(
        candidate.name,
        FORM_BASE + "?usp=pp_url&entry.672111348=candidates" + candidate.id
    );

});

