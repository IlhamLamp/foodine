export const userSplittedName = (fullName: string) => {
    const nameParts = fullName.split(" ");
    return {
        first_name: nameParts[0],
        last_name: nameParts.length > 2 ? nameParts.slice(1).join(" ") : nameParts[1] || "",
    };
};