export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      artists: {
        Row: {
          created_at: string
          id: number
          mbid: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          mbid?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          mbid?: string | null
          name?: string | null
        }
        Relationships: []
      }
      eventos: {
        Row: {
          artist: string | null
          artist_mbid: string | null
          city: string | null
          country: string | null
          created_at: string
          date: string | null
          id: number
          performance_rating: number | null
          slfm_id: string | null
          tour: string | null
          user_id: string | null
          venue: string | null
          venue_id: string | null
          venue_rating: number | null
        }
        Insert: {
          artist?: string | null
          artist_mbid?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          date?: string | null
          id?: number
          performance_rating?: number | null
          slfm_id?: string | null
          tour?: string | null
          user_id?: string | null
          venue?: string | null
          venue_id?: string | null
          venue_rating?: number | null
        }
        Update: {
          artist?: string | null
          artist_mbid?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          date?: string | null
          id?: number
          performance_rating?: number | null
          slfm_id?: string | null
          tour?: string | null
          user_id?: string | null
          venue?: string | null
          venue_id?: string | null
          venue_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'eventos_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      events: {
        Row: {
          artist_id: number | null
          average_rating: number | null
          created_at: string
          date: string | null
          id: number
          name: string | null
          updated_at: string | null
          venue_id: number | null
        }
        Insert: {
          artist_id?: number | null
          average_rating?: number | null
          created_at?: string
          date?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
          venue_id?: number | null
        }
        Update: {
          artist_id?: number | null
          average_rating?: number | null
          created_at?: string
          date?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
          venue_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'events_artist_id_fkey'
            columns: ['artist_id']
            isOneToOne: false
            referencedRelation: 'artists'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'events_venue_id_fkey'
            columns: ['venue_id']
            isOneToOne: false
            referencedRelation: 'venues'
            referencedColumns: ['id']
          },
        ]
      }
      follows: {
        Row: {
          created_at: string
          followed_user_id: string | null
          following_user_id: string | null
          id: number
        }
        Insert: {
          created_at?: string
          followed_user_id?: string | null
          following_user_id?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          followed_user_id?: string | null
          following_user_id?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'follows_followed_user_id_fkey'
            columns: ['followed_user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'follows_following_user_id_fkey'
            columns: ['following_user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          bio: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          bio?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          bio?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      users_events: {
        Row: {
          created_at: string
          event_id: number | null
          event_rating: number | null
          id: number
          promoter_rating: number | null
          user_id: string | null
          venue_rating: number | null
        }
        Insert: {
          created_at?: string
          event_id?: number | null
          event_rating?: number | null
          id?: number
          promoter_rating?: number | null
          user_id?: string | null
          venue_rating?: number | null
        }
        Update: {
          created_at?: string
          event_id?: number | null
          event_rating?: number | null
          id?: number
          promoter_rating?: number | null
          user_id?: string | null
          venue_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'users_events_event_id_fkey'
            columns: ['event_id']
            isOneToOne: false
            referencedRelation: 'events'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'users_events_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      venues: {
        Row: {
          created_at: string
          id: number
          location: string | null
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          location?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          location?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never
