import { type UUID } from "crypto";
import { type BgentRuntime } from "./runtime";

export interface Content {
  content: string;
  action?: string; // known value
  source?: string; // known value
  [key: string]: unknown;
}

export interface ContentExample {
  user: string;
  content: string;
  action?: string; // known value
  source?: string; // known value
  [key: string]: unknown;
}

export interface Actor {
  name: string;
  details: { tagline: string; summary: string; quote: string };
  id: UUID;
}

export interface Memory {
  id?: UUID;
  user_id: UUID;
  created_at?: string;
  content: Content | string;
  embedding?: number[];
  user_ids: UUID[];
  room_id: UUID;
}

export interface Objective {
  id: string;
  description: string;
  completed: boolean;
}

export interface Goal {
  id: UUID;
  user_ids: UUID[];
  user_id: UUID;
  name: string;
  status: string;
  objectives: Objective[];
}

export interface State {
  userIds: UUID[];
  senderId?: UUID;
  agentId?: UUID;
  room_id: UUID;
  agentName?: string;
  senderName?: string;
  actors: string;
  actorsData?: Actor[];
  goals?: string;
  goalsData?: Goal[];
  recentMessages: string;
  recentMessagesData: Memory[];
  recentSummarizations?: string;
  recentSummarizationsData?: Memory[];
  relevantSummarizations?: string;
  relevantSummarizationsData?: Memory[];
  actionNames?: string;
  actions?: string;
  actionsData?: Action[];
  actionExamples?: string;
  responseData?: Content;
  [key: string]: unknown;
}

export interface Message {
  agentId: UUID;
  senderId: UUID;
  userIds: UUID[];
  content: Content | string;
  room_id: UUID;
}

export interface MessageExample {
  user: string;
  content: string | null;
  action: string | null;
}

export type Handler = (
  runtime: BgentRuntime,
  message: Message,
  state?: State,
) => Promise<unknown>;

export type Validator = (
  runtime: BgentRuntime,
  message: Message,
  state?: State,
) => Promise<boolean>;

export interface Action {
  condition: string;
  description: string;
  examples: ContentExample[][];
  handler: Handler;
  name: string;
  validate: Validator;
}

export interface EvaluationExample {
  context: string;
  messages: Array<ContentExample>;
  outcome: string;
}

export interface Evaluator {
  condition: string;
  description: string;
  examples: EvaluationExample[];
  handler: Handler;
  name: string;
  validate: Validator;
}
