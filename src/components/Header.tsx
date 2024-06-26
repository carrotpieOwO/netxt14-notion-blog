export const Header = () => {

    return (
        <header className='notion-header'>
            <div className='notion-nav-header'>
            {/* <Header block={block} /> */}
            <div className='notion-nav-header-rhs breadcrumbs'>
                {/* <ToggleThemeButton /> */}
                <div>home</div>
                <div>toggle</div>
                <div>search</div>
                {/* {isSearchEnabled && <Search block={block} title={null} />} */}
            </div>
            </div>
        </header>
    )
}