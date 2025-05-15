# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The VCF Annotator Frontend is a web application for genetic data analysis developed by GenoBank.io. It enables users to:

- Upload and analyze VCF (Variant Call Format) genetic files
- Generate ancestry reports from genetic data
- Create BioIP (Biological Intellectual Property) NFTs on the blockchain
- Manage ownership of genetic data through web3 technology

## Technology Stack

- **Frontend**: Vanilla JavaScript with jQuery and Bootstrap 5
- **Authentication**: 
  - Web3 wallet authentication (MetaMask, WalletConnect)
  - OAuth (Google)
  - Magic link (email)
- **Blockchain**: 
  - Avalanche blockchain (testnet chain ID 43113)
  - NFT creation for genomic data
- **Payment**: Stripe integration

## Environment Configuration

The application automatically detects the environment based on the hostname:

- **Local**: `localhost` or `127.0.0.1`
  - API: `http://localhost:8081/api_vcf_annotator`
  - Uses Stripe test API keys

- **Staging**: URL path contains `/test/`
  - API: `https://staging.genobank.app/api_vcf_annotator`
  
- **Production**: 
  - API: `https://genobank.app/api_vcf_annotator`
  - Uses live Stripe keys

Environment variables are configured in `/js/env.js`.

## Core Application Structure

1. **Authentication**:
   - Multiple login methods managed by `/login/genobank_auth/login.js`
   - Session management via localStorage tokens

2. **Dashboard**:
   - Main interface for file management and analysis
   - Displays genomic file information and analysis packages
   - Shows job status and analysis results

3. **Services**:
   - Registration service for user management
   - Results service for retrieving analysis output
   - File upload service for managing user files

4. **Ancestry Reports**:
   - Latin and Global reports available
   - Visual representation of ancestry data

## Development Setup

To run the application locally:

1. Clone the repository
2. Ensure correct API endpoints in `js/env.js`
3. Open `index.html` in a browser

The application will automatically use test endpoints and Stripe keys when running locally.

## Key Files

- `index.html`: Main entry point
- `MainDashboard.js`: Dashboard initialization
- `js/env.js`: Environment configuration
- `services/*.js`: API service integrations
- `components/main-dashboard-component/*.js`: Main UI components

## User Flow

1. User authenticates via web3 wallet or traditional methods
2. User uploads genetic files (VCF or 23andMe format)
3. User purchases analysis packages via Stripe
4. System processes files with selected package
5. Results are displayed upon completion