Create a professional README.md file for this project 
with the following exact content:

# StakeholderIQ — AI-Powered Stakeholder Intelligence & Communication Planner

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-cyan)
![Claude AI](https://img.shields.io/badge/Claude-Anthropic-orange)

## Overview

StakeholderIQ is an AI-powered stakeholder intelligence 
and communication planning tool built as part of a 
Business Analysis portfolio. It takes a plain text 
project description and instantly generates a complete 
stakeholder register, Power/Interest matrix, tailored 
communication plan, and risk register.

This tool demonstrates core BA competencies including 
stakeholder identification, influence mapping, 
communication strategy design, and risk management.

## Features

- AI-powered stakeholder analysis using Claude API
- Four structured output sections:
  - Stakeholder Register with stance and influence ratings
  - Power/Interest Matrix with visual quadrant mapping
  - Communication Plan with channels and objectives
  - Risk Register with impact, probability and mitigation
- Professional .txt report download
- Sample project for quick testing
- Mock mode with realistic pre-built data
- Fully responsive on mobile and desktop

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite |
| Styling | Custom CSS + CSS Variables |
| AI Engine | Anthropic Claude API |
| Fonts | Syne + DM Sans |
| Export | Formatted .txt download |
| Hosting | Vercel (optional) |

## BA Skills Demonstrated

- Stakeholder Identification — recognising all 
  affected parties from a project description
- Influence Mapping — classifying stakeholders 
  by power and interest levels
- Power/Interest Matrix — positioning stakeholders 
  in the correct management quadrant
- Communication Planning — designing tailored 
  engagement strategies per stakeholder group
- Risk Management — identifying project risks 
  with owners and mitigation strategies

## Getting Started

### Prerequisites
- Node.js 18+
- Anthropic API key (optional — mock mode works without it)

### Installation

Clone the repository:
git clone https://github.com/Kivaane/stakeholderiq.git

Navigate to project folder:
cd stakeholderiq

Install dependencies:
npm install

Start development server:
npm run dev

Open in browser:
http://localhost:5176

### API Key Setup

1. Click "Configure API Key" in the top right navbar
2. Paste your Anthropic API key
3. Click Save
4. The app switches from Mock Mode to live AI generation

Get your API key at: https://console.anthropic.com

## How To Use

1. Paste your project description in the textarea
2. Click "Map Stakeholders"
3. Browse through the 4 output tabs
4. Download the full report as .txt

## Project Structure

src/
  App.jsx          — Main application component
  sampleData.js    — Mock stakeholder data
  App.css          — Global styles
  index.css        — Base styles and design tokens
  main.jsx         — React entry point

## Author

Built by Kivaane Anton Uthayakumar
Computer Science Undergraduate — Informatics Institute 
of Technology (Affiliated with University of Westminster)
Business Analysis Portfolio Project 2026

LinkedIn: https://www.linkedin.com/in/kivaane-anton-uthayakumar/
GitHub: https://github.com/Kivaane
Portfolio: https://github.com/Kivaane/Kivaane.github.io

## License

MIT License — free to use and modify
