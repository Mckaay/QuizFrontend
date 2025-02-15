export const checkIfObjectHasEmptyProperties = (object) => {
    if (!object) {
        return false;
    }

    let flag = true;
    Object.values(object).forEach((value) => {
        if (value !== "") {
            flag = false;
        }
    });

    return flag;
};