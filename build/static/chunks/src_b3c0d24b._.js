(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_b3c0d24b._.js", {

"[project]/src/components/CloudinaryUploadButton.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CloudinaryUploadButton": (()=>CloudinaryUploadButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$cloudinary$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-cloudinary/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [app-client] (ecmascript)");
'use client';
;
;
;
function CloudinaryUploadButton({ onUpload, buttonText = 'Upload Photo' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$cloudinary$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CldUploadWidget"], {
        uploadPreset: "landscape_photos",
        options: {
            sources: [
                'local'
            ],
            multiple: false,
            maxFileSize: 10000000,
            allowedFormats: [
                'jpg',
                'jpeg',
                'png',
                'gif'
            ]
        },
        onUpload: (result)=>{
            if (result.event !== 'success') return;
            onUpload(result.info.secure_url);
        },
        children: ({ open })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>open(),
                className: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiUpload"], {
                        className: "-ml-1 mr-2 h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/CloudinaryUploadButton.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this),
                    buttonText
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/CloudinaryUploadButton.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/CloudinaryUploadButton.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = CloudinaryUploadButton;
var _c;
__turbopack_context__.k.register(_c, "CloudinaryUploadButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/data.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "aboutInfo": (()=>aboutInfo),
    "photoCategories": (()=>photoCategories),
    "photos": (()=>photos)
});
const photoCategories = [
    "All",
    "Mountains",
    "Deserts",
    "Forests",
    "Oceans",
    "Night Sky",
    "Italy",
    "Travel"
];
const photos = [
    {
        "id": "4c5239b2-a9be-4bca-9f06-840dbd6fc05e",
        "title": "Cuernos Del Paine Beach",
        "category": "Mountains",
        "image": "/uploads/515980e8-cccc-43eb-bcd4-98f7a0e95179.jpg",
        "description": "Beautiful landscape photograph of Cuernos Del Paine Beach",
        "location": "Patagonia, Chile",
        "featured": true,
        "dateAdded": "2025-03-20T09:56:24.783Z"
    },
    {
        "id": "5d7766d0-4898-49ff-8e1f-1d68ffde74d0",
        "title": "Nara Lanterns",
        "category": "Night Sky",
        "image": "/uploads/0c699b59-09d5-498b-96b1-fee1d146d1a8.jpg",
        "description": "Beautiful landscape photograph of Nara Lanterns",
        "location": "Japan",
        "featured": false,
        "dateAdded": "2025-03-20T09:56:24.784Z"
    },
    {
        "id": "7cb6c094-084f-4246-970a-4d8303d1175f",
        "title": "Passo Giau Vertical",
        "category": "Mountains",
        "image": "/uploads/4ac52a48-ce6b-4c41-be3d-8175fac59611.jpg",
        "description": "Beautiful landscape photograph of the Dolomites",
        "location": "Dolomites, Italy",
        "featured": true,
        "dateAdded": "2025-03-20T09:56:24.784Z"
    },
    {
        "id": "6d215144-8604-4912-aea8-2560a2c71611",
        "title": "Iguazu Falls",
        "category": "Forests",
        "image": "/uploads/a32a74b2-3425-478d-b77f-709994739d48.jpg",
        "description": "Beautiful landscape photograph of Iguazu Falls",
        "location": "Brazil",
        "featured": true,
        "dateAdded": "2025-03-20T09:56:24.784Z"
    },
    {
        "id": "c5e9bd41-bb7a-4d25-814d-5f36b7a6018a",
        "title": "Greek Coast",
        "category": "Oceans",
        "image": "/uploads/ac1d9140-5825-440b-8a0c-221d94a247fa.jpg",
        "description": "Beautiful Greek coastal landscape",
        "location": "Greece",
        "featured": true,
        "dateAdded": "2025-03-20T09:56:24.784Z"
    },
    {
        "id": "78ffb2b0-3027-409d-b1fd-6145a2b752fa",
        "title": "Windmills Leros Night",
        "category": "Night Sky",
        "image": "/uploads/c12ce531-80bc-40c3-8b14-f54382ab341e.jpg",
        "description": "Windmills under the night sky",
        "location": "Leros, Greece",
        "featured": true,
        "dateAdded": "2025-03-20T09:56:24.785Z"
    },
    {
        "id": "28b20bbe-a70d-4fc9-8ba0-9d30d6f39a70",
        "title": "Cadini di Misurina",
        "category": "Mountains",
        "image": "/uploads/c8715667-721a-465d-bedc-df749afbd870.jpg",
        "description": "Mountain view with wildflowers in the foreground",
        "location": "Dolomites, Italy",
        "featured": false,
        "dateAdded": "2025-03-20T09:56:24.785Z"
    },
    {
        "id": "336f4d1d-8897-4a0e-a945-88dcc034545b",
        "title": "Kallur Lighthouse",
        "category": "Oceans",
        "image": "/uploads/8d34fadc-14b9-4af6-af8e-9a57e4a15232.jpg",
        "description": "The famous lighthouse with ducks in the foreground",
        "location": "Faroe Islands, Denmark",
        "featured": true,
        "dateAdded": "2025-03-20T09:56:24.785Z"
    },
    {
        "id": "60bc93d2-d245-42cd-816e-5d91d13d98af",
        "title": "Matera Sunset",
        "category": "Night Sky",
        "image": "/uploads/c1fb53d7-542f-460e-9627-ca1a4ef9f754.jpg",
        "description": "A beautiful sunset over the ancient city",
        "location": "Matera, Italy",
        "featured": true,
        "dateAdded": "2025-03-20T09:56:24.785Z"
    }
];
const aboutInfo = {
    name: "Barelands",
    title: "Landscape Photography",
    bio: [],
    avatar: "/avatar.jpg",
    socialLinks: {
        instagram: "https://instagram.com/mybarelands"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/static-data.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Static data utility functions for static export (GitHub Pages)
// This file is used for static export environments to load data without API calls
__turbopack_context__.s({
    "fixImagePathsForGitHubPages": (()=>fixImagePathsForGitHubPages),
    "getStaticPhotoData": (()=>getStaticPhotoData),
    "getStaticSlideshowPhotos": (()=>getStaticSlideshowPhotos),
    "isStaticExport": (()=>isStaticExport)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-client] (ecmascript)");
;
async function getStaticPhotoData() {
    return [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["photos"]
    ]; // Return a copy of the photos array
}
async function getStaticSlideshowPhotos() {
    // Look for specific photos the user wants in the slideshow
    const specificPhotos = [
        // Find the Kallur Lighthouse photo
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["photos"].find((photo)=>photo.title.includes("Kallur")),
        // Find the Cuernos Del Paine (Patagonia) photo
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["photos"].find((photo)=>photo.title.includes("Cuernos Del Paine")),
        // Find the Iguazu Falls photo
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["photos"].find((photo)=>photo.title.includes("Iguazu"))
    ].filter(Boolean);
    // If we have specific photos, return them
    if (specificPhotos.length > 0) {
        return specificPhotos;
    }
    // Fallback: use featured photos
    const featuredPhotos = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["photos"].filter((photo)=>photo.featured).slice(0, 3);
    if (featuredPhotos.length > 0) {
        return featuredPhotos;
    }
    // Final fallback: first 3 photos
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["photos"].slice(0, Math.min(3, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["photos"].length));
}
function fixImagePathsForGitHubPages(photos) {
    // Only run in client-side code
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    // Check if we're on GitHub Pages
    const isGitHubPages = isStaticExport();
    // Only fix paths if we're on GitHub Pages
    if (!isGitHubPages) {
        console.log("Not on GitHub Pages, keeping original paths");
        return photos;
    }
    // Get the base path (repository name) from the URL
    const path = window.location.pathname;
    let basePath = '';
    // Check for various GitHub Pages URL patterns
    if (path.includes('/Barelands/')) {
        basePath = '/Barelands';
    } else if (path.startsWith('/Barelands')) {
        basePath = '/Barelands';
    } else if (window.location.hostname.includes('github.io') || window.location.hostname.includes('barelands') || window.location.hostname.includes('lucimast')) {
        // We're on a custom domain or github.io domain, but without the repo name in path
        // For project sites on custom domains
        basePath = '/Barelands';
    }
    console.log(`GitHub Pages path fixing - Base path: "${basePath}"`);
    // No need to fix if we're not on a path with a base
    if (!basePath) {
        return photos;
    }
    // Fix image paths by adding the base path if needed
    const fixedPhotos = photos.map((photo)=>{
        if (!photo.image) return photo; // Skip if no image
        // If already has http or https, don't modify
        if (photo.image.startsWith('http')) {
            return photo;
        }
        // Only fix relative paths that don't already have the basePath
        if (photo.image.startsWith('/') && !photo.image.startsWith(basePath)) {
            const fixedPath = `${basePath}${photo.image}`;
            console.log(`Fixed path: "${photo.image}" → "${fixedPath}"`);
            return {
                ...photo,
                image: fixedPath
            };
        }
        return photo;
    });
    return fixedPhotos;
}
function isStaticExport() {
    // In client-side code, we check if window exists and if we're on GitHub Pages
    if ("TURBOPACK compile-time truthy", 1) {
        // Check if we're on GitHub Pages (hostname includes github.io or our custom domain)
        const isGitHubPages = window.location.hostname.includes('github.io') || window.location.hostname.includes('barelands');
        // Also check for the hostname in the URL path (for GitHub Pages with repository name in URL path)
        const isRepositoryPath = window.location.pathname.includes('/Barelands/');
        return isGitHubPages || isRepositoryPath;
    }
    "TURBOPACK unreachable";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/storage.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "filterValidPhotos": (()=>filterValidPhotos),
    "generateImageUrl": (()=>generateImageUrl),
    "photoImageExists": (()=>photoImageExists)
});
'use client';
function generateImageUrl(fileName, folder = 'uploads') {
    return `/${folder}/${fileName}`;
}
function filterValidPhotos(photos) {
    // In client context, we just return all photos and let client-side 
    // error handling catch loading problems
    return [
        ...photos
    ]; // Return a copy to avoid modifying the original
}
function photoImageExists(photo) {
    // In client context, we just assume photos exist and let
    // client-side image error handling catch problems
    return true;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/photos-data.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "addPhoto": (()=>addPhoto),
    "deletePhoto": (()=>deletePhoto),
    "loadPhotosData": (()=>loadPhotosData),
    "savePhotosData": (()=>savePhotosData),
    "updatePhoto": (()=>updatePhoto)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$path$2d$browserify$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)");
;
;
const PHOTOS_DATA_PATH = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$path$2d$browserify$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].join(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cwd(), 'data', 'photos.json');
// Ensure the data directory exists
const ensureDataDir = ()=>{
    const dir = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$path$2d$browserify$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dirname(PHOTOS_DATA_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }
};
const loadPhotosData = async ()=>{
    try {
        ensureDataDir();
        if (!fs.existsSync(PHOTOS_DATA_PATH)) {
            return [];
        }
        const data = fs.readFileSync(PHOTOS_DATA_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading photos data:', error);
        return [];
    }
};
const savePhotosData = async (photos)=>{
    try {
        ensureDataDir();
        fs.writeFileSync(PHOTOS_DATA_PATH, JSON.stringify(photos, null, 2));
    } catch (error) {
        console.error('Error saving photos data:', error);
        throw error;
    }
};
const addPhoto = async (photo)=>{
    const photos = await loadPhotosData();
    photos.push(photo);
    await savePhotosData(photos);
};
const updatePhoto = async (photo)=>{
    const photos = await loadPhotosData();
    const index = photos.findIndex((p)=>p.id === photo.id);
    if (index !== -1) {
        photos[index] = photo;
        await savePhotosData(photos);
    }
};
const deletePhoto = async (photoId)=>{
    const photos = await loadPhotosData();
    const filteredPhotos = photos.filter((p)=>p.id !== photoId);
    await savePhotosData(filteredPhotos);
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/admin/dashboard/photos/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PhotosPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CloudinaryUploadButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CloudinaryUploadButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$static$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/static-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$photos$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/photos-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
// Define all available categories
const categories = [
    'Mountains',
    'Deserts',
    'Forests',
    'Oceans',
    'Night Sky',
    'Italy',
    'Travel'
].sort();
function PhotosPage() {
    _s();
    const [photos, setPhotos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [editingPhoto, setEditingPhoto] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newPhoto, setNewPhoto] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PhotosPage.useEffect": ()=>{
            const fetchPhotos = {
                "PhotosPage.useEffect.fetchPhotos": async ()=>{
                    try {
                        setIsLoading(true);
                        let validPhotos = [];
                        // Check if we're in static export mode
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$static$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isStaticExport"])()) {
                            // Use static data instead of API
                            console.log("Using static photo data");
                            validPhotos = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$static$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStaticPhotoData"])();
                        } else {
                            // Use API in development mode
                            try {
                                const response = await fetch('/api/photos');
                                if (!response.ok) {
                                    throw new Error(`API responded with status: ${response.status}`);
                                }
                                const data = await response.json();
                                validPhotos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filterValidPhotos"])(data);
                            } catch (apiError) {
                                console.error('API fetch failed, falling back to static data:', apiError);
                                // Fallback to static data even in development if API fails
                                validPhotos = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$static$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStaticPhotoData"])();
                            }
                        }
                        if (!validPhotos || validPhotos.length === 0) {
                            console.error("No photos loaded, throwing error");
                            throw new Error("No photos could be loaded");
                        }
                        console.log(`Loaded ${validPhotos.length} photos`);
                        setPhotos(validPhotos);
                        setError(null);
                    } catch (err) {
                        console.error('Error fetching photos:', err);
                        setError('Failed to load photos. Please try again.');
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["PhotosPage.useEffect.fetchPhotos"];
            fetchPhotos();
        }
    }["PhotosPage.useEffect"], []);
    const handleUpload = async (imageUrl)=>{
        // Create a new photo object
        const photo = {
            id: Date.now().toString(),
            title: 'New Photo',
            description: '',
            image: imageUrl,
            category: categories[0],
            featured: false,
            location: '',
            dateAdded: new Date().toISOString()
        };
        // Show the edit modal for the new photo
        setNewPhoto(photo);
        setEditingPhoto(photo);
    };
    const handleSavePhoto = async (e)=>{
        e.preventDefault();
        if (!editingPhoto) return;
        try {
            if (newPhoto) {
                // Add new photo
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$photos$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addPhoto"])(editingPhoto);
                setPhotos([
                    ...photos,
                    editingPhoto
                ]);
            } else {
                // Update existing photo
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$photos$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePhoto"])(editingPhoto);
                setPhotos(photos.map((photo)=>photo.id === editingPhoto.id ? editingPhoto : photo));
            }
            setEditingPhoto(null);
            setNewPhoto(null);
        } catch (error) {
            console.error('Error saving photo:', error);
            alert('Failed to save photo. Please try again.');
        }
    };
    const handleDeletePhoto = async (photoId)=>{
        if (window.confirm('Are you sure you want to delete this photo?')) {
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$photos$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deletePhoto"])(photoId);
                setPhotos(photos.filter((photo)=>photo.id !== photoId));
            } catch (error) {
                console.error('Error deleting photo:', error);
                alert('Failed to delete photo. Please try again.');
            }
        }
    };
    const handleToggleFeatured = async (photoId)=>{
        const photo = photos.find((p)=>p.id === photoId);
        if (!photo) return;
        try {
            const updatedPhoto = {
                ...photo,
                featured: !photo.featured
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$photos$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePhoto"])(updatedPhoto);
            setPhotos(photos.map((p)=>p.id === photoId ? updatedPhoto : p));
        } catch (error) {
            console.error('Error toggling featured status:', error);
            alert('Failed to update photo. Please try again.');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-white",
                        children: "Photos"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CloudinaryUploadButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CloudinaryUploadButton"], {
                        onUpload: handleUpload
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center h-64",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiRefreshCw"], {
                    className: "animate-spin h-8 w-8 text-white"
                }, void 0, false, {
                    fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                    lineNumber: 160,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                lineNumber: 159,
                columnNumber: 9
            }, this) : photos.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mt-2 text-sm font-medium text-white",
                        children: "No photos"
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                        lineNumber: 164,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-zinc-400",
                        children: "Get started by uploading a new photo."
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                        lineNumber: 165,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CloudinaryUploadButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CloudinaryUploadButton"], {
                            onUpload: handleUpload
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                            lineNumber: 167,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                        lineNumber: 166,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                lineNumber: 163,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                children: photos.map((photo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-zinc-800 rounded-lg overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-48",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: photo.image,
                                        alt: photo.title,
                                        fill: true,
                                        className: "object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                        lineNumber: 175,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-opacity duration-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute top-2 right-2 flex space-x-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setEditingPhoto(photo),
                                                    className: "p-2 text-white hover:text-blue-400 transition-colors",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiEdit2"], {
                                                        className: "h-5 w-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                                        lineNumber: 187,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                                    lineNumber: 183,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleDeletePhoto(photo.id),
                                                    className: "p-2 text-white hover:text-red-400 transition-colors",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiTrash2"], {
                                                        className: "h-5 w-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                                        lineNumber: 193,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                            lineNumber: 182,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                        lineNumber: 181,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                lineNumber: 174,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-medium text-white",
                                        children: photo.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                        lineNumber: 199,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-sm text-zinc-400",
                                        children: photo.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                        lineNumber: 200,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-zinc-400",
                                                children: photo.category
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                                lineNumber: 202,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleToggleFeatured(photo.id),
                                                className: `px-2 py-1 text-xs font-medium rounded-full ${photo.featured ? 'bg-yellow-100 text-yellow-800' : 'bg-zinc-700 text-zinc-300'}`,
                                                children: photo.featured ? 'Featured' : 'Not Featured'
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                                lineNumber: 203,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                        lineNumber: 201,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                lineNumber: 198,
                                columnNumber: 15
                            }, this)
                        ]
                    }, photo.id, true, {
                        fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                        lineNumber: 173,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                lineNumber: 171,
                columnNumber: 9
            }, this),
            editingPhoto && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-zinc-800 rounded-lg p-6 w-full max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold text-white mb-4",
                            children: newPhoto ? 'Add New Photo' : 'Edit Photo'
                        }, void 0, false, {
                            fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                            lineNumber: 224,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSavePhoto,
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "title",
                                            className: "block text-sm font-medium text-zinc-400",
                                            children: "Title"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                            lineNumber: 229,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            id: "title",
                                            value: editingPhoto.title,
                                            onChange: (e)=>setEditingPhoto({
                                                    ...editingPhoto,
                                                    title: e.target.value
                                                }),
                                            className: "mt-1 block w-full rounded-md bg-zinc-700 border-zinc-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                            lineNumber: 232,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                    lineNumber: 228,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "description",
                                            className: "block text-sm font-medium text-zinc-400",
                                            children: "Description"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                            lineNumber: 241,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            id: "description",
                                            value: editingPhoto.description,
                                            onChange: (e)=>setEditingPhoto({
                                                    ...editingPhoto,
                                                    description: e.target.value
                                                }),
                                            rows: 3,
                                            className: "mt-1 block w-full rounded-md bg-zinc-700 border-zinc-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                            lineNumber: 244,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                    lineNumber: 240,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "category",
                                            className: "block text-sm font-medium text-zinc-400",
                                            children: "Category"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                            lineNumber: 253,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            id: "category",
                                            value: editingPhoto.category,
                                            onChange: (e)=>setEditingPhoto({
                                                    ...editingPhoto,
                                                    category: e.target.value
                                                }),
                                            className: "mt-1 block w-full rounded-md bg-zinc-700 border-zinc-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500",
                                            children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: category,
                                                    children: category
                                                }, category, false, {
                                                    fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                            lineNumber: 256,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                    lineNumber: 252,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "location",
                                            className: "block text-sm font-medium text-zinc-400",
                                            children: "Location"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                            lineNumber: 270,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            id: "location",
                                            value: editingPhoto.location,
                                            onChange: (e)=>setEditingPhoto({
                                                    ...editingPhoto,
                                                    location: e.target.value
                                                }),
                                            className: "mt-1 block w-full rounded-md bg-zinc-700 border-zinc-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                            lineNumber: 273,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                    lineNumber: 269,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            id: "featured",
                                            checked: editingPhoto.featured,
                                            onChange: (e)=>setEditingPhoto({
                                                    ...editingPhoto,
                                                    featured: e.target.checked
                                                }),
                                            className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-zinc-600 rounded bg-zinc-700"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                            lineNumber: 282,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "featured",
                                            className: "ml-2 block text-sm text-zinc-400",
                                            children: "Featured Photo"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                            lineNumber: 289,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                    lineNumber: 281,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-end space-x-3 mt-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                setEditingPhoto(null);
                                                setNewPhoto(null);
                                            },
                                            className: "px-4 py-2 border border-zinc-600 rounded-md text-sm font-medium text-zinc-300 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                            lineNumber: 294,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                                            children: newPhoto ? 'Add Photo' : 'Save Changes'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                            lineNumber: 304,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                                    lineNumber: 293,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                            lineNumber: 227,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                    lineNumber: 223,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
                lineNumber: 222,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/admin/dashboard/photos/page.tsx",
        lineNumber: 152,
        columnNumber: 5
    }, this);
}
_s(PhotosPage, "MtdWtqujF8qoJiuGoIhE7djEJ+c=");
_c = PhotosPage;
var _c;
__turbopack_context__.k.register(_c, "PhotosPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_b3c0d24b._.js.map