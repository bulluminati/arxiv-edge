export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      active_investment_signals: {
        Row: {
          action_recommendation: string | null
          bear_case_eli16: string | null
          bull_case_eli16: string | null
          catalyst_timeline: string | null
          confidence_level: number | null
          generated_at: string | null
          id: string
          impact_score: number | null
          key_factors: string[] | null
          market_sector: string | null
          paper_title: string | null
          primary_ticker: string | null
          reasoning_summary: string | null
          signal_strength: number | null
          signal_summary: string
          signal_type: string
        }
        Insert: {
          action_recommendation?: string | null
          bear_case_eli16?: string | null
          bull_case_eli16?: string | null
          catalyst_timeline?: string | null
          confidence_level?: number | null
          generated_at?: string | null
          id?: string
          impact_score?: number | null
          key_factors?: string[] | null
          market_sector?: string | null
          paper_title?: string | null
          primary_ticker?: string | null
          reasoning_summary?: string | null
          signal_strength?: number | null
          signal_summary: string
          signal_type: string
        }
        Update: {
          action_recommendation?: string | null
          bear_case_eli16?: string | null
          bull_case_eli16?: string | null
          catalyst_timeline?: string | null
          confidence_level?: number | null
          generated_at?: string | null
          id?: string
          impact_score?: number | null
          key_factors?: string[] | null
          market_sector?: string | null
          paper_title?: string | null
          primary_ticker?: string | null
          reasoning_summary?: string | null
          signal_strength?: number | null
          signal_summary?: string
          signal_type?: string
        }
        Relationships: []
      }
      affected_companies: {
        Row: {
          company_name: string
          created_at: string | null
          exchange: string | null
          id: string
          impact_confidence: number | null
          impact_description: string | null
          impact_timeframe: string | null
          impact_type: string
          market_cap_range: string | null
          paper_id: string | null
          revenue_impact_estimate: number | null
          ticker_symbol: string
        }
        Insert: {
          company_name: string
          created_at?: string | null
          exchange?: string | null
          id?: string
          impact_confidence?: number | null
          impact_description?: string | null
          impact_timeframe?: string | null
          impact_type: string
          market_cap_range?: string | null
          paper_id?: string | null
          revenue_impact_estimate?: number | null
          ticker_symbol: string
        }
        Update: {
          company_name?: string
          created_at?: string | null
          exchange?: string | null
          id?: string
          impact_confidence?: number | null
          impact_description?: string | null
          impact_timeframe?: string | null
          impact_type?: string
          market_cap_range?: string | null
          paper_id?: string | null
          revenue_impact_estimate?: number | null
          ticker_symbol?: string
        }
        Relationships: []
      }
      agent_analysis_results: {
        Row: {
          agent_number: number
          created_at: string | null
          id: string
          paper_id: string
          result: Json
        }
        Insert: {
          agent_number: number
          created_at?: string | null
          id?: string
          paper_id: string
          result: Json
        }
        Update: {
          agent_number?: number
          created_at?: string | null
          id?: string
          paper_id?: string
          result?: Json
        }
        Relationships: []
      }
      agent_prompts: {
        Row: {
          agent_number: number
          id: string
          prompt_template: string
          updated_at: string | null
        }
        Insert: {
          agent_number: number
          id?: string
          prompt_template: string
          updated_at?: string | null
        }
        Update: {
          agent_number?: number
          id?: string
          prompt_template?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      analysis_jobs: {
        Row: {
          agent_type: string | null
          created_at: string | null
          id: number
          priority: number | null
          repo_id: number | null
          result: Json | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          agent_type?: string | null
          created_at?: string | null
          id?: number
          priority?: number | null
          repo_id?: number | null
          result?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_type?: string | null
          created_at?: string | null
          id?: number
          priority?: number | null
          repo_id?: number | null
          result?: Json | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analysis_jobs_repo_id_fkey"
            columns: ["repo_id"]
            isOneToOne: false
            referencedRelation: "candidate_repos"
            referencedColumns: ["id"]
          },
        ]
      }
      arxiv_categories: {
        Row: {
          category_code: string
          category_name: string
          created_at: string | null
          fetch_enabled: boolean | null
          id: string
          last_fetch_date: string | null
          papers_per_day_avg: number | null
          parent_category: string
          priority_tier: number | null
          processing_weight: number | null
          updated_at: string | null
        }
        Insert: {
          category_code: string
          category_name: string
          created_at?: string | null
          fetch_enabled?: boolean | null
          id?: string
          last_fetch_date?: string | null
          papers_per_day_avg?: number | null
          parent_category: string
          priority_tier?: number | null
          processing_weight?: number | null
          updated_at?: string | null
        }
        Update: {
          category_code?: string
          category_name?: string
          created_at?: string | null
          fetch_enabled?: boolean | null
          id?: string
          last_fetch_date?: string | null
          papers_per_day_avg?: number | null
          parent_category?: string
          priority_tier?: number | null
          processing_weight?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      bookmarked_papers: {
        Row: {
          created_at: string
          id: number
          paper_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          paper_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          paper_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarked_papers_paper_id_fkey"
            columns: ["paper_id"]
            isOneToOne: false
            referencedRelation: "research_papers"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_repos: {
        Row: {
          analysis_status: string | null
          corporate_backing: boolean | null
          created_at: string | null
          forks: number | null
          full_name: string | null
          id: number
          innovation_score: number | null
          last_checked: string | null
          last_commit_date: string | null
          priority_score: number | null
          research_paper_mentions: number | null
          sector: string | null
          stars: number | null
          status: string | null
          trending: boolean | null
          url: string | null
        }
        Insert: {
          analysis_status?: string | null
          corporate_backing?: boolean | null
          created_at?: string | null
          forks?: number | null
          full_name?: string | null
          id?: number
          innovation_score?: number | null
          last_checked?: string | null
          last_commit_date?: string | null
          priority_score?: number | null
          research_paper_mentions?: number | null
          sector?: string | null
          stars?: number | null
          status?: string | null
          trending?: boolean | null
          url?: string | null
        }
        Update: {
          analysis_status?: string | null
          corporate_backing?: boolean | null
          created_at?: string | null
          forks?: number | null
          full_name?: string | null
          id?: number
          innovation_score?: number | null
          last_checked?: string | null
          last_commit_date?: string | null
          priority_score?: number | null
          research_paper_mentions?: number | null
          sector?: string | null
          stars?: number | null
          status?: string | null
          trending?: boolean | null
          url?: string | null
        }
        Relationships: []
      }
      company_intelligence: {
        Row: {
          company_name: string
          competitive_moats: string[] | null
          created_at: string | null
          exchange: string | null
          id: string
          industry: string | null
          innovation_score: number | null
          key_technologies: string[] | null
          last_updated: string | null
          market_cap_billions: number | null
          patent_count: number | null
          pe_ratio: number | null
          profit_margin: number | null
          rd_spending_millions: number | null
          research_partnerships: string[] | null
          revenue_growth_rate: number | null
          sector: string | null
          ticker_symbol: string
        }
        Insert: {
          company_name: string
          competitive_moats?: string[] | null
          created_at?: string | null
          exchange?: string | null
          id?: string
          industry?: string | null
          innovation_score?: number | null
          key_technologies?: string[] | null
          last_updated?: string | null
          market_cap_billions?: number | null
          patent_count?: number | null
          pe_ratio?: number | null
          profit_margin?: number | null
          rd_spending_millions?: number | null
          research_partnerships?: string[] | null
          revenue_growth_rate?: number | null
          sector?: string | null
          ticker_symbol: string
        }
        Update: {
          company_name?: string
          competitive_moats?: string[] | null
          created_at?: string | null
          exchange?: string | null
          id?: string
          industry?: string | null
          innovation_score?: number | null
          key_technologies?: string[] | null
          last_updated?: string | null
          market_cap_billions?: number | null
          patent_count?: number | null
          pe_ratio?: number | null
          profit_margin?: number | null
          rd_spending_millions?: number | null
          research_partnerships?: string[] | null
          revenue_growth_rate?: number | null
          sector?: string | null
          ticker_symbol?: string
        }
        Relationships: []
      }
      curated_repos: {
        Row: {
          created_at: string | null
          curation_date: string
          curation_type: string
          curator_notes: string | null
          id: string
          rank_position: number
          repo_analysis_id: string | null
          sector: string
        }
        Insert: {
          created_at?: string | null
          curation_date: string
          curation_type: string
          curator_notes?: string | null
          id?: string
          rank_position: number
          repo_analysis_id?: string | null
          sector: string
        }
        Update: {
          created_at?: string | null
          curation_date?: string
          curation_type?: string
          curator_notes?: string | null
          id?: string
          rank_position?: number
          repo_analysis_id?: string | null
          sector?: string
        }
        Relationships: [
          {
            foreignKeyName: "curated_repos_repo_analysis_id_fkey"
            columns: ["repo_analysis_id"]
            isOneToOne: false
            referencedRelation: "repo_analysis"
            referencedColumns: ["id"]
          },
        ]
      }
      github_repos: {
        Row: {
          analysis: Json | null
          created_at: string
          description: string | null
          forks: number | null
          id: number
          last_updated_at: string | null
          market_sector_id: number | null
          name: string | null
          owner: string | null
          repo_url: string | null
          stars: number | null
        }
        Insert: {
          analysis?: Json | null
          created_at?: string
          description?: string | null
          forks?: number | null
          id?: number
          last_updated_at?: string | null
          market_sector_id?: number | null
          name?: string | null
          owner?: string | null
          repo_url?: string | null
          stars?: number | null
        }
        Update: {
          analysis?: Json | null
          created_at?: string
          description?: string | null
          forks?: number | null
          id?: number
          last_updated_at?: string | null
          market_sector_id?: number | null
          name?: string | null
          owner?: string | null
          repo_url?: string | null
          stars?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "github_repos_market_sector_id_fkey"
            columns: ["market_sector_id"]
            isOneToOne: false
            referencedRelation: "market_sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      investment_signals: {
        Row: {
          created_at: string
          id: number
          rationale: string | null
          research_paper_id: number | null
          signal_strength: number | null
          signal_type: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          rationale?: string | null
          research_paper_id?: number | null
          signal_strength?: number | null
          signal_type?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          rationale?: string | null
          research_paper_id?: number | null
          signal_strength?: number | null
          signal_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "investment_signals_research_paper_id_fkey"
            columns: ["research_paper_id"]
            isOneToOne: false
            referencedRelation: "research_papers"
            referencedColumns: ["id"]
          },
        ]
      }
      legislation: {
        Row: {
          affected_companies: Json | null
          analysis: Json | null
          bill_id: string | null
          created_at: string
          full_text_url: string | null
          id: number
          introduced_date: string | null
          last_action_date: string | null
          market_sector_id: number | null
          sponsor: string | null
          status: string | null
          summary: string | null
          title: string | null
        }
        Insert: {
          affected_companies?: Json | null
          analysis?: Json | null
          bill_id?: string | null
          created_at?: string
          full_text_url?: string | null
          id?: number
          introduced_date?: string | null
          last_action_date?: string | null
          market_sector_id?: number | null
          sponsor?: string | null
          status?: string | null
          summary?: string | null
          title?: string | null
        }
        Update: {
          affected_companies?: Json | null
          analysis?: Json | null
          bill_id?: string | null
          created_at?: string
          full_text_url?: string | null
          id?: number
          introduced_date?: string | null
          last_action_date?: string | null
          market_sector_id?: number | null
          sponsor?: string | null
          status?: string | null
          summary?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "legislation_market_sector_id_fkey"
            columns: ["market_sector_id"]
            isOneToOne: false
            referencedRelation: "market_sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      legislation_analysis: {
        Row: {
          affected_companies: Json | null
          bill_id: string
          created_at: string | null
          eli5_summary: string | null
          full_text_url: string | null
          id: number
          impact_justification: string | null
          impact_level: string | null
          introduced_date: string | null
          key_provisions: Json | null
          last_action_date: string | null
          last_action_description: string | null
          latest_action_date: string | null
          latest_action_description: string | null
          market_sector: string | null
          potential_impacts: string | null
          potential_market_impacts: string | null
          reminder_date: string | null
          summary: string | null
          title: string
          user_notes: string | null
        }
        Insert: {
          affected_companies?: Json | null
          bill_id: string
          created_at?: string | null
          eli5_summary?: string | null
          full_text_url?: string | null
          id?: number
          impact_justification?: string | null
          impact_level?: string | null
          introduced_date?: string | null
          key_provisions?: Json | null
          last_action_date?: string | null
          last_action_description?: string | null
          latest_action_date?: string | null
          latest_action_description?: string | null
          market_sector?: string | null
          potential_impacts?: string | null
          potential_market_impacts?: string | null
          reminder_date?: string | null
          summary?: string | null
          title: string
          user_notes?: string | null
        }
        Update: {
          affected_companies?: Json | null
          bill_id?: string
          created_at?: string | null
          eli5_summary?: string | null
          full_text_url?: string | null
          id?: number
          impact_justification?: string | null
          impact_level?: string | null
          introduced_date?: string | null
          key_provisions?: Json | null
          last_action_date?: string | null
          last_action_description?: string | null
          latest_action_date?: string | null
          latest_action_description?: string | null
          market_sector?: string | null
          potential_impacts?: string | null
          potential_market_impacts?: string | null
          reminder_date?: string | null
          summary?: string | null
          title?: string
          user_notes?: string | null
        }
        Relationships: []
      }
      market_sectors: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      processing_batches: {
        Row: {
          batch_type: string
          categories_included: string[] | null
          completed_at: string | null
          created_at: string | null
          id: string
          papers_count: number | null
          started_at: string | null
          status: string | null
        }
        Insert: {
          batch_type: string
          categories_included?: string[] | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          papers_count?: number | null
          started_at?: string | null
          status?: string | null
        }
        Update: {
          batch_type?: string
          categories_included?: string[] | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          papers_count?: number | null
          started_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      processing_queue: {
        Row: {
          abstract: string | null
          agent_failures: string[] | null
          agent1_output: Json | null
          agent2_output: Json | null
          agent3_output: Json | null
          agent4_output: Json | null
          agent5_output: Json | null
          analysis_metadata: Json | null
          analysis_mode: string | null
          arxiv_category: string | null
          arxiv_id: string
          attempts: number | null
          authors: Json | null
          categories: Json | null
          chain_metadata: Json | null
          chain_quality_score: number | null
          chained_quality_score: number | null
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          id: string
          intended_sector: string | null
          max_attempts: number | null
          paper_url: string | null
          priority: number | null
          processing_batch_id: string | null
          processing_error: string | null
          processing_stage: string | null
          processing_time_seconds: number | null
          published_date: string | null
          scheduled_for: string | null
          started_at: string | null
          status: string | null
          successful_agents: number | null
          title: string | null
          updated_at: string | null
          worker_assigned_at: string | null
          worker_id: string | null
          workflow_metadata: Json | null
        }
        Insert: {
          abstract?: string | null
          agent_failures?: string[] | null
          agent1_output?: Json | null
          agent2_output?: Json | null
          agent3_output?: Json | null
          agent4_output?: Json | null
          agent5_output?: Json | null
          analysis_metadata?: Json | null
          analysis_mode?: string | null
          arxiv_category?: string | null
          arxiv_id: string
          attempts?: number | null
          authors?: Json | null
          categories?: Json | null
          chain_metadata?: Json | null
          chain_quality_score?: number | null
          chained_quality_score?: number | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          intended_sector?: string | null
          max_attempts?: number | null
          paper_url?: string | null
          priority?: number | null
          processing_batch_id?: string | null
          processing_error?: string | null
          processing_stage?: string | null
          processing_time_seconds?: number | null
          published_date?: string | null
          scheduled_for?: string | null
          started_at?: string | null
          status?: string | null
          successful_agents?: number | null
          title?: string | null
          updated_at?: string | null
          worker_assigned_at?: string | null
          worker_id?: string | null
          workflow_metadata?: Json | null
        }
        Update: {
          abstract?: string | null
          agent_failures?: string[] | null
          agent1_output?: Json | null
          agent2_output?: Json | null
          agent3_output?: Json | null
          agent4_output?: Json | null
          agent5_output?: Json | null
          analysis_metadata?: Json | null
          analysis_mode?: string | null
          arxiv_category?: string | null
          arxiv_id?: string
          attempts?: number | null
          authors?: Json | null
          categories?: Json | null
          chain_metadata?: Json | null
          chain_quality_score?: number | null
          chained_quality_score?: number | null
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          intended_sector?: string | null
          max_attempts?: number | null
          paper_url?: string | null
          priority?: number | null
          processing_batch_id?: string | null
          processing_error?: string | null
          processing_stage?: string | null
          processing_time_seconds?: number | null
          published_date?: string | null
          scheduled_for?: string | null
          started_at?: string | null
          status?: string | null
          successful_agents?: number | null
          title?: string | null
          updated_at?: string | null
          worker_assigned_at?: string | null
          worker_id?: string | null
          workflow_metadata?: Json | null
        }
        Relationships: []
      }
      repo_analysis: {
        Row: {
          analysis_date: string
          analysis_status: string | null
          community_activity: Json | null
          composite_score: number
          created_at: string | null
          created_at_analysis: string | null
          documentation_quality: Json | null
          enterprise_viability: Json | null
          forks: number | null
          id: string
          innovation_research: Json | null
          investment_signals: string[] | null
          language: string | null
          last_commit_date: string | null
          next_steps: string[] | null
          processing_time_seconds: number | null
          recommendation: string | null
          repo_full_name: string
          repo_url: string
          research_connections: string[] | null
          sector: string
          sector_relevance: string | null
          security_risk: Json | null
          stars: number | null
          summary: string
          technical_merit: Json | null
          topics: string[] | null
          updated_at: string | null
        }
        Insert: {
          analysis_date?: string
          analysis_status?: string | null
          community_activity?: Json | null
          composite_score: number
          created_at?: string | null
          created_at_analysis?: string | null
          documentation_quality?: Json | null
          enterprise_viability?: Json | null
          forks?: number | null
          id?: string
          innovation_research?: Json | null
          investment_signals?: string[] | null
          language?: string | null
          last_commit_date?: string | null
          next_steps?: string[] | null
          processing_time_seconds?: number | null
          recommendation?: string | null
          repo_full_name: string
          repo_url: string
          research_connections?: string[] | null
          sector: string
          sector_relevance?: string | null
          security_risk?: Json | null
          stars?: number | null
          summary: string
          technical_merit?: Json | null
          topics?: string[] | null
          updated_at?: string | null
        }
        Update: {
          analysis_date?: string
          analysis_status?: string | null
          community_activity?: Json | null
          composite_score?: number
          created_at?: string | null
          created_at_analysis?: string | null
          documentation_quality?: Json | null
          enterprise_viability?: Json | null
          forks?: number | null
          id?: string
          innovation_research?: Json | null
          investment_signals?: string[] | null
          language?: string | null
          last_commit_date?: string | null
          next_steps?: string[] | null
          processing_time_seconds?: number | null
          recommendation?: string | null
          repo_full_name?: string
          repo_url?: string
          research_connections?: string[] | null
          sector?: string
          sector_relevance?: string | null
          security_risk?: Json | null
          stars?: number | null
          summary?: string
          technical_merit?: Json | null
          topics?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      repo_commit_stats: {
        Row: {
          commit_frequency: Json
          commits_this_week: number
          commits_today: number
          created_at: string | null
          id: string
          last_updated: string | null
          repo_analysis_id: string | null
          repo_full_name: string | null
          total_commits: number
          updated_at: string | null
        }
        Insert: {
          commit_frequency?: Json
          commits_this_week?: number
          commits_today?: number
          created_at?: string | null
          id?: string
          last_updated?: string | null
          repo_analysis_id?: string | null
          repo_full_name?: string | null
          total_commits?: number
          updated_at?: string | null
        }
        Update: {
          commit_frequency?: Json
          commits_this_week?: number
          commits_today?: number
          created_at?: string | null
          id?: string
          last_updated?: string | null
          repo_analysis_id?: string | null
          repo_full_name?: string | null
          total_commits?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "repo_commit_stats_repo_analysis_id_fkey"
            columns: ["repo_analysis_id"]
            isOneToOne: false
            referencedRelation: "repo_analysis"
            referencedColumns: ["id"]
          },
        ]
      }
      repo_feedback: {
        Row: {
          adjusted_score: number | null
          created_at: string | null
          feedback_notes: string | null
          feedback_type: string
          id: string
          original_score: number | null
          repo_analysis_id: string | null
          user_id: string | null
        }
        Insert: {
          adjusted_score?: number | null
          created_at?: string | null
          feedback_notes?: string | null
          feedback_type: string
          id?: string
          original_score?: number | null
          repo_analysis_id?: string | null
          user_id?: string | null
        }
        Update: {
          adjusted_score?: number | null
          created_at?: string | null
          feedback_notes?: string | null
          feedback_type?: string
          id?: string
          original_score?: number | null
          repo_analysis_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "repo_feedback_repo_analysis_id_fkey"
            columns: ["repo_analysis_id"]
            isOneToOne: false
            referencedRelation: "repo_analysis"
            referencedColumns: ["id"]
          },
        ]
      }
      repository_notes: {
        Row: {
          created_at: string
          id: string
          is_pinned: boolean
          note_content: string
          repo_full_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_pinned?: boolean
          note_content: string
          repo_full_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_pinned?: boolean
          note_content?: string
          repo_full_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      research_papers: {
        Row: {
          abstract: string | null
          abstract_glossary: Json | null
          affected_public_companies: Json | null
          agent_confidence_scores: Json | null
          agent1_technical_analysis: Json | null
          agent2_market_analysis: Json | null
          agent3_investment_analysis: Json | null
          agent4_plain_english_glossary: Json | null
          agent5_quality_control: Json | null
          agent6_stock_picks: Json | null
          agent7_eli16_summary: Json | null
          agent8_glossary: Json | null
          analysis: Json | null
          analysis_mode: string | null
          arxiv_id: string | null
          arxiv_url: string | null
          authors: Json | null
          breakthrough_claims: Json | null
          categories: Json | null
          commercial_viability: string | null
          competitive_advantage_score: number | null
          created_at: string
          eli16_summary: string | null
          id: number
          impact_score: number | null
          investment_thesis: string | null
          key_insights: Json | null
          limitations: Json | null
          market_sector: string | null
          market_sector_id: number | null
          market_sectors: string[] | null
          market_size_estimate: number | null
          patent_potential: string | null
          pdf_url: string | null
          primary_category: string | null
          primary_sector: string | null
          processed_at: string | null
          processing_error: string | null
          processing_status: string | null
          publication_date: string | null
          published_date: string | null
          sector_confidence: Json | null
          subsector: string | null
          summary: string | null
          synthesis_metadata: Json | null
          technical_advantages: Json | null
          technology_readiness_level: number | null
          timeline_to_market: number | null
          title: string | null
          updated_at: string | null
          updated_date: string | null
        }
        Insert: {
          abstract?: string | null
          abstract_glossary?: Json | null
          affected_public_companies?: Json | null
          agent_confidence_scores?: Json | null
          agent1_technical_analysis?: Json | null
          agent2_market_analysis?: Json | null
          agent3_investment_analysis?: Json | null
          agent4_plain_english_glossary?: Json | null
          agent5_quality_control?: Json | null
          agent6_stock_picks?: Json | null
          agent7_eli16_summary?: Json | null
          agent8_glossary?: Json | null
          analysis?: Json | null
          analysis_mode?: string | null
          arxiv_id?: string | null
          arxiv_url?: string | null
          authors?: Json | null
          breakthrough_claims?: Json | null
          categories?: Json | null
          commercial_viability?: string | null
          competitive_advantage_score?: number | null
          created_at?: string
          eli16_summary?: string | null
          id?: number
          impact_score?: number | null
          investment_thesis?: string | null
          key_insights?: Json | null
          limitations?: Json | null
          market_sector?: string | null
          market_sector_id?: number | null
          market_sectors?: string[] | null
          market_size_estimate?: number | null
          patent_potential?: string | null
          pdf_url?: string | null
          primary_category?: string | null
          primary_sector?: string | null
          processed_at?: string | null
          processing_error?: string | null
          processing_status?: string | null
          publication_date?: string | null
          published_date?: string | null
          sector_confidence?: Json | null
          subsector?: string | null
          summary?: string | null
          synthesis_metadata?: Json | null
          technical_advantages?: Json | null
          technology_readiness_level?: number | null
          timeline_to_market?: number | null
          title?: string | null
          updated_at?: string | null
          updated_date?: string | null
        }
        Update: {
          abstract?: string | null
          abstract_glossary?: Json | null
          affected_public_companies?: Json | null
          agent_confidence_scores?: Json | null
          agent1_technical_analysis?: Json | null
          agent2_market_analysis?: Json | null
          agent3_investment_analysis?: Json | null
          agent4_plain_english_glossary?: Json | null
          agent5_quality_control?: Json | null
          agent6_stock_picks?: Json | null
          agent7_eli16_summary?: Json | null
          agent8_glossary?: Json | null
          analysis?: Json | null
          analysis_mode?: string | null
          arxiv_id?: string | null
          arxiv_url?: string | null
          authors?: Json | null
          breakthrough_claims?: Json | null
          categories?: Json | null
          commercial_viability?: string | null
          competitive_advantage_score?: number | null
          created_at?: string
          eli16_summary?: string | null
          id?: number
          impact_score?: number | null
          investment_thesis?: string | null
          key_insights?: Json | null
          limitations?: Json | null
          market_sector?: string | null
          market_sector_id?: number | null
          market_sectors?: string[] | null
          market_size_estimate?: number | null
          patent_potential?: string | null
          pdf_url?: string | null
          primary_category?: string | null
          primary_sector?: string | null
          processed_at?: string | null
          processing_error?: string | null
          processing_status?: string | null
          publication_date?: string | null
          published_date?: string | null
          sector_confidence?: Json | null
          subsector?: string | null
          summary?: string | null
          synthesis_metadata?: Json | null
          technical_advantages?: Json | null
          technology_readiness_level?: number | null
          timeline_to_market?: number | null
          title?: string | null
          updated_at?: string | null
          updated_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "research_papers_market_sector_id_fkey"
            columns: ["market_sector_id"]
            isOneToOne: false
            referencedRelation: "market_sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      stock_prices: {
        Row: {
          article_id: string | null
          close: number | null
          fetched_at: string | null
          high: number | null
          id: string
          low: number | null
          open: number | null
          raw_json: Json | null
          ticker: string
          timestamp: string
          volume: number | null
        }
        Insert: {
          article_id?: string | null
          close?: number | null
          fetched_at?: string | null
          high?: number | null
          id?: string
          low?: number | null
          open?: number | null
          raw_json?: Json | null
          ticker: string
          timestamp: string
          volume?: number | null
        }
        Update: {
          article_id?: string | null
          close?: number | null
          fetched_at?: string | null
          high?: number | null
          id?: string
          low?: number | null
          open?: number | null
          raw_json?: Json | null
          ticker?: string
          timestamp?: string
          volume?: number | null
        }
        Relationships: []
      }
      trending_breakthrough_papers: {
        Row: {
          breakthrough_score: number | null
          calculated_at: string | null
          id: string
          paper_id: number | null
          time_window: string
          trend_score: number
        }
        Insert: {
          breakthrough_score?: number | null
          calculated_at?: string | null
          id?: string
          paper_id?: number | null
          time_window: string
          trend_score: number
        }
        Update: {
          breakthrough_score?: number | null
          calculated_at?: string | null
          id?: string
          paper_id?: number | null
          time_window?: string
          trend_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "trending_breakthrough_papers_paper_id_fkey"
            columns: ["paper_id"]
            isOneToOne: false
            referencedRelation: "research_papers"
            referencedColumns: ["id"]
          },
        ]
      }
      trending_papers: {
        Row: {
          calculated_at: string | null
          citation_velocity: number | null
          id: string
          media_coverage_score: number | null
          paper_id: string | null
          social_signals: number | null
          time_window: string
          trend_rank: number | null
          trend_score: number
          trend_type: string
        }
        Insert: {
          calculated_at?: string | null
          citation_velocity?: number | null
          id?: string
          media_coverage_score?: number | null
          paper_id?: string | null
          social_signals?: number | null
          time_window: string
          trend_rank?: number | null
          trend_score: number
          trend_type: string
        }
        Update: {
          calculated_at?: string | null
          citation_velocity?: number | null
          id?: string
          media_coverage_score?: number | null
          paper_id?: string | null
          social_signals?: number | null
          time_window?: string
          trend_rank?: number | null
          trend_score?: number
          trend_type?: string
        }
        Relationships: []
      }
      user_notes: {
        Row: {
          created_at: string
          id: number
          note: string | null
          target_entity_id: string | null
          target_entity_type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          note?: string | null
          target_entity_id?: string | null
          target_entity_type?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          note?: string | null
          target_entity_id?: string | null
          target_entity_type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_pinned_repos: {
        Row: {
          created_at: string
          github_repo_id: number
          id: number
          pin_date: string | null
          repo_analysis_id: string | null
          repo_full_name: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          github_repo_id: number
          id?: number
          pin_date?: string | null
          repo_analysis_id?: string | null
          repo_full_name?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          github_repo_id?: number
          id?: number
          pin_date?: string | null
          repo_analysis_id?: string | null
          repo_full_name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_pinned_repos_github_repo_id_fkey"
            columns: ["github_repo_id"]
            isOneToOne: false
            referencedRelation: "github_repos"
            referencedColumns: ["id"]
          },
        ]
      }
      user_portfolios: {
        Row: {
          breakthrough_alerts: boolean | null
          company_alerts: boolean | null
          created_at: string | null
          id: string
          keywords: string[] | null
          max_timeline_months: number | null
          min_impact_score: number | null
          name: string
          portfolio_type: string | null
          sector_alerts: boolean | null
          signal_alerts: boolean | null
          tracked_companies: string[] | null
          tracked_sectors: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          breakthrough_alerts?: boolean | null
          company_alerts?: boolean | null
          created_at?: string | null
          id?: string
          keywords?: string[] | null
          max_timeline_months?: number | null
          min_impact_score?: number | null
          name: string
          portfolio_type?: string | null
          sector_alerts?: boolean | null
          signal_alerts?: boolean | null
          tracked_companies?: string[] | null
          tracked_sectors?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          breakthrough_alerts?: boolean | null
          company_alerts?: boolean | null
          created_at?: string | null
          id?: string
          keywords?: string[] | null
          max_timeline_months?: number | null
          min_impact_score?: number | null
          name?: string
          portfolio_type?: string | null
          sector_alerts?: boolean | null
          signal_alerts?: boolean | null
          tracked_companies?: string[] | null
          tracked_sectors?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_reminders: {
        Row: {
          created_at: string
          id: number
          note: string | null
          reminder_date: string | null
          target_entity_id: string | null
          target_entity_type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          note?: string | null
          reminder_date?: string | null
          target_entity_id?: string | null
          target_entity_type?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          note?: string | null
          reminder_date?: string | null
          target_entity_id?: string | null
          target_entity_type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      video_metadata: {
        Row: {
          channel_title: string | null
          created_at: string
          id: number
          keywords: string[] | null
          market_sector: string | null
          market_sector_id: number | null
          processed_at: string | null
          published_at: string | null
          summary: string | null
          thumbnail_url: string | null
          title: string | null
          transcript: string | null
          video_id: string
        }
        Insert: {
          channel_title?: string | null
          created_at?: string
          id?: number
          keywords?: string[] | null
          market_sector?: string | null
          market_sector_id?: number | null
          processed_at?: string | null
          published_at?: string | null
          summary?: string | null
          thumbnail_url?: string | null
          title?: string | null
          transcript?: string | null
          video_id: string
        }
        Update: {
          channel_title?: string | null
          created_at?: string
          id?: number
          keywords?: string[] | null
          market_sector?: string | null
          market_sector_id?: number | null
          processed_at?: string | null
          published_at?: string | null
          summary?: string | null
          thumbnail_url?: string | null
          title?: string | null
          transcript?: string | null
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_metadata_market_sector_id_fkey"
            columns: ["market_sector_id"]
            isOneToOne: false
            referencedRelation: "market_sectors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      distinct_sectors: {
        Args: Record<PropertyKey, never>
        Returns: {
          market_sector: string
        }[]
      }
      get_repo_commit_stats: {
        Args: { repo_names: string[] }
        Returns: {
          repo_full_name: string
          total_commits: number
          commits_today: number
          commits_this_week: number
          commit_frequency: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
