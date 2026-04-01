/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as about from "../about.js";
import type * as blog from "../blog.js";
import type * as categories from "../categories.js";
import type * as files from "../files.js";
import type * as hero from "../hero.js";
import type * as newsletterSubscribers from "../newsletterSubscribers.js";
import type * as projects from "../projects.js";
import type * as seed from "../seed.js";
import type * as services from "../services.js";
import type * as siteSettings from "../siteSettings.js";
import type * as stats from "../stats.js";
import type * as team from "../team.js";
import type * as testimonials from "../testimonials.js";
import type * as utils from "../utils.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  about: typeof about;
  blog: typeof blog;
  categories: typeof categories;
  files: typeof files;
  hero: typeof hero;
  newsletterSubscribers: typeof newsletterSubscribers;
  projects: typeof projects;
  seed: typeof seed;
  services: typeof services;
  siteSettings: typeof siteSettings;
  stats: typeof stats;
  team: typeof team;
  testimonials: typeof testimonials;
  utils: typeof utils;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
