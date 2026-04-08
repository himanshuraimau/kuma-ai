# Kuma Backend

Feature-based Bun backend for Kuma AI.

## Structure

```text
src/
	config/
	lib/
	modules/
		agent/
		artifacts/
		chat/
		files/
		health/
		integrations/
		memory/
		projects/
		research/
```

Each feature folder follows the same shape:

```text
feature/
	index.ts
	feature.service.ts
	feature.types.ts
```

## Run

```bash
bun install
bun run dev
```

## Entry Points

- `src/index.ts` starts the Bun server.
- `src/app.ts` wires the feature registry and base routes.
- `src/modules/index.ts` exports all feature modules.

## Base Routes

- `GET /health` returns a basic status check.
- `GET /` returns the backend name and registered modules.
