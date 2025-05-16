// src/supabase/supabase.module.ts
import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Module({
  providers: [SupabaseService],
  exports: [SupabaseService], // This is crucial!
})
export class SupabaseModule { }