import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { supabase } from '../supabase/supabase.client'; // Use relative path

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy, 'supabase-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SUPABASE_JWT_SECRET as string,
      issuer: process.env.SUPABASE_URL,
      audience: 'authenticated',
    });
  }

  async validate(payload: any) {
    try {
      // Verify user exists in Supabase (using admin API)
      const { data: { user }, error } = await supabase.auth.admin.getUserById(
        payload.sub
      );

      if (error || !user) {
        throw new UnauthorizedException('Invalid user credentials');
      }

      return {
        id: user.id,
        email: user.email,
        role: user.role || payload.role,
        app_metadata: user.app_metadata,
        user_metadata: user.user_metadata
      };
    } catch (err) {
      throw new UnauthorizedException('Authentication failed', err.message);
    }
  }
}