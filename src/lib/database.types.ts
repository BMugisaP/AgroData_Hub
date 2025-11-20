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
      cassava_varieties: {
        Row: {
          id: string
          name: string
          type: string
          description: string | null
          yield_rate: string | null
          maturity_period: string | null
          suitable_soil: string | null
          is_disease_resistant: boolean
          is_drought_tolerant: boolean
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          description?: string | null
          yield_rate?: string | null
          maturity_period?: string | null
          suitable_soil?: string | null
          is_disease_resistant?: boolean
          is_drought_tolerant?: boolean
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          description?: string | null
          yield_rate?: string | null
          maturity_period?: string | null
          suitable_soil?: string | null
          is_disease_resistant?: boolean
          is_drought_tolerant?: boolean
          image_url?: string | null
          created_at?: string
        }
      }
      farming_guides: {
        Row: {
          id: string
          category: string
          title: string
          content: string
          order_index: number
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          category: string
          title: string
          content: string
          order_index?: number
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          category?: string
          title?: string
          content?: string
          order_index?: number
          image_url?: string | null
          created_at?: string
        }
      }
      pests_diseases: {
        Row: {
          id: string
          name: string
          type: 'pest' | 'disease'
          symptoms: string | null
          control_measures: string | null
          prevention: string | null
          image_url: string | null
          severity_level: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'pest' | 'disease'
          symptoms?: string | null
          control_measures?: string | null
          prevention?: string | null
          image_url?: string | null
          severity_level?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'pest' | 'disease'
          symptoms?: string | null
          control_measures?: string | null
          prevention?: string | null
          image_url?: string | null
          severity_level?: string | null
          created_at?: string
        }
      }
      market_prices: {
        Row: {
          id: string
          product_type: string
          price_per_kg: number | null
          region: string | null
          market_name: string | null
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          product_type: string
          price_per_kg?: number | null
          region?: string | null
          market_name?: string | null
          date?: string
          created_at?: string
        }
        Update: {
          id?: string
          product_type?: string
          price_per_kg?: number | null
          region?: string | null
          market_name?: string | null
          date?: string
          created_at?: string
        }
      }
      users: {
        Row: {
          id: string
          full_name: string | null
          phone: string | null
          location: string | null
          farm_size: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          phone?: string | null
          location?: string | null
          farm_size?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          phone?: string | null
          location?: string | null
          farm_size?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      farm_records: {
        Row: {
          id: string
          user_id: string | null
          variety_id: string | null
          planting_date: string | null
          expected_harvest_date: string | null
          actual_harvest_date: string | null
          field_size: string | null
          yield_amount: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          variety_id?: string | null
          planting_date?: string | null
          expected_harvest_date?: string | null
          actual_harvest_date?: string | null
          field_size?: string | null
          yield_amount?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          variety_id?: string | null
          planting_date?: string | null
          expected_harvest_date?: string | null
          actual_harvest_date?: string | null
          field_size?: string | null
          yield_amount?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      farm_expenses: {
        Row: {
          id: string
          farm_record_id: string | null
          user_id: string | null
          expense_type: string
          amount: number
          date: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          farm_record_id?: string | null
          user_id?: string | null
          expense_type: string
          amount: number
          date?: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          farm_record_id?: string | null
          user_id?: string | null
          expense_type?: string
          amount?: number
          date?: string
          description?: string | null
          created_at?: string
        }
      }
      farm_sales: {
        Row: {
          id: string
          farm_record_id: string | null
          user_id: string | null
          quantity_sold: string | null
          price_per_unit: number | null
          total_amount: number
          buyer_name: string | null
          sale_date: string
          created_at: string
        }
        Insert: {
          id?: string
          farm_record_id?: string | null
          user_id?: string | null
          quantity_sold?: string | null
          price_per_unit?: number | null
          total_amount: number
          buyer_name?: string | null
          sale_date?: string
          created_at?: string
        }
        Update: {
          id?: string
          farm_record_id?: string | null
          user_id?: string | null
          quantity_sold?: string | null
          price_per_unit?: number | null
          total_amount?: number
          buyer_name?: string | null
          sale_date?: string
          created_at?: string
        }
      }
      fertilizers: {
        Row: {
          id: string
          name: string
          type: string | null
          application_method: string | null
          recommended_quantity: string | null
          application_timing: string | null
          benefits: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type?: string | null
          application_method?: string | null
          recommended_quantity?: string | null
          application_timing?: string | null
          benefits?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string | null
          application_method?: string | null
          recommended_quantity?: string | null
          application_timing?: string | null
          benefits?: string | null
          created_at?: string
        }
      }
      processing_methods: {
        Row: {
          id: string
          method_name: string
          product_output: string | null
          description: string | null
          steps: string | null
          equipment_needed: string | null
          processing_time: string | null
          created_at: string
        }
        Insert: {
          id?: string
          method_name: string
          product_output?: string | null
          description?: string | null
          steps?: string | null
          equipment_needed?: string | null
          processing_time?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          method_name?: string
          product_output?: string | null
          description?: string | null
          steps?: string | null
          equipment_needed?: string | null
          processing_time?: string | null
          created_at?: string
        }
      }
    }
  }
}
