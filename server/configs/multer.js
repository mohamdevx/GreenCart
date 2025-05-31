import multer from 'multer'; // ✅ no .js


export const upload=multer({storage:multer.diskStorage({})})