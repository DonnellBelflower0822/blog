module.exports = (source) => {
    return `
        const style = document.createElement('style');
        style.innerHTML = '${source.replace(/\"/g, '').replace(/\n/g, '')}';
        document.head.appendChild(style);
    `
}