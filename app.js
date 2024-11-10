document.addEventListener("DOMContentLoaded", function () {
    // Type casting elements to the correct HTML types
    var form = document.getElementById("resumeForm");
    var resume = document.getElementById("resume");
    var formContainer = document.querySelector(".form-container");
    var nameField = document.getElementById("name");
    var emailField = document.getElementById("email");
    var contactField = document.getElementById("contact");
    var educationField = document.getElementById("education");
    var skillsField = document.getElementById("skills");
    var experienceField = document.getElementById("experience");
    var profilePicField = document.getElementById("profilePic");
    var displayName = document.getElementById("displayName");
    var displayContact = document.getElementById("displayContact");
    var displayEducation = document.getElementById("displayEducation");
    var displaySkills = document.getElementById("displaySkills");
    var displayExperience = document.getElementById("displayExperience");
    var displayProfilePic = document.getElementById("displayProfilePic");
    var livePreview = document.createElement("div");
    livePreview.classList.add("resume-preview");
    livePreview.innerHTML = "\n      <section class=\"personal-info\">\n        <img id=\"liveProfilePic\" src=\"/default-profile.jpg\" alt=\"Profile Picture\" class=\"profile-pic\"/>\n        <h1 id=\"liveName\"></h1>\n        <p id=\"liveContact\"></p>\n        <hr />\n      </section>\n  \n      <section id=\"live-education-section\" class=\"section-content\">\n        <h2>Education</h2>\n        <p id=\"liveEducation\"></p>\n        <hr />\n      </section>\n  \n      <section id=\"live-skills-section\" class=\"section-content\">\n        <h2>Skills</h2>\n        <ul id=\"liveSkills\"></ul>\n        <hr />\n      </section>\n  \n      <section id=\"live-work-experience-section\" class=\"section-content\">\n        <h2>Work Experience</h2>\n        <p id=\"liveExperience\"></p>\n        <hr />\n      </section>\n    ";
    formContainer.appendChild(livePreview);
    var liveName = document.getElementById("liveName");
    var liveContact = document.getElementById("liveContact");
    var liveEducation = document.getElementById("liveEducation");
    var liveSkills = document.getElementById("liveSkills");
    var liveExperience = document.getElementById("liveExperience");
    var liveProfilePic = document.getElementById("liveProfilePic");
    // Function to update skills in real-time
    var updateSkills = function () {
        var skills = skillsField.value.split(",").map(function (skill) { return skill.trim(); });
        liveSkills.innerHTML = "";
        displaySkills.innerHTML = "";
        skills.forEach(function (skill) {
            var li = document.createElement("li");
            li.textContent = skill;
            liveSkills.appendChild(li);
            var resumeLi = li.cloneNode(true); // Clone for resume
            displaySkills.appendChild(resumeLi);
        });
    };
    // Update profile picture in real-time
    profilePicField.addEventListener("change", function () {
        var profilePic = profilePicField.files ? profilePicField.files[0] : null;
        var profilePicURL = profilePic
            ? URL.createObjectURL(profilePic)
            : "/default-profile.jpg";
        liveProfilePic.src = profilePicURL;
        displayProfilePic.src = profilePicURL;
    });
    // Add event listeners to form inputs for real-time updates
    nameField.addEventListener("input", function () {
        liveName.textContent = nameField.value;
        displayName.textContent = nameField.value;
    });
    emailField.addEventListener("input", updateContact);
    contactField.addEventListener("input", updateContact);
    educationField.addEventListener("input", function () {
        liveEducation.textContent = educationField.value;
        displayEducation.textContent = educationField.value;
    });
    skillsField.addEventListener("input", updateSkills);
    experienceField.addEventListener("input", function () {
        liveExperience.textContent = experienceField.value;
        displayExperience.textContent = experienceField.value;
    });
    // Function to update contact details in real-time
    function updateContact() {
        var contactText = "".concat(emailField.value, " | ").concat(contactField.value);
        liveContact.textContent = contactText;
        displayContact.textContent = contactText;
    }
    // Hide form and show resume on submit
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        formContainer.style.display = "none"; // Hide the form
        livePreview.style.display = "none"; // Hide live preview
        resume.style.display = "block"; // Show the resume
    });
    // Function to toggle visibility of resume sections
    function toggleSection(targetId) {
        var targetElement = document.getElementById(targetId);
        if (targetElement) {
            if (targetElement.classList.contains("hidden")) {
                targetElement.classList.remove("hidden");
                targetElement.style.maxHeight = targetElement.scrollHeight + "px";
                targetElement.style.opacity = "1";
            }
            else {
                targetElement.classList.add("hidden");
                targetElement.style.maxHeight = "0";
                targetElement.style.opacity = "0";
            }
        }
    }
    // Add event listeners to toggle buttons
    var toggleButtons = document.querySelectorAll(".toggle-button");
    toggleButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var targetId = button.getAttribute("data-target");
            if (targetId) {
                toggleSection(targetId);
            }
        });
    });
});
