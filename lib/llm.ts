import { anthropic } from "@ai-sdk/anthropic"
import { deepseek } from "@ai-sdk/deepseek"
import { google } from "@ai-sdk/google"
import { groq } from "@ai-sdk/groq"
import { openai } from "@ai-sdk/openai"
import type { LanguageModel } from "ai"

/**
 * Multi-provider LLM resolver.
 *
 * The active model is set at deploy time via the `MODEL` environment variable
 * in the format `<provider>:<model-id>`. There is no visitor-facing selector —
 * to switch models, change the env var and redeploy.
 *
 * Supported providers and example model IDs (model names change — check each
 * provider's docs for current model lists; the backend passes the id verbatim,
 * so new models work as soon as they're released).
 *
 *   openai       OPENAI_API_KEY                  gpt-4o-mini, gpt-4.1, gpt-4o
 *   anthropic    ANTHROPIC_API_KEY               claude-sonnet-4-6, claude-haiku-4-5
 *   google       GOOGLE_GENERATIVE_AI_API_KEY    gemini-2.5-flash, gemini-2.5-pro
 *   deepseek     DEEPSEEK_API_KEY                deepseek-chat, deepseek-reasoner
 *   groq         GROQ_API_KEY                    llama-3.3-70b-versatile, llama-3.1-8b-instant, mixtral-8x7b-32768
 *
 * Default: openai:gpt-4o-mini (cheap, ~$0.15/$0.60 per Mtoken).
 *
 * @example
 *   MODEL=openai:gpt-4o-mini
 *   MODEL=anthropic:claude-sonnet-4-6
 *   MODEL=deepseek:deepseek-chat
 */

const DEFAULT_MODEL = "openai:gpt-4o-mini"

export type ProviderId = "openai" | "anthropic" | "google" | "deepseek" | "groq"

export type ResolvedModel = {
  provider: ProviderId
  modelId: string
  model: LanguageModel
}

export function resolveModel(): ResolvedModel {
  const spec = (process.env.MODEL ?? "").trim() || DEFAULT_MODEL
  const colon = spec.indexOf(":")
  if (colon < 1 || colon === spec.length - 1) {
    throw new Error(
      `Invalid MODEL "${spec}". Expected "provider:model-id", e.g. "openai:gpt-4o-mini".`,
    )
  }
  const provider = spec.slice(0, colon) as ProviderId
  const modelId = spec.slice(colon + 1)

  switch (provider) {
    case "openai":
      requireKey("OPENAI_API_KEY", provider)
      return { provider, modelId, model: openai(modelId) }
    case "anthropic":
      requireKey("ANTHROPIC_API_KEY", provider)
      return { provider, modelId, model: anthropic(modelId) }
    case "google":
      requireKey("GOOGLE_GENERATIVE_AI_API_KEY", provider)
      return { provider, modelId, model: google(modelId) }
    case "deepseek":
      requireKey("DEEPSEEK_API_KEY", provider)
      return { provider, modelId, model: deepseek(modelId) }
    case "groq":
      requireKey("GROQ_API_KEY", provider)
      return { provider, modelId, model: groq(modelId) }
    default:
      throw new Error(
        `Unknown provider "${provider}". Supported: openai, anthropic, google, deepseek, groq.`,
      )
  }
}

function requireKey(envName: string, provider: ProviderId): void {
  if (!process.env[envName]) {
    throw new Error(
      `${envName} is not set, but MODEL targets provider "${provider}". Add the key to .env.local.`,
    )
  }
}
