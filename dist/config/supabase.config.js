"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseConfig = void 0;
exports.validateConfig = validateConfig;
exports.supabaseConfig = {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    jwtSecret: process.env.SUPABASE_JWT_SECRET
};
function validateConfig() {
    if (!exports.supabaseConfig.url)
        throw new Error('SUPABASE_URL is required');
    if (!exports.supabaseConfig.key)
        throw new Error('SUPABASE_KEY is required');
    return exports.supabaseConfig;
}
//# sourceMappingURL=supabase.config.js.map