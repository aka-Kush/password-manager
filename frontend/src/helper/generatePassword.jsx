const shuffle = (str) => {
    const arr = str.split("");

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join("");
}

const generatePassword = (formData) => {
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let charPool = "";

    if (formData.uppercase) charPool += upperChars;
    if (formData.lowercase) charPool += lowerChars;
    if (formData.number) charPool += numberChars;
    if (formData.special) charPool += specialChars;

    const shuffledStr = shuffle(charPool);

    let password = "";

    for (let i = 0; i < formData.length; i++) {
        const randIdx = Math.floor(Math.random() * shuffledStr.length);
        password += shuffledStr[randIdx];
    }

    return password;
}

export default generatePassword;
