// Selecting the required HTML elements
const text = document.querySelector("#textmsg"); // Input text element
const password = document.querySelector("#password"); // Password input element
const result = document.querySelector("#result"); // Result display element

// Variables to store intermediate and final results
var clutter = ""; // Intermediate encrypted text
var parinam = ""; // Intermediate decrypted text

// Function for encryption
function encryption() {
  document.querySelector("#encrypt-btn").addEventListener("click", function () {
    // Get the password
    var pass = document.getElementById("password").value;
    console.log(pass);

    // Get the input text
    var input = document.getElementById("textmsg").value;
    console.log(input);

    // Convert input text into a set of emojis
    var str = input.split("");
    str.forEach((element) => {
      clutter += `&#128${element.charCodeAt()} `;
    });

    // Display the encrypted text
    document.querySelector("#result").innerHTML = clutter;

    // Store encrypted data in local storage
    var dataarr = [];
    if (JSON.parse(localStorage.getItem("data1"))) {
      dataarr = JSON.parse(localStorage.getItem("data1"));
      console.log(dataarr);
      dataarr.push({ pass: pass, input: input, clutter: clutter });
    } else {
      dataarr = [{ pass: pass, input: input, clutter: clutter }];
    }
    localStorage.setItem(`data1`, JSON.stringify(dataarr));
  });
}

// Function for decryption
function decryption() {
  document.querySelector("#decrypt-btn").addEventListener("click", function () {
    var clutter2 = "";
    var input2 = document.querySelector("#emojimsg").value;
    var finalPass = document.querySelector("#finalpassword").value;
    var user = JSON.parse(localStorage.getItem("data1"));
    console.log(user);
    var str2 = input2.split(" ");
    str2.forEach((element) => {
      clutter2 += `&#${element.codePointAt(0)} `;
    });
    console.log(clutter2);
    var found;
    for (let i of user) {
      if (i.clutter == clutter2) {
        found = i;
        console.log(i);
      }
    }
    if (found.clutter === clutter2) {
      console.log("jay ho");
      document.querySelector("#result").style.display = `block`;
      document.querySelector("#result").style.color = `#eee`;
      document.querySelector("#result").innerHTML = found.input;
    } else {
      document.querySelector("#result").style.display = `block`;
      document.querySelector("#result").style.color = `red`;
      document.querySelector("#result").innerHTML = "Wrong password!";
    }
  });
}

// Function to handle button clicks and switch between encryption and decryption sections
function btnClicking() {
  document.querySelector("button").addEventListener("click", function () {
    document.querySelector("#result").style.display = "block";
  });
  document.querySelector("#dec-btn").addEventListener("click", function () {
    document.querySelector("#result").style.display = "none";
    document.querySelector("#decryption").style.display = "block";
    document.querySelector("#encryption").style.display = "none";
    document.querySelector("#dec-btn").style.backgroundColor = "#03D476";
    document.querySelector("#enc-btn").style.backgroundColor = "#194359";
    document.querySelector("#main>h1 span img").style.rotate = "-180deg";
  });
  document.querySelector("#enc-btn").addEventListener("click", function () {
    document.querySelector("#decryption").style.display = "none";
    document.querySelector("#result").style.display = "none";
    document.querySelector("#encryption").style.display = "block";
    document.querySelector("#dec-btn").style.backgroundColor = "#194359";
    document.querySelector("#enc-btn").style.backgroundColor = "#03D476";
    document.querySelector("#main>h1 span img").style.rotate = "-360deg";
  });
}

// Call the encryption, decryption, and button click handling functions
encryption();
decryption();
btnClicking();

