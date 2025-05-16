"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const supabase_client_1 = require("../supabase/supabase.client");
let SupabaseStrategy = class SupabaseStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'supabase-jwt') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SUPABASE_JWT_SECRET,
            issuer: process.env.SUPABASE_URL,
            audience: 'authenticated',
        });
    }
    async validate(payload) {
        try {
            const { data: { user }, error } = await supabase_client_1.supabase.auth.admin.getUserById(payload.sub);
            if (error || !user) {
                throw new common_1.UnauthorizedException('Invalid user credentials');
            }
            return {
                id: user.id,
                email: user.email,
                role: user.role || payload.role,
                app_metadata: user.app_metadata,
                user_metadata: user.user_metadata
            };
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Authentication failed', err.message);
        }
    }
};
exports.SupabaseStrategy = SupabaseStrategy;
exports.SupabaseStrategy = SupabaseStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SupabaseStrategy);
//# sourceMappingURL=supabase.strategy.js.map