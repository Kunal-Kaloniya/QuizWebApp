import { toast } from "react-toastify"

// Helper function to validate a name
const validateName = (name) => {
    if (name.length < 3) {
        toast.warn("Name must be at least 3 characters long");
        return false;
    }

    const startsWithLetter = /^[A-Za-z]/.test(name);
    if (!startsWithLetter) {
        toast.warn("Name must start with a letter");
        return false;
    }

    const allowedCharacters = /^[A-Za-z0-9_]+$/.test(name);
    if (!allowedCharacters) {
        toast.warn("Name can only contain letters, numbers and underscores");
        return false;
    }

    return true;
};

// Helper function to validate an email address
const validateEmail = (email) => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        toast.warn("Please enter a valid email address");
        return false;
    }
    return true;
};

// Helper function to validate a password
const validatePassword = (pass) => {
    
    if (pass.length < 6) {
        toast.warn("Password must be at least 6 characters long");
        return false;
    }
    return true;
};

// Main function to validate all inputs
export const validateInputs = (obj) => {
    for (let [key, val] of Object.entries(obj)) {
        if (!val) {
            toast.warn("All fields are required");
            return false;
        }

        switch (key) {
            case "username":
                if (!validateName(val)) return false;
                break;
            case "email":
                if (!validateEmail(val)) return false;
                break;
            case "password":
                if (!validatePassword(val)) return false;
                break;
            default:
                break;
        }
    }
    return true;
};