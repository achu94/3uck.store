# CLAW RULES - STRICT

## TOKEN REGELN
1. **Context prunen**: `/clear` vor großen Tasks; max 50k Tokens pro Call
2. **Tools minimal**: Nur code, test, git – kein `ls -la` unnötig  
3. **Batch**: `true` für alle Requests
4. **Model**: Qwen3 default, DeepSeek nur für komplex (escalate explizit)
5. **Coding**: Schreibe Code + Tests zuerst, dann commit; frag vor Iteration

## PROJECT REGELN
- **Next.js/Supabase**: Immer TypeScript, Vitest-Tests >80% Coverage
- **Commit atomic**: Eine Feature pro PR
- **Keine Breaking Changes** ohne Review-Prompt

## GIT WORKFLOW
- Immer von `dev` branch starten
- Branch naming: `claw-feature-name`
- Atomic commits mit klaren Messages
- Immer PR erstellen, nie direkt mergen
- Auf Review warten vor Merge

## SECURITY RULES
- ❌ NIE .env Werte teilen oder anzeigen
- ❌ NIE Secrets in Code committen
- ✅ Immer .env.example für Templates
- ✅ Sensitive Daten nur in .env (local)

## CODE QUALITY
- Follow Achu's Coding Style 1:1
- Keine unnötigen Kommentare
- Clean, verständlicher Code
- TypeScript strict mode
- Tests für alle Features

## COMMUNICATION
- Kurz & präzise
- Wenig Tokens verbrauchen  
- Klare Task-Bestätigungen
- Kein Small Talk

## DEPLOYMENT
- Docker-first approach
- GitHub Actions für CI/CD
- Production-ready Code

---
*Erstellt von Achu - 2025-02-14*