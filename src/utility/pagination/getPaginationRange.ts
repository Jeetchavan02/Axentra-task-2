export function getPaginationRange(currentPage: number, totalPages: number, siblingCount: number = 1) {
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPageNumbers >= totalPages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    const range: (number | string)[] = [];

    // 1️⃣ Always include first page
    range.push(1);

    // 2️⃣ Left dots
    if (showLeftDots) {
        range.push("...");
    }

    // 3️⃣ Middle pages
    for (let i = leftSibling; i <= rightSibling; i++) {
        if (i !== 1 && i !== totalPages) {
            range.push(i);
        }
    }

    // 4️⃣ Right dots
    if (showRightDots) {
        range.push("...");
    }

    // 5️⃣ Last page
    if (totalPages > 1) {
        range.push(totalPages);
    }

    return range;
}