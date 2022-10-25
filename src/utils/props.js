export const getProps = (source, ...keys) => {
    return Object.fromEntries(
        Object.entries(source).filter(([k, v]) => keys.includes(k) && v != null)
    )
}