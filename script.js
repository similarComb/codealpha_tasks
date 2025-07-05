const form = document.getElementById("ageForm");
const result = document.getElementById("result");
const bdayInfo = document.getElementById("bdayInfo");
const toggle = document.getElementById("darkToggle");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const dob = new Date(document.getElementById("dob").value);
  if (isNaN(dob.getTime())) {
    result.textContent = "Please enter a valid date.";
    result.classList.add("show");
    bdayInfo.textContent = "";
    return;
  }

  const today = new Date();
  let ageYears = today.getFullYear() - dob.getFullYear();
  let ageMonths = today.getMonth() - dob.getMonth();
  let ageDays = today.getDate() - dob.getDate();

  if (ageDays < 0) {
    ageMonths--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    ageDays += prevMonth;
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  result.innerHTML = `You are <strong>${ageYears}</strong> years, <strong>${ageMonths}</strong> months, and <strong>${ageDays}</strong> days old.`;
  result.classList.add("show");

  // Time until next birthday
  let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  if (today > nextBirthday) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const diff = nextBirthday - today;
  const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
  bdayInfo.innerHTML = `🎉 Your next birthday is in <strong>${daysLeft}</strong> day${daysLeft > 1 ? "s" : ""}.`;
  bdayInfo.classList.add("show");
});

// Dark mode toggle
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
