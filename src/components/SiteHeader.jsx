export default function SiteHeader({ isAbout = false, isProject = false }) {
  const name = <>qiuzi wu <span className="name-chinese" lang="zh-Hans">秋子</span></>
  const isSubpage = isAbout || isProject

  return (
    <header className="site-header">
      <span className="wordmark">
        {isSubpage ? <a href="/">{name}</a> : name}
      </span>

      <nav className="site-nav" aria-label="Primary navigation">
        <ul>
          <li><a href={isSubpage ? '/#projects' : '#projects'} aria-current={isProject ? 'location' : undefined}>projects</a></li>
          <li><a href="/about/" aria-current={isAbout ? 'page' : undefined}>about</a></li>
          <li><span aria-disabled="true">contact</span></li>
        </ul>
      </nav>
    </header>
  )
}
