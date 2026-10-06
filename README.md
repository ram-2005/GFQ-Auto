# Form AI Assistant

A Firefox extension that extracts questions from Google Forms,
uses an AI provider to determine answers, and automatically
fills the form.

## Current Status

🚧 Early development

### Current milestone

- [x] Firefox extension loads
- [ ] Detect Google Forms
- [ ] Extract questions
- [ ] Identify question types
- [ ] Extract options
- [ ] Generate question fingerprints
- [ ] Local answer cache
- [ ] AI provider integration
- [ ] Automatic form filling

## Architecture

```text
Google Form
     ↓
Question Extractor
     ↓
Question Model
     ↓
Answer Cache
     ↓
AI Provider
     ↓
Answer Model
     ↓
Form Filler
