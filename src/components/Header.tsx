import Image from "next/image"
import Link from "next/link"

export const Header = ({ icon }) => {

    return (
        <header className='notion-header'>
            <div className='notion-nav-header'>
                <div className='breadcrumbs'>
                    {/* <ToggleThemeButton /> */}
                    <Link href={'/'} className="bradscrumb">
                        <div className="notion-page-icon-inline notion-page-icon-image">
                            <span>
                                <Image width={22} height={22} src={icon} alt="Ha0peno" loading="lazy" decoding="async" />
                            </span>
                        </div>
                        <span className="title">Ha0peno</span>
                    </Link>
                    <div>toggle</div>
                    <div>search</div>
                    {/* {isSearchEnabled && <Search block={block} title={null} />} */}
                </div>
            </div>
        </header>
    )
}