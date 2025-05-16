"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_config_1 = require("../config/supabase.config");
const { url, key } = (0, supabase_config_1.validateConfig)();
exports.supabase = (0, supabase_js_1.createClient)(url, key, {
    auth: {
        persistSession: false,
        autoRefreshToken: false
    }
});
//# sourceMappingURL=supabase.client.js.map