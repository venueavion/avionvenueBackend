import { Strategy } from 'passport-jwt';
declare const SupabaseStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class SupabaseStrategy extends SupabaseStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        id: string;
        email: string | undefined;
        role: any;
        app_metadata: import("@supabase/auth-js").UserAppMetadata;
        user_metadata: import("@supabase/auth-js").UserMetadata;
    }>;
}
export {};
