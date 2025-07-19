(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_4393eb93._.js", {

"[project]/src/lib/redux/slices/categoriesSlice.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "setCategories": (()=>setCategories),
    "setCategoryProducts": (()=>setCategoryProducts),
    "setError": (()=>setError),
    "setLoading": (()=>setLoading)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
const initialState = {
    categories: [],
    categoryProducts: [],
    isLoading: false,
    error: null
};
const categoriesSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "categories",
    initialState,
    reducers: {
        setCategories: (state, action)=>{
            state.categories = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setCategoryProducts: (state, action)=>{
            state.categoryProducts = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setLoading: (state, action)=>{
            state.isLoading = action.payload;
        },
        setError: (state, action)=>{
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});
const { setCategories, setCategoryProducts, setLoading, setError } = categoriesSlice.actions;
const __TURBOPACK__default__export__ = categoriesSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/redux/slices/cartSlice.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "addToCart": (()=>addToCart),
    "clearCart": (()=>clearCart),
    "closeCart": (()=>closeCart),
    "decreaseQuantity": (()=>decreaseQuantity),
    "default": (()=>__TURBOPACK__default__export__),
    "increaseQuantity": (()=>increaseQuantity),
    "loadCart": (()=>loadCart),
    "openCart": (()=>openCart),
    "removeFromCart": (()=>removeFromCart),
    "toggleCart": (()=>toggleCart),
    "updateQuantity": (()=>updateQuantity)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    isOpen: false
};
const cartSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action)=>{
            const newItem = action.payload;
            const existingItem = state.items.find((item)=>item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
            } else {
                state.items.push({
                    ...newItem,
                    quantity: 1,
                    totalPrice: newItem.price
                });
            }
            state.totalQuantity += 1;
            state.totalAmount = state.items.reduce((total, item)=>total + item.totalPrice, 0);
        },
        removeFromCart: (state, action)=>{
            const id = action.payload;
            const existingItem = state.items.find((item)=>item.id === id);
            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalAmount -= existingItem.totalPrice;
                state.items = state.items.filter((item)=>item.id !== id);
            }
        },
        increaseQuantity: (state, action)=>{
            const id = action.payload;
            const item = state.items.find((item)=>item.id === id);
            if (item) {
                item.quantity += 1;
                item.totalPrice = item.quantity * item.price;
                state.totalQuantity += 1;
                state.totalAmount = state.items.reduce((total, item)=>total + item.totalPrice, 0);
            }
        },
        decreaseQuantity: (state, action)=>{
            const id = action.payload;
            const item = state.items.find((item)=>item.id === id);
            if (item) {
                if (item.quantity === 1) {
                    state.items = state.items.filter((item)=>item.id !== id);
                } else {
                    item.quantity -= 1;
                    item.totalPrice = item.quantity * item.price;
                }
                state.totalQuantity -= 1;
                state.totalAmount = state.items.reduce((total, item)=>total + item.totalPrice, 0);
            }
        },
        updateQuantity: (state, action)=>{
            const { id, quantity } = action.payload;
            const item = state.items.find((item)=>item.id === id);
            if (item && quantity > 0) {
                const oldQuantity = item.quantity;
                item.quantity = quantity;
                item.totalPrice = item.quantity * item.price;
                state.totalQuantity += quantity - oldQuantity;
                state.totalAmount = state.items.reduce((total, item)=>total + item.totalPrice, 0);
            } else if (item && quantity <= 0) {
                state.items = state.items.filter((item)=>item.id !== id);
                state.totalQuantity -= item.quantity;
                state.totalAmount = state.items.reduce((total, item)=>total + item.totalPrice, 0);
            }
        },
        clearCart: (state)=>{
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
        toggleCart: (state)=>{
            state.isOpen = !state.isOpen;
        },
        openCart: (state)=>{
            state.isOpen = true;
        },
        closeCart: (state)=>{
            state.isOpen = false;
        },
        // Load cart from localStorage
        loadCart: (state, action)=>{
            const savedCart = action.payload;
            if (savedCart) {
                state.items = savedCart.items || [];
                state.totalQuantity = savedCart.totalQuantity || 0;
                state.totalAmount = savedCart.totalAmount || 0;
            }
        }
    }
});
const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, updateQuantity, clearCart, toggleCart, openCart, closeCart, loadCart } = cartSlice.actions;
const __TURBOPACK__default__export__ = cartSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/redux/user/userSlice.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "loginFailure": (()=>loginFailure),
    "loginStart": (()=>loginStart),
    "loginSuccess": (()=>loginSuccess),
    "logout": (()=>logout),
    "setUser": (()=>setUser),
    "signUpFailure": (()=>signUpFailure),
    "signUpStart": (()=>signUpStart),
    "signUpSuccess": (()=>signUpSuccess),
    "updateProfilePic": (()=>updateProfilePic)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
