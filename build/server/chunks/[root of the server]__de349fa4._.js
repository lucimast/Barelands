module.exports = {

"[project]/.next-internal/server/app/api/photos/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/lib/data.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
}}),
"[externals]/fs/promises [external] (fs/promises, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[project]/src/app/api/photos/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "DELETE": (()=>DELETE),
    "GET": (()=>GET),
    "POST": (()=>POST),
    "PUT": (()=>PUT),
    "dynamic": (()=>dynamic)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
;
;
;
;
;
const dynamic = 'force-static';
// Path to stored photo data
const PHOTO_DATA_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'photos.json');
// Load photos from JSON file
async function loadPhotoData() {
    try {
        const data = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(PHOTO_DATA_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist or is invalid, return empty array
        return [];
    }
}
async function GET() {
    try {
        // Load photos from file
        let storedPhotos = [];
        try {
            storedPhotos = await loadPhotoData();
        } catch (error) {
            console.error('Error loading stored photos:', error);
        // Continue with just in-memory photos if there's an error
        }
        // Combine photos from both sources, avoiding duplicates by ID
        const photoMap = new Map();
        // Add in-memory photos first
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["photos"].forEach((photo)=>{
            photoMap.set(photo.id, photo);
        });
        // Add stored photos, potentially overriding in-memory ones
        storedPhotos.forEach((photo)=>{
            photoMap.set(photo.id, photo);
        });
        // Convert back to array
        let allPhotos = Array.from(photoMap.values());
        // Sort by dateAdded, newest first
        allPhotos.sort((a, b)=>new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(allPhotos);
    } catch (error) {
        console.error('Error fetching photos:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch photos'
        }, {
            status: 500
        });
    }
}
const PHOTOS_DATA_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'photos.json');
// Ensure the data directory exists
const ensureDataDir = ()=>{
    const dir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(PHOTOS_DATA_PATH);
    if (!(0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"])(dir)) {
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["mkdirSync"])(dir, {
            recursive: true
        });
    }
};
// Load photos from the JSON file
const loadPhotosData = async ()=>{
    try {
        ensureDataDir();
        if (!(0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["existsSync"])(PHOTOS_DATA_PATH)) {
            return [];
        }
        const data = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["readFileSync"])(PHOTOS_DATA_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading photos data:', error);
        return [];
    }
};
// Save photos to the JSON file
const savePhotosData = async (photos)=>{
    try {
        ensureDataDir();
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["writeFileSync"])(PHOTOS_DATA_PATH, JSON.stringify(photos, null, 2));
    } catch (error) {
        console.error('Error saving photos data:', error);
        throw error;
    }
};
async function POST(request) {
    try {
        const photo = await request.json();
        const photos = await loadPhotosData();
        photos.push(photo);
        await savePhotosData(photos);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(photo);
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to add photo'
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        const photo = await request.json();
        const photos = await loadPhotosData();
        const index = photos.findIndex((p)=>p.id === photo.id);
        if (index !== -1) {
            photos[index] = photo;
            await savePhotosData(photos);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(photo);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Photo not found'
        }, {
            status: 404
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to update photo'
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const photoId = searchParams.get('id');
        if (!photoId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Photo ID is required'
            }, {
                status: 400
            });
        }
        const photos = await loadPhotosData();
        const filteredPhotos = photos.filter((p)=>p.id !== photoId);
        await savePhotosData(filteredPhotos);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true
        });
    } catch (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to delete photo'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__de349fa4._.js.map