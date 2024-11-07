export default function useGetDynamicImageUrl(fileName) {
    try {
        const modules = import.meta.glob('@/assets/images/**/*.{png,svg}', { eager: true, import: 'default' })
        const moduleKeys = Object.keys(modules)
        const fileSrc = moduleKeys.find(key => key.endsWith(fileName))
        const path = fileSrc ? modules[fileSrc] : '';
        return { path };
    } catch (err) {
        console.log(err)
    }
}