import { ClientCategory,ClientMod } from "../types/ClientMod";

export const parseCategorizedMarkdown = (content: string): ClientCategory[] => {
    const categories: ClientCategory[] = [];
    const mainSections = content.split(/\n##\s+/).slice(1);

    mainSections.forEach(section => {
        const lines = section.split("\n");
        const categoryTitle = lines[0].trim().replace(/\\/g, "");

        const subSections = section.split(/\n###\s+/);

        subSections.forEach((subSection, index) => {
            const subLines = subSection.split("\n");
            const subTitle =
        index === 0 ? "General" : subLines[0].trim().replace(/\\/g, "");

            const clients: ClientMod[] = [];
            const rows = subLines.filter(
                line => line.trim().startsWith("|") && !line.includes("---"),
            );

            rows.forEach(row => {
                const cols = row
                    .split("|")
                    .map(c => c.trim())
                    .filter(c => c !== "");

                if (cols.length < 4 || cols[0].toLowerCase().includes("name")) return;

                clients.push({
                    name: cols[0],
                    features: cols[1],
                    language: cols[2],
                    developmentStatus: cols[3] as any,
                    link: cols[0].match(/\[(.*?)\]\((.*?)\)/)?.[2] || "",
                    platform: categoryTitle,
                    subcategory: subTitle,
                });
            });

            if (clients.length > 0) {
                categories.push({
                    title: categoryTitle,
                    subcategory: subTitle,
                    clients: clients,
                });
            }
        });
    });

    return categories;
};
