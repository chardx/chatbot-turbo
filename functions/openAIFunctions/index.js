const folderPath = './openAIFunctions/';

export const get_all_openAIFunctions = async () => {
    const allFunctions = [];

    const files = await fetchFolderFiles();

    for (const file of files) {
        const module = await import(file);

        for (const key in module) {
            const func = module[key];
            if (typeof func === 'function' && func.description) {
                descriptions.push(func.description);
            }
        }
    }

    return allFunctions;
};

const fetchFolderFiles = async (folderPath) => {
    const response = await fetch(folderPath);
    const fileNames = await response.json();

    const filePromises = fileNames.map(async (fileName) => {
        const filePath = `${folderPath}/${fileName}`;
        const module = await import(filePath);
        return module.default;
    });

    return Promise.all(filePromises);
};