const initialState = {
    user: null,
    phone: null,
    password: null,
    loading: false,
    profilePic: null,
    error: null
};
const userSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "user",
    initialState,
    reducers: {
        // Signup
        signUpStart: (state)=>{
            state.loading = true;
            state.error = null;
        },
        signUpSuccess: (state, action)=>{
            state.loading = false;
            state.user = action.payload.user || null;
            state.phone = action.payload.phone; // Store for auto-login
            state.password = action.payload.password;
        },
        signUpFailure: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        // Login
        loginStart: (state)=>{
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action)=>{
            state.loading = false;
            state.user = action.payload;
        },
        loginFailure: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        // Set user (on app load or after /me)
        setUser: (state, action)=>{
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateProfilePic: (state, action)=>{
            state.profilePic = action.payload;
            if (state.user) {
                state.user.profilePic = action.payload;
            }
        },
        // Logout
        logout: (state)=>{
            state.user = null;
            state.loading = false;
            state.error = null;
        }
    }
});
const { signUpStart, signUpSuccess, signUpFailure, loginStart, loginSuccess, loginFailure, setUser, updateProfilePic, logout } = userSlice.actions;
const __TURBOPACK__default__export__ = userSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/redux/modalLocation/modalLocationSlice.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "setLocation": (()=>setLocation)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
const initialState = {
    location: ""
};
const modalLocationSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "modalLocation",
    initialState,
    reducers: {
        setLocation: (state, action)=>{
            state.location = action.payload;
        }
    }
});
const { setLocation } = modalLocationSlice.actions;
const __TURBOPACK__default__export__ = modalLocationSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/redux/slices/locationSlice.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "clearLocation": (()=>clearLocation),
    "default": (()=>__TURBOPACK__default__export__),
    "setAutoLocationSuccess": (()=>setAutoLocationSuccess),
    "setLocationFailure": (()=>setLocationFailure),
    "setLocationStart": (()=>setLocationStart),
    "setManualLocation": (()=>setManualLocation)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
const initialState = {
    location: null,
    loading: false,
    error: null,
    isLocationSet: false
};
const locationSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "location",
    initialState,
    reducers: {
        setLocationStart: (state)=>{
            state.loading = true;
            state.error = null;
        },
        setAutoLocationSuccess: (state, action)=>{
            state.location = action.payload;
            state.loading = false;
            state.error = null;
            state.isLocationSet = true;
        },
        setLocationFailure: (state, action)=>{
            state.loading = false;
            state.error = action.payload;
            state.isLocationSet = false;
        },
        setManualLocation: (state, action)=>{
            state.location = action.payload;
            state.loading = false;
            state.error = null;
            state.isLocationSet = true;
        },
        clearLocation: (state)=>{
            state.location = null;
            state.loading = false;
            state.error = null;
            state.isLocationSet = false;
        }
    }
});
const { setLocationStart, setAutoLocationSuccess, setLocationFailure, setManualLocation, clearLocation } = locationSlice.actions;
const __TURBOPACK__default__export__ = locationSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/redux/store.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "makeStore": (()=>makeStore)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$redux$2f$slices$2f$categoriesSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/redux/slices/categoriesSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$redux$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/redux/slices/cartSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$redux$2f$user$2f$userSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/redux/user/userSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$redux$2f$modalLocation$2f$modalLocationSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/redux/modalLocation/modalLocationSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$redux$2f$slices$2f$locationSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/redux/slices/locationSlice.js [app-client] (ecmascript)");
;
;
;
;
;
;
const makeStore = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
        reducer: {
            categories: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$redux$2f$slices$2f$categoriesSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            cart: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$redux$2f$slices$2f$cartSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            user: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$redux$2f$user$2f$userSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            modalLocation: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$redux$2f$modalLocation$2f$modalLocationSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
            location: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$redux$2f$slices$2f$locationSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
        }
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/redux/cartPersistence.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Cart persistence utilities
__turbopack_context__.s({
    "clearCartFromStorage": (()=>clearCartFromStorage),
    "loadCartFromStorage": (()=>loadCartFromStorage),
    "saveCartToStorage": (()=>saveCartToStorage)
});
const saveCartToStorage = (cart)=>{
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.setItem('lmd-cart', JSON.stringify(cart));
    }
};
const loadCartFromStorage = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        const savedCart = localStorage.getItem('lmd-cart');
        return savedCart ? JSON.parse(savedCart) : null;
    }
    "TURBOPACK unreachable";
};
const clearCartFromStorage = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.removeItem('lmd-cart');
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/redux/provider.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ReduxProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$redux$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/redux/store.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$redux$2f$cartPersistence$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/redux/cartPersistence.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function ReduxProvider({ children }) {
    _s();
    const storeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])();
    if (!storeRef.current) {
        storeRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$redux$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["makeStore"])();
    }
    // Load cart from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReduxProvider.useEffect": ()=>{
            const savedCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$redux$2f$cartPersistence$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadCartFromStorage"])();
            if (savedCart) {
                storeRef.current.dispatch({
                    type: 'cart/loadCart',
                    payload: savedCart
                });
            }
        }
    }["ReduxProvider.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
        store: storeRef.current,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/lib/redux/provider.jsx",
        lineNumber: 22,
        columnNumber: 10
    }, this);
}
_s(ReduxProvider, "8cpBijAPd2RGrAt++adbeBy1QVE=");
_c = ReduxProvider;
var _c;
__turbopack_context__.k.register(_c, "ReduxProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/providers.jsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, d: __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Providers)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$redux$2f$provider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/redux/provider.jsx [app-client] (ecmascript)");
"use client";
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SessionProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$redux$2f$provider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: children
        }, void 0, false, {
            fileName: "[project]/src/app/providers.jsx",
            lineNumber: 9,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/providers.jsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_4393eb93._.js.map