const passwordOutput = document.getElementById("password-output");
const lengthSlider = document.getElementById("length-slider");
const lengthValue = document.getElementById("length-value");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");

lengthSlider.oninput = () => {
  lengthValue.textContent = lengthSlider.value;
};

function generatePassword() {
  const len = +lengthSlider.value;
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const num = "0123456789";
  const sym = "!@#$%^&*()_+[]{}|;:,.<>?";

  let validChars = "";
  if (uppercase.checked) validChars += upper;
  if (lowercase.checked) validChars += lower;
  if (numbers.checked) validChars += num;
  if (symbols.checked) validChars += sym;

  let password = "";
  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * validChars.length);
    password += validChars[randomIndex];
  }

  passwordOutput.value = password;
  checkStrength(password);
}

function checkStrength(password) {
  let strength = 0;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  if (password.length >= 12) strength++;

  const colors = ["red", "orange", "yellow", "lightgreen", "green"];
  strengthBar.style.background = colors[strength - 1] || "gray";

  const text = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
  strengthText.textContent = "Strength: " + (text[strength - 1] || "Too Short");
}

generateBtn.onclick = generatePassword;

copyBtn.onclick = () => {
  navigator.clipboard.writeText(passwordOutput.value);
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy"), 1000);
};

// Generate one on load
generatePassword();
