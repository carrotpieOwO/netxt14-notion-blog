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
                                    <div className="pb-0 pt-2 px-4 flex-col items-start">
                                        <p className="text-tiny uppercase font-bold">{ li.title}</p>
                                        <small className="text-default-500">{li.summary}</small>
                                        <h4 className="font-bold text-large">{li.createdTime}</h4>
                                    </div>
                                    <div className="overflow-visible py-2">
                                        {
                                            !!li.cover &&
                                            <Image
                                                alt="Card background"
                                                className="object-cover rounded-xl"
                                                src={li.cover}
                                                width={270}
                                                height={270}
                                            />
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