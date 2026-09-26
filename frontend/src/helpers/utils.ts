export const validatePhone = (num: string) => {
    const cleaned = num.replace(/[\s()-]/g, '');

    const normalized = cleaned.startsWith("+91")
        ? cleaned.slice(3)
        : cleaned;

    return /^[6-9]\d{9}$/.test(normalized);
}