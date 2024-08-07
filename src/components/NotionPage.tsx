'use client'
import { MapImageUrlFn, NotionRenderer } from 'react-notion-x'
import cs from 'classnames'
import styles from './styles.module.css'
import "../app/styles/notion.css"
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect, useMemo } from 'react'
import { mapImageUrl } from '@/lib/map-image-url'
import { FaArrowLeft } from "@react-icons/all-files/fa/FaArrowLeft"
import { FaArrowUp } from "@react-icons/all-files/fa/FaArrowUp"
import { useThemeStore } from '@/store/useThemeStore'
import { Block, ExtendedRecordMap, RecordValues, User } from 'notion-types'

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then(async (m) => {
    // add / remove any prism syntaxes here
    // await Promise.allSettled([
    //   import('prismjs/components/prism-markup-templating.js'),
    //   import('prismjs/components/prism-markup.js'),
    //   import('prismjs/components/prism-bash.js'),
    //   import('prismjs/components/prism-c.js'),
    //   import('prismjs/components/prism-cpp.js'),
    //   import('prismjs/components/prism-csharp.js'),
    //   import('prismjs/components/prism-docker.js'),
    //   import('prismjs/components/prism-java.js'),
    //   import('prismjs/components/prism-js-templates.js'),
    //   import('prismjs/components/prism-coffeescript.js'),
    //   import('prismjs/components/prism-diff.js'),
    //   import('prismjs/components/prism-git.js'),
    //   import('prismjs/components/prism-go.js'),
    //   import('prismjs/components/prism-graphql.js'),
    //   import('prismjs/components/prism-handlebars.js'),
    //   import('prismjs/components/prism-less.js'),
    //   import('prismjs/components/prism-makefile.js'),
    //   import('prismjs/components/prism-markdown.js'),
    //   import('prismjs/components/prism-objectivec.js'),
    //   import('prismjs/components/prism-ocaml.js'),
    //   import('prismjs/components/prism-python.js'),
    //   import('prismjs/components/prism-reason.js'),
    //   import('prismjs/components/prism-rust.js'),
    //   import('prismjs/components/prism-sass.js'),
    //   import('prismjs/components/prism-scss.js'),
    //   import('prismjs/components/prism-solidity.js'),
    //   import('prismjs/components/prism-sql.js'),
    //   import('prismjs/components/prism-stylus.js'),
    //   import('prismjs/components/prism-swift.js'),
    //   import('prismjs/components/prism-wasm.js'),
    //   import('prismjs/components/prism-yaml.js')
    // ])
    return m.Code
  })
)

const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
// const Pdf = dynamic(
//   () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
//   {
//     ssr: false
//   }
// )
const Modal = dynamic(
  () =>
    import('react-notion-x/build/third-party/modal').then((m) => {
      m.Modal.setAppElement('.notion-viewport')
      return m.Modal
    }),
  {
    ssr: false
  }
)

export default function NotionPage ({recordMap} : {recordMap: ExtendedRecordMap}) {
  // todo: 댓글
  const { theme } = useThemeStore()
  
  const components = useMemo(() => ({
    nextImage: Image,
    nextLink: Link,
    Code,
    Collection,
    Equation,
    //Pdf,
    Modal,
    Header: () => <></>
    // propertyLastEditedTimeValue,
    //propertyTextValue,
    // propertyDateValue
  }), [])
  
  return (
    <NotionRenderer
        bodyClassName={cs(styles.notion)}
        darkMode={theme === 'dark'}
        components={components}
        recordMap={recordMap}
        rootPageId={process.env.NEXT_PUBLIC_NOTION_API_BASE_URL}
        //rootDomain={site.domain}
        fullPage
        previewImages={!!recordMap.preview_images}
        showCollectionViewDropdown={false}
        showTableOfContents
        minTableOfContentsItems={3}

        // defaultPageIcon={config.defaultPageIcon}
        // defaultPageCover={config.defaultPageCover}
        // defaultPageCoverPosition={config.defaultPageCoverPosition}
        // mapPageUrl={siteMapPageUrl}
        mapImageUrl={mapImageUrl as MapImageUrlFn}
        // searchNotion={config.isSearchEnabled ? searchNotion : null}
        // pageAside={pageAside}
        pageHeader={<button className='in-page-button' onClick={() => window.history.back()}><FaArrowLeft /></button>}
        footer={<button className='in-page-button' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth'})}><FaArrowUp /></button>}
      />
  )
}
