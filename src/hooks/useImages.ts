// 自动扫描各图片文件夹
const foreverImages = import.meta.glob('/Forever/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, query: '?url', import: 'default' })
const experienceImages = import.meta.glob('/experiencepic/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, query: '?url', import: 'default' })
const xxImages = import.meta.glob('/xx/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, query: '?url', import: 'default' })
const petsImages = import.meta.glob('/pets/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, query: '?url', import: 'default' })

export const foreverImgList = Object.values(foreverImages) as string[]
export const experienceImgList = Object.values(experienceImages) as string[]
export const xxImgList = Object.values(xxImages) as string[]
export const petsImgList = Object.values(petsImages) as string[]
