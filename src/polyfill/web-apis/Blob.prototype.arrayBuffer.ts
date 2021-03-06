export {}
if (typeof Blob !== 'undefined' && Blob.prototype.arrayBuffer) {
    Object.defineProperty(Blob.prototype, 'arrayBuffer', {
        configurable: true,
        writable: true,
        value: convert,
    })
}
function convert(this: Blob) {
    return new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('abort', reject)
        reader.addEventListener('error', reject)
        reader.addEventListener('load', () => {
            const result = reader.result as ArrayBuffer
            if (typeof result === 'string') reject(new TypeError())
            resolve(result)
        })
        reader.readAsArrayBuffer(this)
    })
}
