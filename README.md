# Home Healthcare Analytics SaaS (MVP)

## Overview
This project is a scalable analytics SaaS for home healthcare providers (medical and non-medical) in the US and UK.

The platform allows organizations to upload operational and clinical data (CSV or Google Sheets), map it to a standardized schema, and receive descriptive, diagnostic, predictive, and prescriptive analytics through a web dashboard and AI-powered natural language interface.

This repository is designed to be:
- Scalable
- Multi-tenant
- Developer-friendly
- AI-augmented

---

## Core Features (MVP)
- Supabase database (PostgreSQL)
- 7 core tables:
  - patients
  - visits
  - clinicians
  - branches
  - clinical_outcomes
  - financial_transactions
  - scheduling_capacity
- 24 KPIs across four analytics tiers:
  - Descriptive
  - Diagnostic (R)
  - Predictive (Python ML)
  - Prescriptive
- Next.js dashboard
- CSV & Google Sheets data ingestion with schema mapping
- AI agent for natural language analytics queries
- Automated executive PDF report

---

## Target Users
- Home healthcare agencies
- Operations & clinical leadership
- Analysts
- Developers extending the platform

---

## Architecture (High Level)

frontend/
- Next.js dashboard
- Authentication
- KPI visualizations
- AI query interface

backend/
- Supabase (Postgres + Auth + Storage)
- API layer
- Data ingestion services

analytics/
- R scripts (diagnostic analytics)
- Python models (predictive analytics)
- KPI calculation logic

ai/
- Claude AI agent
- Prompt templates
- Metadata-driven querying

reports/
- Executive PDF generation
- KPI summaries
- Insights & recommendations

---

## Design Principles
- Multi-tenant by default
- Country-aware (US/UK)
- Modular analytics
- Schema-first ingestion
- Auditability & security

---

## Status
MVP in progress.

No production deployment yet.
