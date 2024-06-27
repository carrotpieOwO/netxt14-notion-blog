import Image from "next/image";
import Link from "next/link";


export default function BlogList ({ list }) {
    return (        
        <article className="notion-page-content-inner">
            <div className="notion-collection ">
                <div className="notion-gallery">
                    <div className="notion-gallery-view">
                        <div className="notion-gallery-grid notion-gallery-grid-size-large">
                            {
                                list.map(li => 
                                <Link href={`/${li.id}`} className="notion-collection-card notion-collection-card-size-large" key={li.id}>
                                    <div style={{ padding: '1rem', height: '210px' }}>
                                        <h3 style={{ margin: 0 }}>{ li.title }</h3>
                                        <p style={{ fontSize: '12px', margin: '0 0 .5rem 0', color: '#7171a' }}>{li.createdTime}</p>
                                        <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0  }}>{li.summary}</p>
                                        <span className="notion-property notion-property-multi_select" style={{ marginTop: '.5rem' }}>
                                            {
                                                li.tags && li.tags.map(tag => <div key={tag.id} className={`notion-property-multi_select-item notion-item-${tag.color}`}>{tag.name}</div>)
                                            }
                                        </span>
                                    </div>
                                    <div style={{ padding: '.5rem', width: '100%', height: 200, overflow: 'hidden' }}>
                                        {
                                            !!li.cover &&
                                            <div className="notion-collection-card-cover" style={{ position: 'relative', width: '100%', height: '100%' }}>
                                                <Image
                                                    alt="Card background"
                                                    src={li.cover}
                                                    fill
                                                    style={{ borderRadius: '14px' }}
                                                    // width={270}
                                                    // height={270}
                                                />
                                            </div>
                                        }
                                        
                                    </div>
                                </Link>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}