import * as types from './types'

export interface SiteConfig {
  [key: string]: any
  // rootNotionPageId: string
  // rootNotionSpaceId?: string

  // name: string
  // domain: string
  // author: string
  // description?: string
  // language?: string

  // twitter?: string
  // github?: string
  // linkedin?: string
  // newsletter?: string
  // youtube?: string
  // instagram?: string
  // game?: string
  // zhihu?: string
  // mastodon?: string;

  // defaultPageIcon?: string | null
  // defaultPageCover?: string | null
  // defaultPageCoverPosition?: number | null

  // isPreviewImageSupportEnabled?: boolean
  // isTweetEmbedSupportEnabled?: boolean
  // isRedisEnabled?: boolean
  // isSearchEnabled?: boolean

  // includeNotionIdInUrls?: boolean
  // pageUrlOverrides?: types.PageUrlOverridesMap
  // pageUrlAdditions?: types.PageUrlOverridesMap

  // navigationStyle?: types.NavigationStyle
  // navigationLinks?: Array<NavigationLink>
}

export interface NavigationLink {
  title: string
  pageId?: string
  url?: string
}

export const siteConfig = (config: SiteConfig): SiteConfig => {
  return config
}
