export const validatePhone = (num) => {
    const cleaned = num.replace(/[\s()-]/g, '');

    // Remove +91 if present
    const normalized = cleaned.startsWith("+91")
        ? cleaned.slice(3)
        : cleaned;

    return /^[6-9]\d{9}$/.test(normalized);
}